import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import { saveContact } from "../src/lib/contact/apps-script";

const valid = () => ({
  requestId: randomUUID(),
  name: "Test Customer",
  phone: "0812345678",
  email: "customer@example.com",
  subject: "general" as const,
  message: "Please contact me about coffee",
});

test("server adapter requires configuration and verifies Apps Script acknowledgement", async () => {
  const originalFetch = globalThis.fetch;
  const originalConsoleError = console.error;
  const diagnostics: string[] = [];
  console.error = (...args: unknown[]) => diagnostics.push(args.join(" "));
  const oldUrl = process.env.CONTACT_APPS_SCRIPT_URL;
  const oldSecret = process.env.CONTACT_APPS_SCRIPT_SECRET;
  const oldContract = process.env.CONTACT_APPS_SCRIPT_CONTRACT;
  try {
    process.env.CONTACT_APPS_SCRIPT_CONTRACT = "signed";
    delete process.env.CONTACT_APPS_SCRIPT_URL;
    await assert.rejects(saveContact(valid()), /temporarily_unavailable/);
    process.env.CONTACT_APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/test-deployment/exec";
    process.env.CONTACT_APPS_SCRIPT_SECRET = "test-secret-".repeat(4);
    const data = valid();
    globalThis.fetch = async (_input, options) => {
      assert.equal(options?.redirect, "follow");
      const payload = JSON.parse(String(options?.body));
      assert.equal(payload.secret, process.env.CONTACT_APPS_SCRIPT_SECRET);
      return Response.json({ success: true, id: payload.requestId });
    };
    await saveContact(data);
    globalThis.fetch = async () =>
      Response.json({ success: false, error: "unauthorized" });
    await assert.rejects(saveContact(data), /temporarily_unavailable/);
    assert.ok(diagnostics.at(-1)?.includes("CONTACT_FORM_SECRET"));
    assert.ok(diagnostics.at(-1)?.includes("CONTACT_APPS_SCRIPT_SECRET"));
    assert.ok(
      !diagnostics.join(" ").includes(process.env.CONTACT_APPS_SCRIPT_SECRET!),
    );
    assert.ok(!diagnostics.join(" ").includes(data.email));
    globalThis.fetch = async () =>
      Response.json({ success: false, error: "storage_unavailable" });
    await assert.rejects(saveContact(data), /temporarily_unavailable/);
    assert.ok(diagnostics.at(-1)?.includes("spreadsheet permissions"));
    globalThis.fetch = async () =>
      Response.json({ success: false, error: "rate_limited" });
    await assert.rejects(saveContact(data), /rate_limited/);
    globalThis.fetch = async () =>
      Response.json({ success: true, id: "wrong-id" });
    await assert.rejects(saveContact(data), /temporarily_unavailable/);
    globalThis.fetch = async () =>
      new Response("Sign in to Google", { status: 200 });
    await assert.rejects(saveContact(data));
    globalThis.fetch = async () => {
      throw new Error("network timeout");
    };
    await assert.rejects(saveContact(data), /temporarily_unavailable/);
    assert.ok(diagnostics.at(-1)?.includes("timed out"));
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalConsoleError;
    if (oldUrl === undefined) delete process.env.CONTACT_APPS_SCRIPT_URL;
    else process.env.CONTACT_APPS_SCRIPT_URL = oldUrl;
    if (oldSecret === undefined) delete process.env.CONTACT_APPS_SCRIPT_SECRET;
    else process.env.CONTACT_APPS_SCRIPT_SECRET = oldSecret;
    if (oldContract === undefined)
      delete process.env.CONTACT_APPS_SCRIPT_CONTRACT;
    else process.env.CONTACT_APPS_SCRIPT_CONTRACT = oldContract;
  }
});

