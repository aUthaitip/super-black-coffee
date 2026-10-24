import { TranslatedString } from "@/types";

export interface ContactInfoItem {
  id: string;
  label: string;
  value: string;
  iconName: "Mail" | "Phone" | "MapPin";
}

export interface InquiryOption {
  value: "general" | "franchise" | "catering" | "feedback";
  label: TranslatedString;
}

export interface ContactFormData {
  badge: TranslatedString;
  title: TranslatedString;
  subtitle: TranslatedString;
  infoItems: ContactInfoItem[];
  inquiryOptions: InquiryOption[];
  successMessage: {
    title: TranslatedString;
    description: TranslatedString;
  };
}

export const CONTACT_DATA: ContactFormData = {
  badge: {
    th: "ติดต่อเรา",
    en: "GET IN TOUCH",
  },
  title: {
    th: "พร้อมรับฟังและร่วมสร้างประสบการณ์กาแฟที่ดีไปด้วยกัน",
    en: "Let's Connect & Brew Success Together",
  },
  subtitle: {
    th: "มีข้อสงสัยเกี่ยวกับสินค้า สาขา แฟรนไชส์ หรือบริการจัดเลี้ยง สอบถามทีมงาน Super Black Coffee ได้ตลอดเวลา",
    en: "Have questions about our beans, branch locations, franchise opportunities, or catering? Our team is always here to assist.",
  },
  infoItems: [
    {
      id: "email",
      label: "Email HQ",
      value: "superblackcoffee18@gmail.com",
      iconName: "Mail",
    },
    {
      id: "phone",
      label: "Franchise & Support Hotline",
      value: "062 562 9431 (09:00 - 18:00 น.)",
      iconName: "Phone",
    },
    {
      id: "address",
      label: "Central Roasting Lab",
      value: "Super Black Coffee HQ, Bangkok, Thailand",
      iconName: "MapPin",
    },
  ],
  inquiryOptions: [
    {
      value: "general",
      label: {
        th: "สอบถามข้อมูลทั่วไป / สินค้า",
        en: "General Inquiry & Products",
      },
    },
    {
      value: "franchise",
      label: {
        th: "สนใจสมัครแพ็กเกจแฟรนไชส์",
        en: "Franchise Partnership",
      },
    },
    {
      value: "feedback",
      label: {
        th: "คำแนะนำ & ติชมการบริการ",
        en: "Feedback & Service Reviews",
      },
    },
  ],
  successMessage: {
    title: {
      th: "ส่งข้อความสำเร็จเรียบร้อย",
      en: "Message Sent Successfully",
    },
    description: {
      th: "ขอบคุณที่ติดต่อ Super Black Coffee เจ้าหน้าที่ของเราจะติดต่อกลับหาคุณโดยเร็วที่สุดครับ",
      en: "Thank you for reaching out to Super Black Coffee. Our team will get back to you shortly.",
    },
  },
};
