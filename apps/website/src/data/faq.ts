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
    th: "FREQUENTLY ASKED QUESTIONS",
    en: "FREQUENTLY ASKED QUESTIONS",
  },
  title: {
    th: "คำถามที่พบบ่อย",
    en: "Frequently Asked Questions",
  },
  subtitle: {
    th: "รวบรวมข้อสงสัยเกี่ยวกับเมล็ดกาแฟ มาตรฐานการชง การสั่งซื้อ และการร่วมธุรกิจกับ Super Black Coffee",
    en: "Everything you need to know about our specialty beans, brewing standards, ordering, and franchise opportunities.",
  },
  items: [
    {
      id: "beans-origin",
      question: {
        th: "เมล็ดกาแฟของ Super Black Coffee มีแหล่งกำเนิดมาจากที่ไหน?",
        en: "Where do Super Black Coffee beans originate from?",
      },
      answer: {
        th: "เราคัดสรรเมล็ดกาแฟสายพันธุ์พิเศษ (Specialty Grade) จากฟาร์มบนที่ราบสูงโบลาเวน ประเทศลาว และดอยสูงทางภาคเหนือของไทย ผ่านการปลูกแบบอินทรีย์ยั่งยืน คั่วสดใหม่ตามโปรไฟล์เฉพาะของ Super Black เพื่อให้ได้บอดี้ที่เข้มลึกแต่คงความหอมละมุนอย่างลงตัว",
        en: "We ethically source specialty-grade beans from high-altitude farms in Bolaven Plateau, Laos, and Northern Thailand highlands, roasted locally to our signature profile.",
      },
      category: "coffee",
    },
    {
      id: "nitro-cold-brew",
      question: {
        th: "เมนู Nitro Cold Brew มีความพิเศษแตกต่างจากกาแฟเย็นทั่วไปอย่างไร?",
        en: "How does our Nitro Cold Brew differ from regular iced coffee?",
      },
      answer: {
        th: "Nitro Cold Brew ของเราผ่านการสกัดเย็นยาวนานกว่า 18 ชั่วโมง และอัดก๊าซไนโตรเจนบริสุทธิ์ ทำให้เกิดฟองโฟมนุ่มละเอียดดุจกำมะหยี่ (Velvety Crema) ให้รสสัมผัสหวานธรรมชาติ นุ่มนวล กลมกล่อม ดื่มง่ายโดยไม่ต้องเติมน้ำตาล",
        en: "Steeped cold for over 18 hours and infused with food-grade nitrogen, delivering a cascade of velvety micro-foam and naturally sweet, creamy mouthfeel without added sugar.",
      },
      category: "menu",
    },
    {
      id: "sweetness-milk-options",
      question: {
        th: "สามารถปรับระดับความหวาน หรือเลือกประเภทนมทางเลือกได้หรือไม่?",
        en: "Can I customize sweetness or request plant-based milk alternatives?",
      },
      answer: {
        th: "ได้แน่นอนครับ! ลูกค้าสามารถเลือกระดับความหวานได้ 4 ระดับ (0%, 25%, 50%, 100%) และมีตัวเลือกนมทางเลือกสุขภาพอย่าง นมโอ๊ต (Oat Milk) และนมอัลมอนด์ (Almond Milk) ให้บริการในทุกสาขา",
        en: "Absolutely. We offer customized sweetness levels (0%, 25%, 50%, 100%) and premium plant-based milks like Oat Milk and Almond Milk across all locations.",
      },
      category: "menu",
    },
    {
      id: "franchise-inquiry",
      question: {
        th: "หากสนใจลงทุนแฟรนไชส์ Super Black Coffee ต้องเริ่มต้นอย่างไร?",
        en: "How do I get started with opening a Super Black Coffee franchise?",
      },
      answer: {
        th: "เรามีแพ็กเกจแฟรนไชส์ที่ยืดหยุ่นตามทำเล พร้อมระบบ Super Black Cloud Control ช่วยจัดการหน้าร้าน สต็อก และสูตรชงอัตโนมัติ คุณสามารถดูรายละเอียดแพ็กเกจและกรอกข้อมูลสมัครได้ที่หน้าแฟรนไชส์ หรือติดต่อฝ่ายพัฒนาธุรกิจของเราได้โดยตรง",
        en: "We offer flexible turnkey franchise packages with full Cloud Control POS, supply chain management, and barista training. Visit our Franchise page for more details.",
      },
      category: "franchise",
    },
    {
      id: "membership-privileges",
      question: {
        th: "มีโปรโมชั่นหรือสิทธิพิเศษสำหรับสมาชิกหรือไม่?",
        en: "Are there loyalty rewards or member privileges?",
      },
      answer: {
        th: "มีครับ! สมาชิก Super Black Member จะได้รับสิทธิ์สะสมคะแนนทุกการสั่งซื้อ รับเครื่องดื่มฟรีในเดือนเกิด และรับสิทธิ์เข้าร่วมโปรโมชั่น Exclusive ประจำสาขาใกล้คุณตลอดทั้งปี",
        en: "Yes! Super Black Members earn points on every purchase, enjoy birthday rewards, and receive exclusive branch promotions all year round.",
      },
      category: "membership",
    },
  ],
};
