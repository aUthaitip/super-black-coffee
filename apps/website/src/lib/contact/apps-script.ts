import { ContactError, type ContactSubmission } from "./handler";

const diagnosticMessages = {
  configuration:
    "Check CONTACT_APPS_SCRIPT_URL and CONTACT_APPS_SCRIPT_CONTRACT. The signed contract also requires CONTACT_APPS_SCRIPT_SECRET (32+ characters).",
  network: "Could not reach Apps Script or the request timed out.",
  http: "Apps Script returned an HTTP error. Check Web app deployment access.",
  response:
    "Apps Script did not return the expected JSON acknowledgement. Check the deployed Code.gs version and Web app access.",
  unauthorized:
    "Apps Script rejected the secret. Set Script Property CONTACT_FORM_SECRET to the same value as website CONTACT_APPS_SCRIPT_SECRET.",
  storage_unavailable:
    "Apps Script could not save the message. Check spreadsheet permissions, the ชีต1 tab, and its headers.",
  busy: "Apps Script is busy. Retry the same submission shortly.",
} as const;

function unavailable(reason: keyof typeof diagnosticMessages) {
  // Only fixed diagnostic messages: never log credentials, payloads, or upstream
  // response text, which could contain customer data or deployment details.
  console.error(`[contact:${reason}] ${diagnosticMessages[reason]}`);
  return new ContactError("temporarily_unavailable", 503);
}

export async function saveContact(data: ContactSubmission) {
  const url = process.env.CONTACT_APPS_SCRIPT_URL;
  const secret = process.env.CONTACT_APPS_SCRIPT_SECRET;
  const contract = process.env.CONTACT_APPS_SCRIPT_CONTRACT || "addUser";
  if (
    !url ||
    !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(url) ||
    !["addUser", "signed"].includes(contract) ||
    (contract === "signed" && (!secret || secret.length < 32))
  ) {
    throw unavailable("configuration");
  }
  const endpoint = new URL(url);
  const subjectLabels = {
    general: "สอบถามข้อมูลทั่วไป / สินค้า",
    franchise: "สนใจแฟรนไชส์",
    catering: "บริการจัดเลี้ยง",
    feedback: "คำแนะนำ / ติชม",
  };
  // appendRow interprets values starting with '=' as formulas. The supplied
  // addUser script already prefixes phone with an apostrophe, but not other text.
  const sheetText = (value: string) =>
    /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  let payload: object;
  if (contract === "addUser") {
    endpoint.searchParams.set("action", "addUser");
    payload = {
      name: sheetText(data.name),
      phone: data.phone,
      email: sheetText(data.email),
      // The existing script calls column D "venuename"; its sheet header is
      // "เรื่องที่ต้องการติดต่อ". Preserve that contract without changing the script.
      venuename: subjectLabels[data.subject],
      detail: sheetText(data.message),
    };
  } else {
    payload = { secret, ...data };
  }
  let response: Response;
  try {
    response = await fetch(endpoint.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow", // ContentService redirects to script.googleusercontent.com.
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
  } catch {
    throw unavailable("network");
  }
  if (!response.ok) throw unavailable("http");
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw unavailable("response");
  }
  if (!result || typeof result !== "object") throw unavailable("response");
  if (
    "success" in result &&
    result.success === true &&
    ((contract === "addUser" && !("id" in result)) ||
      ("id" in result && result.id === data.requestId))
  )
    return;
  if ("error" in result) {
    if (
      result.error === "unauthorized" ||
      result.error === "storage_unavailable" ||
      result.error === "busy"
    )
      throw unavailable(result.error);
    if (result.error === "rate_limited")
      throw new ContactError("rate_limited", 429);
    if (result.error === "request_conflict")
      throw new ContactError("request_conflict", 409);
    if (result.error === "invalid_fields")
      throw new ContactError("invalid_fields", 400);
  }
  throw unavailable("response");
}
