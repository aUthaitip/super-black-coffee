// Paste into the spreadsheet's Extensions > Apps Script project.
// Set CONTACT_FORM_SECRET in Project Settings > Script Properties (32+ chars).
// Optional: NOTIFICATION_EMAIL for the team's inbox, then run
// installNotificationTrigger() once. Never publish the spreadsheet itself.
const CONTACT_SPREADSHEET_ID = "1cgDslMpl450o-x7D-dNd_HttQ4gN0Qc36Q99b7vX41c";
const CONTACT_SHEET_NAME = "ชีต1";
const CONTACT_HEADERS = [
  "Received at",
  "Request ID",
  "Name",
  "Phone",
  "Email",
  "Subject",
  "Message",
  "Payload hash",
  "Notification status",
  "Notification attempted at",
];

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function hash_(value) {
  return Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    value,
    Utilities.Charset.UTF_8,
  )
    .map(function (byte) {
      return (byte & 255).toString(16).padStart(2, "0");
    })
    .join("");
}

function validContact_(input) {
  const names = ["requestId", "name", "phone", "email", "subject", "message"];
  if (
    !input ||
    names.some(function (key) {
      return typeof input[key] !== "string";
    })
  )
    return null;
  const data = {};
  names.forEach(function (key) {
    data[key] = input[key].trim();
  });
  data.email = data.email.toLowerCase();
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      data.requestId,
    ) ||
    data.name.length < 2 ||
    data.name.length > 80 ||
    !/^\+?[0-9][0-9 -]{7,13}[0-9]$/.test(data.phone) ||
    data.phone.replace(/\D/g, "").length < 9 ||
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    ["general", "franchise", "catering", "feedback"].indexOf(data.subject) ===
      -1 ||
    data.message.length < 10 ||
    data.message.length > 1000 ||
    input.website
  )
    return null;
  return data;
}

