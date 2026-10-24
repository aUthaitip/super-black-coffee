import { createContactHandler } from "@/lib/contact/handler";
import { saveContact } from "@/lib/contact/apps-script";

export const runtime = "nodejs";
export const maxDuration = 30;
export const POST = createContactHandler({ save: saveContact });
