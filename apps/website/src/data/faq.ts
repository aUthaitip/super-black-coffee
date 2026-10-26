import { TranslatedString } from "@/types";

export interface FaqItem {
  id: string;
  question: TranslatedString;
  answer: TranslatedString;
  category?: string;
}

export interface FaqData {
  badge: TranslatedString;
  title: TranslatedString;
  subtitle: TranslatedString;
  items: FaqItem[];
}

export const FAQ_DATA: FaqData = {
  badge: {
    th: "ก่อนเริ่มธุรกิจของคุณ",
    en: "BEFORE YOU OPEN YOUR STORE",
  },
  title: {
    th: "คำถามที่พบบ่อย",
    en: "Franchise FAQs",
  },
  subtitle: {
    th: "เตรียมความพร้อมเรื่องแพ็กเกจ งบลงทุน ทำเล และระบบร้าน ก่อนร่วมธุรกิจกับ Super Black Coffee",
    en: "Get to know the packages, investment, location requirements and store systems before partnering with Super Black Coffee.",
  },
  items: [
    {
      id: "franchise-get-started",
      question: {
        th: "สนใจเปิดร้าน Super Black Coffee ต้องเริ่มต้นอย่างไร?",
        en: "How do I get started with a Super Black Coffee franchise?",
      },
      answer: {
        th: "เริ่มจากดูรูปแบบร้านและรายละเอียดในหน้าแฟรนไชส์ แล้วกรอกฟอร์ม «สนใจร่วมธุรกิจ» ด้านล่าง พร้อมแจ้งจังหวัด ทำเลที่สนใจ และงบลงทุนเบื้องต้น หากยังไม่มีทำเล สามารถแจ้งความต้องการเพื่อพูดคุยแนวทางกับทีมงานก่อนได้",
        en: "Explore the store formats on our Franchise page, then complete the Become a Partner form below with your preferred province, location and initial budget. If you do not have a location yet, tell us what you have in mind to start a conversation with our team.",
      },
      category: "franchise",
    },
    {
      id: "franchise-packages-budget",
      question: {
        th: "ควรเลือกแพ็กเกจแบบไหน และต้องเตรียมงบเท่าไร?",
        en: "Which package should I choose, and what budget should I prepare?",
      },
      answer: {
        th: "พิจารณาจากขนาดพื้นที่ ทำเล รูปแบบบริการ และงบที่คุณวางไว้ คุณสามารถใช้เครื่องมือประเมินงบในหน้าแฟรนไชส์เพื่อเปรียบเทียบรูปแบบร้านเบื้องต้น จากนั้นให้ทีมงานสรุปค่าแฟรนไชส์ งานก่อสร้าง อุปกรณ์ และรายการที่รวมในแพ็กเกจสำหรับพื้นที่ของคุณ ตัวเลขในเครื่องมือเป็นประมาณการ ไม่ใช่ใบเสนอราคาของโครงการ",
        en: "Consider your available space, location, service format and budget. Use the calculator on our Franchise page for an initial comparison, then ask our team for a breakdown of franchise fees, construction, equipment and package inclusions for your site. Calculator figures are estimates, not a project quotation.",
      },
      category: "packages",
    },
    {
      id: "franchise-experience-training",
      question: {
        th: "ไม่มีประสบการณ์ร้านกาแฟมาก่อน เริ่มต้นได้ไหม?",
        en: "Can I get started without coffee shop experience?",
      },
      answer: {
        th: "สามารถเริ่มศึกษารูปแบบร้านและพูดคุยกับทีมงานได้ โดยแจ้งประสบการณ์เดิมและผู้ที่จะดูแลร้าน เพื่อหารือการเตรียมทีม การอบรมชงเครื่องดื่ม การบริการ และการบริหารร้าน สอบถามรายละเอียดหลักสูตร ระยะเวลา และค่าใช้จ่ายที่รวมในแพ็กเกจก่อนตัดสินใจ",
        en: "You can start by exploring store formats and talking with our team. Tell us about your experience and who will run the store so you can discuss staffing, beverage training, service and daily operations. Confirm the training scope, schedule and costs included in your package before deciding.",
      },
      category: "support",
    },
    {
      id: "franchise-location",
      question: {
        th: "มีที่ดินหรือพื้นที่อยู่แล้ว ส่งให้ทีมงานพิจารณาได้ไหม?",
        en: "Can I submit an existing property or space for review?",
      },
      answer: {
        th: "ส่งจังหวัด พิกัด ขนาดพื้นที่ รูปถ่าย และข้อมูลทางเข้าออกให้ทีมงานพิจารณาเบื้องต้นได้ เพื่อพูดคุยว่ารูปแบบร้านใดเหมาะกับพื้นที่ รวมถึงความต้องการด้านที่จอดรถและบริการเพิ่มเติม การสำรวจพื้นที่และขั้นตอนถัดไปให้ตกลงกับทีมงานเป็นรายโครงการ",
        en: "Share the province, map location, dimensions, photos and access details for an initial review. These help the team discuss suitable store formats, parking and additional services. Site visits and next steps are arranged for each project.",
      },
      category: "location",
    },
    {
      id: "franchise-store-systems",
      question: {
        th: "ระบบร้านช่วยดูแลงานส่วนไหนบ้าง?",
        en: "Which parts of the business do the store systems cover?",
      },
      answer: {
        th: "ในส่วน «ระบบร้าน» คุณสามารถทำความรู้จักเครื่องมือด้านหน้าร้านและยอดขาย สต็อกและการสั่งวัตถุดิบ รวมถึงงานหลังบ้านและการประสานงานกับสำนักงานใหญ่ สอบถามทีมงานเรื่องฟังก์ชันที่พร้อมใช้งาน อุปกรณ์ที่ต้องใช้ และค่าบริการสำหรับรูปแบบร้านของคุณก่อนเลือกแพ็กเกจ",
        en: "The Store Systems section introduces tools for sales, inventory, supply ordering and back-office coordination with headquarters. Ask our team which features are available, what equipment is required and which service fees apply to your store format before choosing a package.",
      },
      category: "systems",
    },
    {
      id: "franchise-opening-process",
      question: {
        th: "หลังติดต่อแล้ว มีขั้นตอนอะไรบ้าง และเปิดร้านได้เมื่อไร?",
        en: "What happens after I enquire, and when can the store open?",
      },
      answer: {
        th: "ขั้นตอนหลักคือพูดคุยรายละเอียด ประเมินทำเล ตกลงเงื่อนไขและแบบร้าน เตรียมพื้นที่และติดตั้งอุปกรณ์ อบรมทีมงาน แล้วจึงเตรียมเปิดร้าน ระยะเวลาขึ้นอยู่กับความพร้อมของพื้นที่ งานก่อสร้าง และรูปแบบร้าน โดยให้ทีมงานจัดทำแผนงานสำหรับโครงการของคุณ",
        en: "The main steps are consultation, location review, agreement and store design, site preparation and equipment installation, staff training, and opening preparation. Timing depends on site readiness, construction and the store format. Ask our team for a schedule specific to your project.",
      },
      category: "process",
    },
    {
      id: "franchise-ongoing-support",
      question: {
        th: "ก่อนและหลังเปิดร้าน มีการสนับสนุนอะไรบ้าง?",
        en: "What support is available before and after opening?",
      },
      answer: {
        th: "คุณสามารถศึกษาหัวข้อการอบรม มาตรฐานการทำงาน และการสนับสนุนในหน้าแฟรนไชส์ แล้วพูดคุยกับทีมงานให้ชัดเจนว่าแพ็กเกจที่เลือกครอบคลุมเรื่องใดบ้าง เช่น การเตรียมร้าน การใช้ระบบ การสั่งวัตถุดิบ และช่องทางขอความช่วยเหลือหลังเปิดร้าน โดยยึดรายละเอียดที่ตกลงในแพ็กเกจและสัญญา",
        en: "Review training, operating standards and support on the Franchise page, then confirm what your chosen package covers, including store preparation, system use, supply ordering and support channels after opening. The agreed package and contract set out the scope of support.",
      },
      category: "support",
    },
  ],
};