// Prevent spreadsheet formulas and preserve leading zeros in phone numbers.
function cellText_(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function sheet_() {
  const sheet = SpreadsheetApp.openById(CONTACT_SPREADSHEET_ID).getSheetByName(
    CONTACT_SHEET_NAME,
  );
  if (!sheet) throw new Error("Missing contact tab");
  if (sheet.getLastRow() === 0) {
    sheet
      .getRange(1, 1, 1, CONTACT_HEADERS.length)
      .setValues([CONTACT_HEADERS]);
    sheet.setFrozenRows(1);
  }
  const headers = sheet
    .getRange(1, 1, 1, CONTACT_HEADERS.length)
    .getValues()[0];
  if (headers.join("|") !== CONTACT_HEADERS.join("|"))
    throw new Error(
      "Contact headers do not match; existing data was not changed",
    );
  return sheet;
}

function setupContactForm() {
  const secret = PropertiesService.getScriptProperties().getProperty(
    "CONTACT_FORM_SECRET",
  );
  if (!secret || secret.length < 32)
    throw new Error(
      "Set CONTACT_FORM_SECRET to at least 32 random characters first",
    );
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    sheet_();
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

function doPost(event) {
  let input;
  try {
    const raw = event && event.postData && event.postData.contents;
    if (!raw || raw.length > 16384)
      return json_({ success: false, error: "invalid_fields" });
    input = JSON.parse(raw);
  } catch (_) {
    return json_({ success: false, error: "invalid_fields" });
  }
  const properties = PropertiesService.getScriptProperties();
  const secret = properties.getProperty("CONTACT_FORM_SECRET");
  if (
    !secret ||
    secret.length < 32 ||
    !input ||
    typeof input.secret !== "string" ||
    hash_(input.secret) !== hash_(secret)
  ) {
    return json_({ success: false, error: "unauthorized" });
  }
  const data = validContact_(input);
  if (!data) return json_({ success: false, error: "invalid_fields" });
  const fingerprint = hash_(
    JSON.stringify([
      data.name,
      data.phone,
      data.email,
      data.subject,
      data.message,
    ]),
  );
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return json_({ success: false, error: "busy" });
  try {
    const sheet = sheet_();
    const lastRow = sheet.getLastRow();
    const rows =
      lastRow > 1
        ? sheet.getRange(2, 1, lastRow - 1, CONTACT_HEADERS.length).getValues()
        : [];
    const existing = rows.find(function (row) {
      return row[1] === data.requestId;
    });
    if (existing) {
      return existing[7] === fingerprint
        ? json_({ success: true, id: data.requestId })
        : json_({ success: false, error: "request_conflict" });
    }
    const cutoff = Date.now() - 15 * 60 * 1000;
    const recent = rows.filter(function (row) {
      return new Date(row[0]).getTime() > cutoff;
    });
    if (
      recent.length >= 100 ||
      recent.filter(function (row) {
        return row[4] === data.email;
      }).length >= 3
    ) {
      return json_({ success: false, error: "rate_limited" });
    }
    const row = lastRow + 1;
    sheet.getRange(row, 2, 1, 8).setNumberFormat("@");
    sheet
      .getRange(row, 1, 1, CONTACT_HEADERS.length)
      .setValues([
        [
          new Date(),
          data.requestId,
          cellText_(data.name),
          cellText_(data.phone),
          cellText_(data.email),
          data.subject,
          cellText_(data.message),
          fingerprint,
          properties.getProperty("NOTIFICATION_EMAIL")
            ? "pending"
            : "not_configured",
          "",
        ],
      ]);
    SpreadsheetApp.flush();
    return json_({ success: true, id: data.requestId });
  } catch (_) {
    // Never return spreadsheet contents, secrets, or customer details in errors.
    console.error(
      "Contact sheet write failed; check tab headers and script permissions",
    );
    return json_({ success: false, error: "storage_unavailable" });
  } finally {
    lock.releaseLock();
  }
}

// Run once after setting NOTIFICATION_EMAIL; uses the owner's authorized account.
function installNotificationTrigger() {
  if (
    !PropertiesService.getScriptProperties().getProperty("NOTIFICATION_EMAIL")
  ) {
    throw new Error("Set NOTIFICATION_EMAIL first");
  }
  setupContactForm();
  const exists = ScriptApp.getProjectTriggers().some(function (trigger) {
    return trigger.getHandlerFunction() === "sendPendingNotifications";
  });
  if (!exists)
    ScriptApp.newTrigger("sendPendingNotifications")
      .timeBased()
      .everyMinutes(5)
      .create();
}

function sendPendingNotifications() {
  const to =
    PropertiesService.getScriptProperties().getProperty("NOTIFICATION_EMAIL");
  if (!to) return;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;
  try {
    const sheet = sheet_();
    const rows =
      sheet.getLastRow() > 1
        ? sheet
            .getRange(2, 1, sheet.getLastRow() - 1, CONTACT_HEADERS.length)
            .getValues()
        : [];
    let remaining = Math.min(5, MailApp.getRemainingDailyQuota());
    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index];
      if (row[8] === "sending") {
        // A previous execution may have sent mail before its acknowledgement was
        // saved. Require review instead of automatically sending a duplicate.
        sheet.getRange(index + 2, 9).setValue("needs_review");
        continue;
      }
      if (
        remaining <= 0 ||
        ["pending", "not_configured"].indexOf(row[8]) === -1
      )
        continue;
      sheet.getRange(index + 2, 9, 1, 2).setValues([["sending", new Date()]]);
      SpreadsheetApp.flush();
      try {
        MailApp.sendEmail({
          to: to,
          replyTo: row[4],
          name: "Super Black Coffee",
          subject: "[Super Black Coffee] Contact inquiry: " + row[5],
          body:
            "Reference: " +
            row[1] +
            "\nName: " +
            row[2] +
            "\nPhone: " +
            row[3] +
            "\nEmail: " +
            row[4] +
            "\nSubject: " +
            row[5] +
            "\n\n" +
            row[6],
        });
        sheet.getRange(index + 2, 9).setValue("sent");
      } catch (_) {
        sheet.getRange(index + 2, 9).setValue("needs_review");
        console.error(
          "Contact notification needs review; message remains in sheet",
        );
      }
      remaining -= 1;
    }
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}
