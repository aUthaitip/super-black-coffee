import { z } from "zod";

export const createFranchiseLeadSchema = (language: "th" | "en" = "th") =>
  z.object({
    fullName: z
      .string()
      .min(1, {
        message: language === "th" ? "กรุณากรอกชื่อ-นามสกุล" : "Full name is required",
      })
      .min(2, {
        message:
          language === "th"
            ? "ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร"
            : "Name must be at least 2 characters",
      })
      .max(80, {
        message:
          language === "th"
            ? "ชื่อต้องไม่เกิน 80 ตัวอักษร"
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

    province: z.string().min(1, {
      message: language === "th" ? "กรุณากรอกจังหวัดที่ต้องการเปิดสาขา" : "Province is required",
    }),

    packageTier: z.enum(["S", "M", "L", "undecided"] as const, {
      error: language === "th" ? "กรุณาเลือกแพ็กเกจที่สนใจ" : "Please select a package",
    }),

    budget: z.string().min(1, {
      message: language === "th" ? "กรุณาเลือกงบประมาณการลงทุน" : "Budget range is required",
    }),

    locationStatus: z.enum(["have_land", "renting", "looking", "other"] as const, {
      error: language === "th" ? "กรุณาระบุสถานะพื้นที่/ทำเล" : "Please specify location status",
    }),

    experience: z.string().optional(),
    message: z.string().max(1000).optional(),
  });

export type FranchiseLeadFormValues = z.infer<
  ReturnType<typeof createFranchiseLeadSchema>
>;