test("addUser adapter uses the supplied action, columns and success-only response without a secret", async () => {
  const originalFetch = globalThis.fetch;
  const keys = [
    "CONTACT_APPS_SCRIPT_URL",
    "CONTACT_APPS_SCRIPT_CONTRACT",
    "CONTACT_APPS_SCRIPT_SECRET",
  ] as const;
  const previous = keys.map((key) => process.env[key]);
  try {
    process.env.CONTACT_APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/test-deployment/exec";
    delete process.env.CONTACT_APPS_SCRIPT_CONTRACT;
    delete process.env.CONTACT_APPS_SCRIPT_SECRET;
    const data = valid();
    globalThis.fetch = async (input, options) => {
      assert.equal(
        new URL(String(input)).searchParams.get("action"),
        "addUser",
      );
      assert.equal(options?.method, "POST");
      const payload = JSON.parse(String(options?.body));
      assert.deepEqual(payload, {
        name: data.name,
        phone: data.phone,
        email: data.email,
        venuename: "สอบถามข้อมูลทั่วไป / สินค้า",
        detail: data.message,
      });
      return Response.json({ success: true });
    };
    await saveContact(data);
    globalThis.fetch = async (_input, options) => {
      const payload = JSON.parse(String(options?.body));
      assert.equal(payload.name, "'=1+1");
      assert.equal(payload.email, "'+customer@example.com");
      assert.equal(payload.venuename, "สนใจแฟรนไชส์");
      assert.equal(
        payload.detail,
        '\'=IMPORTXML("https://example.com", "//a")',
      );
      return Response.json({ success: true });
    };
    await saveContact({
      ...data,
      name: "=1+1",
      email: "+customer@example.com",
      subject: "franchise",
      message: '=IMPORTXML("https://example.com", "//a")',
    });
    globalThis.fetch = async () => Response.json({ error: "Unknown action" });
    await assert.rejects(saveContact(data), /temporarily_unavailable/);
    globalThis.fetch = async () =>
      Response.json({ success: false, error: "Sheet unavailable" });
    await assert.rejects(saveContact(data), /temporarily_unavailable/);
  } finally {
    globalThis.fetch = originalFetch;
    keys.forEach((key, index) => {
      const value = previous[index];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    });
  }
});

// Run the actual deployment script with in-memory Google service doubles.
// No live Google account, spreadsheet writes or emails are used by these tests.
function scriptHarness(initial: unknown[][] = []) {
  const rows: unknown[][] = initial;
  const writes: unknown[][] = [];
  const properties: Record<string, string> = {
    CONTACT_FORM_SECRET: "test-secret-".repeat(4),
  };
  let locked = false;
  let forceBusy = false;
  let mails = 0;
  let failMail = false;
  let failStorage = false;
  const sheet = {
    getLastRow: () => rows.length,
    setFrozenRows: () => {},
    getRange: (row: number, column: number, height = 1, width = 1) => {
      const range = {
        getValues: () =>
          Array.from({ length: height }, (_, y) =>
            Array.from(
              { length: width },
              (_, x) => rows[row - 1 + y]?.[column - 1 + x] ?? "",
            ),
          ),
        setValues: (values: unknown[][]) => {
          if (failStorage) throw new Error("Sheet offline");
          values.forEach((line, y) => {
            writes.push([...line]);
            rows[row - 1 + y] ??= [];
            line.forEach((cell, x) => {
              rows[row - 1 + y]![column - 1 + x] =
                typeof cell === "string" && cell.startsWith("'")
                  ? cell.slice(1)
                  : cell;
            });
          });
          return range;
        },
        setValue: (value: unknown) => range.setValues([[value]]),
        setNumberFormat: () => range,
      };
      return range;
    },
  };
  const context = vm.createContext({
    console: { error: () => {} },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (key: string) => properties[key] || null,
      }),
    },
    LockService: {
      getScriptLock: () => ({
        tryLock: () => {
          if (forceBusy || locked) return false;
          locked = true;
          return true;
        },
        waitLock: () => {
          if (locked) throw new Error("Locked");
          locked = true;
        },
        releaseLock: () => {
          locked = false;
        },
      }),
    },
    SpreadsheetApp: {
      openById: (id: string) => {
        assert.equal(id, "1cgDslMpl450o-x7D-dNd_HttQ4gN0Qc36Q99b7vX41c");
        return {
          getSheetByName: (name: string) => {
            assert.equal(name, "ชีต1");
            return sheet;
          },
        };
      },
      flush: () => {},
    },
    Utilities: {
      DigestAlgorithm: { SHA_256: "sha256" },
      Charset: { UTF_8: "utf8" },
      computeDigest: (_algorithm: string, text: string) => [
        ...createHash("sha256").update(text).digest(),
      ],
    },
    ContentService: {
      MimeType: { JSON: "json" },
      createTextOutput: (body: string) => ({
        setMimeType: () => JSON.parse(body),
      }),
    },
    MailApp: {
      getRemainingDailyQuota: () => 100,
      sendEmail: () => {
        if (failMail) throw new Error("Mail failed");
        mails++;
      },
    },
  });
  vm.runInContext(
    readFileSync(new URL("../apps-script/Code.gs", import.meta.url), "utf8"),
    context,
  );
  return {
    rows,
    writes,
    properties,
    post: (data: object, secret = properties.CONTACT_FORM_SECRET) =>
      context.doPost({
        postData: { contents: JSON.stringify({ ...data, secret }) },
      }),
    notify: () => context.sendPendingNotifications(),
    busy: (value: boolean) => {
      forceBusy = value;
    },
    failMail: () => {
      failMail = true;
    },
    failStorage: () => {
      failStorage = true;
    },
    mailCount: () => mails,
  };
}

