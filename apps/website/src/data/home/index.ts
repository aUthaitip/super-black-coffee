import { SITE_IMAGES } from "../assets";

export const HOME_DATA = {
  hero: {
    bgImage: SITE_IMAGES.hero.sunsetCafe,
    eyebrow: {
      th: "แฟรนไชส์ร้านกาแฟ Super Black Coffee",
      en: "SUPER BLACK COFFEE FRANCHISE",
    },
    headingLine1: {
      th: "เปิดร้านกาแฟของคุณ",
      en: "Open Your Own Coffee Shop",
    },
    headingLine2: {
      th: "กับ Super Black Coffee",
      en: "with Super Black Coffee",
    },
    description: {
      th: "เริ่มวางแผนธุรกิจร้านกาแฟของคุณ ดูรูปแบบร้าน แพ็กเกจลงทุน และรายละเอียดการร่วมแฟรนไชส์ พร้อมพูดคุยกับทีมงานก่อนตัดสินใจ",
      en: "Plan your coffee business. Explore store formats, investment options and franchise details, then talk with our team before deciding.",
    },
    packagesText: {
      th: "ดูแพ็กเกจแฟรนไชส์",
      en: "Franchise Packages",
    },
    consultText: {
      th: "ปรึกษาเรื่องเปิดร้าน",
      en: "Talk About Opening a Store",
    },
    metrics: [
      {
        value: "45+",
        label: {
          th: "สาขาทั่วประเทศ",
          en: "Stores Nationwide",
        },
        highlight: true,
      },
      {
        value: "100%",
        label: {
          th: "Specialty Dark Roast",
          en: "Specialty Dark Roast",
        },
      },
      {
        value: "18 Hrs",
        label: {
          th: "สูตร Nitro Cold Brew",
          en: "18-Hour Nitro Brew",
        },
        highlight: true,
      },
      {
        value: "300k+",
        label: {
          th: "แก้วส่งมอบความสดชื่น",
          en: "Cups of Joy Served",
        },
      },
    ],
  },

  highlights: {

    title: {
      th: "ทำไมต้อง Super Black Coffee?",
      en: "Why Super Black Coffee?",
    },
    subtitle: {
      th: "มากกว่าแค่ร้านกาแฟ สัมผัสประสบการณ์ไลฟ์สไตล์ฮับที่รวมกาแฟสเปเชียลตี้ สถานีชาร์จรถไฟฟ้า จุดส่งพัสดุด่วน และระบบบริหารจัดการระดับมาตรฐาน",
      en: "More than just coffee. Experience our lifestyle hub combining specialty dark roast, EV fast charging, courier logistics, and enterprise smart management.",
    },
    items: [
      {
        tag: "ORGANIC COFFEE",
        title: {
          th: "กาแฟออร์แกนิกคัดสรร เพื่อทุกช่วงเวลาของคุณ",
          en: "Carefully selected organic coffee for every moment of your day.",
        },
        description: {
          th: "คัดสรรเมล็ดกาแฟออร์แกนิกที่ปลูกบนดอยสูงในประเทศลาว นำมาคั่วอย่างพิถีพิถัน เพื่อส่งต่อกลิ่นหอมและรสชาติกาแฟจากแหล่งปลูกสู่ทุกแก้วของคุณ",
          en: "Carefully selected organic coffee beans grown in the highlands of Laos, thoughtfully roasted to bring the aroma and flavour of their origin to every cup.",
        },
        image: "/services/superblackcoffee-organic-laos.webp",
        href: "/menu",
        actionText: { th: "ดูรายละเอียด", en: "Explore Menu" },
        accentColor: "#c69255",
      },
      {
        tag: "iGreen+ EV STATION",
        title: {
          th: "ชาร์จรถไฟฟ้ากับ iGreen+ พร้อมพักดื่มกาแฟระหว่างทาง",
          en: "Charge with iGreen+ and enjoy a coffee break along the way.",
        },
        description: {
          th: "เติมพลังให้รถของคุณที่สถานีชาร์จ iGreen+ พร้อมพักผ่อนและเพลิดเพลินกับกาแฟออร์แกนิกแก้วโปรดจาก Super Black Coffee",
          en: "Recharge your vehicle at an iGreen+ charging station while you relax with your favourite organic coffee from Super Black Coffee.",
        },
        image: "/services/igreen-plus-ev-station.webp",
        href: "/branches",
        actionText: { th: "ดูรายละเอียด", en: "View Stations" },
        accentColor: "#38bdf8",
      },
      {
        tag: "BPOST65 EXPRESS",
        title: {
          th: "รับฝากส่งพัสดุในจุดแวะเดียวกับกาแฟของคุณ",
          en: "One-stop express parcel drop-off right by your coffee.",
        },
        description: {
          th: "จุดบริการรับส่งพัสดุด่วนครอบคลุมทุกค่ายขนส่งชั้นนำ ส่งง่าย รวดเร็ว มั่นใจได้ ไม่ต้องเสียเวลาแวะหลายที่",
          en: "Fast and reliable parcel drop-off service supporting major carriers right inside Super Black Coffee stores.",
        },
        image: "/services/superblackcoffee-service-bpost65-express.webp",
        href: "/about",
        actionText: { th: "ดูรายละเอียด", en: "Learn More" },
        accentColor: "#f87171",
      },
      {
        tag: "FRANCHISE",
        title: {
          th: "ร่วมเติบโตไปด้วยกัน กับธุรกิจที่มั่นคง",
          en: "Grow together with a proven, sustainable coffee business.",
        },
        description: {
          th: "โมเดลธุรกิจคาเฟ่ & ไลฟ์สไตล์ฮับที่ออกแบบให้คืนทุนไว มีทีมงานเทรนนิ่ง และซัพพอร์ตระบบการตลาดอย่างใกล้ชิด",
          en: "High-yield cafe franchise packages with end-to-end operational training and continuous marketing support.",
        },
        image: "/model/model-m.webp",
        href: "/franchise",
        actionText: { th: "ดูรายละเอียด", en: "Franchise Plans" },
        accentColor: "#fbbf24",
      },
    ],
  },

  signatureMenu: {
    badge: {
      th: "HANDCRAFTED SIGNATURES",
      en: "HANDCRAFTED SIGNATURES",
    },
    title: {
      th: "เมนูซิกเนเจอร์ประจำแบรนด์",
      en: "Signature Coffee Selection",
    },
    viewAllText: {
      th: "ดูรายการเมนูทั้งหมด",
      en: "View Full Menu",
    },
  },

  story: {
    title: {
      th: "เรื่องราวเบื้องหลังความเข้ม",
      en: "The Story Behind The Depth",
    },
    desc1: {
      th: "Super Black Coffee เกิดขึ้นจากความหลงใหลในเสน่ห์ของกาแฟดำที่แท้จริง เราเชื่อว่ากาแฟที่ดีไม่จำเป็นต้องซับซ้อน แต่ต้องมีความซื่อสัตย์ในรสชาติและใส่ใจในทุกขั้นตอน",
      en: "Super Black Coffee was born out of profound passion for authentic black coffee. We believe exceptional coffee doesn't need unnecessary complexity—only genuine integrity in taste and meticulous attention to detail.",
    },
    desc2: {
      th: "เราพัฒนาระบบมาตรฐานสูตรและกระบวนการสกัดที่ส่งตรงจากศูนย์กลาง HQ สู่ทุกสาขาทั่วประเทศ เพื่อให้มั่นใจว่าไม่ว่าคุณจะแวะ Super Black ที่ไหน คุณจะได้สัมผัสรสชาติอันสมบูรณ์แบบเดียวกันเสมอ",
      en: "We established standardized brewing recipes directly synchronized from our Central HQ to every store nationwide, ensuring you enjoy the exact same exquisite taste wherever you visit us.",
    },
    learnMoreText: {
      th: "อ่านเรื่องราวของเรา",
      en: "Discover Our Story",
    },
    image: SITE_IMAGES.pages.menuCraft,
    subBadge: {
      th: "สูตรลับมาตรฐาน Super Black ที่ส่งตรงสู่ทุกแก้ว",
      en: "Super Black Standard Recipes Delivered Direct to Every Cup",
    },
  },

  franchiseTeaser: {
    badge: {
      th: "FRANCHISE OPPORTUNITIES",
      en: "FRANCHISE OPPORTUNITIES",
    },
    title: {
      th: "เติบโตไปด้วยกันกับ Super Black Coffee",
      en: "Build Your Future with Super Black Coffee",
    },
    subtitle: {
      th: "โอกาสร่วมเป็นเจ้าของธุรกิจกาแฟพรีเมียมที่เติบโตอย่างมั่นคง พร้อมระบบสนับสนุนครบวงจร",
      en: "Partner with a rapidly growing premium coffee brand backed by comprehensive digital operations and supply support.",
    },
    disclaimer: {
      th: "* ตัวเลขทั้งหมดเป็นข้อมูลจำลองเพื่อสาธิตระบบ ไม่ใช่ข้อเสนอการลงทุนอย่างเป็นทางการ",
      en: "* All figures are illustrative demo estimates and do not constitute an official investment offer.",
    },
    viewDetailsText: {
      th: "ดูรายละเอียดแฟรนไชส์",
      en: "Explore Franchise",
    },
  },

  branchTeaser: {
    badge: {
      th: "FIND A STORE",
      en: "FIND A STORE",
    },
    title: {
      th: "ค้นหาสาขาใกล้คุณ",
      en: "Find a Store Near You",
    },
    subtitle: {
      th: "แวะมาสัมผัสบรรยากาศความหอมกรุ่นของกาแฟคั่วสดได้ที่หน้าร้านกว่า 45 สาขา",
      en: "Step into our cozy coffee space and savor the fresh aroma across 45+ locations nationwide.",
    },
    searchPlaceholder: {
      th: "ค้นหาด้วยชื่อสาขา หรือย่าน...",
      en: "Search by branch name or neighborhood...",
    },
    allProvinces: {
      th: "ทุกจังหวัด",
      en: "All Provinces",
    },
    viewAllBranches: {
      th: "ดูสาขาทั้งหมด",
      en: "View All Locations",
    },
    openHoursLabel: {
      th: "เปิดบริการ:",
      en: "Opening Hours:",
    },
  },

  finalCta: {
    bgImage: SITE_IMAGES.cta.finalCtaCoffee,
    heading: {
      th: "เริ่มวางแผนร้านกาแฟของคุณวันนี้",
      en: "Start Planning Your Coffee Shop Today",
    },
    description: {
      th: "มีทำเลอยู่แล้ว หรือยังเริ่มจากไอเดีย? พูดคุยกับทีมงานเรื่องรูปแบบร้าน งบลงทุน และขั้นตอนการร่วมแฟรนไชส์",
      en: "Have a location in mind, or just an idea? Talk with our team about store formats, investment and the steps to becoming a franchise partner.",
    },
    consultText: {
      th: "ปรึกษาเรื่องเปิดร้าน",
      en: "Talk to Our Team",
    },
    franchiseText: {
      th: "แพ็กเกจแฟรนไชส์",
      en: "Franchise Packages",
    },
  },
};

