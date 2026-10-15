import { z } from "zod";

export const createContactSchema = (language: "th" | "en" = "th") =>
  z.object({
    name: z
      .string()
      .min(1, {
        message: language === "th" ? "กรุณากรอกชื่อ-นามสกุล" : "Name is required",
      })
      .min(2, {
        message:
          language === "th"
            ? "ชื่อ-นามสกุลต้องมีความยาวอย่างน้อย 2 ตัวอักษร"
            : "Name must be at least 2 characters",
      })
      .max(80, {
        message:
          language === "th"
            ? "ชื่อ-นามสกุลต้องไม่เกิน 80 ตัวอักษร"
            : "Name must not exceed 80 characters",
      }),

    phone: z
      .string()
      .min(1, {
        message: language === "th" ? "กรุณากรอกเบอร์โทรศัพท์" : "Phone number is required",
      })
      .regex(/^[0-9+\-\s]{9,15}$/, {
        message:
          language === "th"
            ? "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (เช่น 0812345678)"
            : "Invalid phone number format",
      }),

    email: z
      .string()
      .min(1, {
        message: language === "th" ? "กรุณากรอกอีเมล" : "Email is required",
      })
      .email({
        message:
          language === "th"
            ? "รูปแบบอีเมลไม่ถูกต้อง (เช่น name@example.com)"
            : "Invalid email address format",
      }),

    subject: z.enum(["general", "franchise", "catering", "feedback"] as const),

    message: z
      .string()
      .min(1, {
        message: language === "th" ? "กรุณากรอกข้อความ" : "Message is required",
      })
      .min(10, {
        message:
          language === "th"
            ? "ข้อความต้องมีความยาวอย่างน้อย 10 ตัวอักษร"
            : "Message must be at least 10 characters",
      })
      .max(1000, {
        message:
          language === "th"
            ? "ข้อความต้องไม่เกิน 1,000 ตัวอักษร"
            : "Message must not exceed 1000 characters",
      }),
  });

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