test("Apps Script authentication, durable deduplication, conflicts and rate limits", () => {
  const h = scriptHarness();
  const data = valid();
  assert.equal(h.post(data, "wrong").error, "unauthorized");
  assert.equal(h.rows.length, 0);
  assert.equal(h.post(data).success, true);
  assert.equal(h.rows.length, 2);
  assert.equal(h.post(data).success, true);
  assert.equal(h.rows.length, 2, "Retry does not append a duplicate");
  assert.equal(
    h.post({ ...data, message: "Different message" }).error,
    "request_conflict",
  );
  assert.equal(h.post(valid()).success, true);
  assert.equal(h.post(valid()).success, true);
  assert.equal(h.post(valid()).error, "rate_limited");
  h.busy(true);
  assert.equal(h.post(valid()).error, "busy");
});

test("Apps Script preserves existing headers, validates inputs and escapes formulas", () => {
  const existing = scriptHarness([["Existing customer data"]]);
  assert.equal(existing.post(valid()).error, "storage_unavailable");
  assert.deepEqual(existing.rows, [["Existing customer data"]]);
  const h = scriptHarness();
  assert.equal(h.post({ ...valid(), message: "   " }).error, "invalid_fields");
  assert.equal(h.post({ ...valid(), website: "bot" }).error, "invalid_fields");
  assert.equal(
    h.post({
      ...valid(),
      name: '=HYPERLINK("https://example.com")',
      phone: "+66812345678",
      message: '=IMPORTXML("https://example.com", "//a")',
    }).success,
    true,
  );
  assert.ok(String(h.writes[1]?.[2]).startsWith("'="));
  assert.ok(String(h.writes[1]?.[3]).startsWith("'+"));
  assert.ok(String(h.writes[1]?.[6]).startsWith("'="));
  assert.equal(h.rows[1]?.[3], "+66812345678");
  h.failStorage();
  assert.equal(h.post(valid()).error, "storage_unavailable");
});

test("notification failures retain the message for manual review without duplicate mail", () => {
  const h = scriptHarness();
  const first = valid();
  h.post(first);
  assert.equal(h.rows[1]?.[8], "not_configured");
  h.properties.NOTIFICATION_EMAIL = "team@example.com";
  h.notify();
  assert.equal(h.mailCount(), 1);
  assert.equal(h.rows[1]?.[8], "sent");
  h.notify();
  assert.equal(h.mailCount(), 1);
  h.post(valid());
  h.failMail();
  h.notify();
  assert.equal(h.rows[2]?.[8], "needs_review");
  assert.equal(h.rows[2]?.[6], "Please contact me about coffee");
  h.notify();
  assert.equal(h.mailCount(), 1);
});
