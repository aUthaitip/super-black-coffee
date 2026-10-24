import { z } from "zod";
import {
  createContactSchema,
  type ContactFormValues,
} from "../validations/contact";

export type ContactSubmission = ContactFormValues & { requestId: string };
export class ContactError extends Error {
  constructor(
    public code: string,
    public status: number,
  ) {
    super(code);
  }
}

const submissionSchema = createContactSchema().extend({
  requestId: z.string().uuid(),
  website: z.string().max(200).optional().default(""),
});

function json(body: object, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...(status === 429 ? { "Retry-After": "900" } : {}),
    },
  });
}

// Limit streamed bodies too; Content-Length is not guaranteed or trustworthy.
async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new ContactError("invalid_request", 400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16_384) {
      await reader.cancel();
      throw new ContactError("payload_too_large", 413);
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new ContactError("invalid_request", 400);
  }
}

export function createContactHandler(dependencies: {
  save: (data: ContactSubmission) => Promise<void>;
}) {
  return async (request: Request) => {
    try {
      const origin = request.headers.get("origin");
      const host = request.headers.get("host") || new URL(request.url).host;
      if (
        (origin && new URL(origin).host !== host) ||
        request.headers.get("sec-fetch-site") === "cross-site"
      ) {
        return json({ error: "forbidden" }, 403);
      }
      if (
        request.headers.get("content-type")?.split(";")[0]?.trim() !==
        "application/json"
      ) {
        return json({ error: "invalid_content_type" }, 415);
      }
      const parsed = submissionSchema.safeParse(await readBody(request));
      if (!parsed.success) return json({ error: "invalid_fields" }, 400);
      const { website, ...submission } = parsed.data;
      if (website) return json({ error: "invalid_request" }, 400);

      await dependencies.save(submission);
      return json({ success: true, id: submission.requestId }, 201);
    } catch (error) {
      if (error instanceof ContactError)
        return json({ error: error.code }, error.status);
      console.error("[contact] Submission could not be saved");
      return json({ error: "temporarily_unavailable" }, 503);
    }
  };
}
