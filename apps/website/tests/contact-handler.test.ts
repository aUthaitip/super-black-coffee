import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import { ContactError, createContactHandler } from "../src/lib/contact/handler";

const valid = () => ({
  requestId: randomUUID(),
  name: " Test Customer ",
  phone: "0812345678",
  email: " TEST@EXAMPLE.COM ",
  subject: "general",
  message: " Please contact me about your coffee. ",
  website: "",
});
const request = (data: unknown, headers: Record<string, string> = {}) =>
  new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
      ...headers,
    },
    body: JSON.stringify(data),
  });

test("normalizes and saves before acknowledging receipt", async () => {
  const calls: string[] = [];
  const handler = createContactHandler({
    save: async (data) => {
      calls.push("save");
      assert.equal(data.email, "test@example.com");
      assert.equal(data.name, "Test Customer");
    },
  });
  const response = await handler(request(valid()));
  assert.equal(response.status, 201);
  assert.equal((await response.json()).success, true);
  assert.deepEqual(calls, ["save"]);
});

for (const [name, fields] of [
  ["whitespace name", { name: "   " }],
  ["whitespace message", { message: "          " }],
  ["phone without digits", { phone: "---------" }],
  ["short phone", { phone: "1-------2" }],
  ["invalid email", { email: "bad" }],
  ["invalid subject", { subject: "other" }],
  ["oversize message", { message: "x".repeat(1001) }],
  ["missing request ID", { requestId: undefined }],
  ["honeypot", { website: "https://spam.example" }],
] as const) {
  test(`rejects ${name} without saving`, async () => {
    const unexpected = async () => {
      assert.fail("Must not call downstream services");
    };
    const handler = createContactHandler({
      save: unexpected,
    });
    assert.equal(
      (await handler(request({ ...valid(), ...fields }))).status,
      400,
    );
  });
}

test("storage failure does not acknowledge success", async () => {
  const response = await createContactHandler({
    save: async () => {
      throw new Error("Storage offline");
    },
  })(request(valid()));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, undefined);
});

test("accepts the actual browser host behind a local Next.js URL", async () => {
  const response = await createContactHandler({ save: async () => {} })(
    request(valid(), {
      Host: "127.0.0.1:3000",
      Origin: "http://127.0.0.1:3000",
    }),
  );
  assert.equal(response.status, 201);
});

test("rate limiting returns a retry hint", async () => {
  const response = await createContactHandler({
    save: async () => {
      throw new ContactError("rate_limited", 429);
    },
  })(request(valid()));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "900");
});

test("rejects cross-origin, non-JSON, malformed JSON and oversized bodies", async () => {
  const unexpected = async () => {
    assert.fail("Must not call downstream services");
  };
  const handler = createContactHandler({
    save: unexpected,
  });
  assert.equal(
    (await handler(request(valid(), { Origin: "https://untrusted.example" })))
      .status,
    403,
  );
  assert.equal(
    (await handler(request(valid(), { "Content-Type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (
      await handler(
        new Request("http://localhost/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{",
        }),
      )
    ).status,
    400,
  );
  assert.equal(
    (await handler(request({ message: "x".repeat(17_000) }))).status,
    413,
  );
});
