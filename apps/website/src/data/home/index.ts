import { SITE_IMAGES } from "../assets";

export const HOME_DATA = {
  hero: {
    bgImage: SITE_IMAGES.hero.sunsetCafe,
    eyebrow: {
      th: "CRAFTED FOR YOUR MOMENT",
      en: "CRAFTED FOR YOUR MOMENT",
    },
    headingLine1: {
      th: "กาแฟดีในทุกจังหวะของคุณ",
      en: "Great Coffee, Every Moment.",
    },
    headingLine2: {
      th: "รสชาติเข้มลึกระดับมาสเตอร์",
      en: "Deeply Roasted Masterpiece",
    },
    description: {
      th: "คัดสรรเมล็ดกาแฟสายพันธุ์พิเศษจากแหล่งปลูกบนดอยสูง คั่วสดใหม่ผ่านระบบควบคุมความร้อนระดับวินาที เพื่อเสิร์ฟรสสัมผัสช็อกโกแลต คาราเมล และบอดี้ที่หนักแน่น",
      en: "Carefully selected single-origin beans grown in high-altitude soil, roasted with second-precision heat control to unlock rich dark chocolate, caramel notes, and an uncompromising body.",
    },
    exploreMenuText: {
      th: "ค้นหาเมนู",
      en: "Explore Our Menu",
    },
    findBranchText: {
      th: "ค้นหาสาขา",
      en: "Find a Branch",
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
      th: "บริการครบวงจรเพื่อทุกการเดินทาง",
      en: "All-in-One Coffee & Lifestyle Hub",
    },
    subtitle: {
      th: "มากกว่าแค่ร้านกาแฟ สัมผัสประสบการณ์ไลฟ์สไตล์ฮับที่รวมกาแฟสเปเชียลตี้ สถานีชาร์จรถไฟฟ้า จุดส่งพัสดุด่วน และระบบบริหารจัดการระดับมาตรฐาน",
      en: "More than just coffee. Experience our lifestyle hub combining specialty dark roast, EV fast charging, courier logistics, and enterprise smart management.",
    },
    items: [
      {
        tag: "PREMIUM COFFEE",
        title: {
          th: "กาแฟพรีเมียมคัดสรร เพื่อทุกช่วงเวลาของคุณ",
          en: "Specially selected premium coffee crafted for every rhythm of life.",
        },
        description: {
          th: "เมล็ดพันธุ์อาราบิก้าสายพันธุ์พิเศษบนดอยสูง ผ่านการคั่วระดับ Deep Dark Roast ปลดล็อกกลิ่นอายดาร์กช็อกโกแลต คาราเมล และรสสัมผัสที่หนักแน่น",
          en: "Single-origin highland Arabica beans roasted with signature precision to unlock velvety dark cocoa and caramel finish.",
        },
        image: "/services/superblackcoffee-service-coffee.webp",
        href: "/menu",
        actionText: { th: "ดูรายละเอียด", en: "Explore Menu" },
        accentColor: "#c69255",
      },
      {
        tag: "EV CHARGING",
        title: {
          th: "แวะชาร์จรถไฟฟ้า พร้อมพักดื่มกาแฟระหว่างเดินทาง",
          en: "EV Fast Charging Station paired with relaxing cafe moments.",
        },
        description: {
          th: "หัวชาร์จเร็ว DC Fast Charge กำลังไฟสูง สะดวก รวดเร็ว พร้อมพื้นที่นั่งพักผ่อนติดแอร์เย็นสบายและเครื่องดื่มแก้วโปรด",
          en: "High-power DC fast-charging stations integrated seamlessly within our cafes for a comfortable recharge break.",
        },
        image: "/services/superblackcoffee-service-ev-charging.webp",
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
        image: "/branches/branch-night-exterior.webp",
        href: "/franchise",
        actionText: { th: "ดูรายละเอียด", en: "Franchise Plans" },
        accentColor: "#fbbf24",
      },
      {
        tag: "SUPERBLACK CONTROL",
        title: {
          th: "ระบบบริหารจัดการร้านค้าและแฟรนไชส์ครบวงจร",
          en: "Complete Smart POS & Enterprise Management Platform.",
        },
        description: {
          th: "ระบบคลาวด์เชื่อมโยงยอดขาย สต็อกวัตถุดิบ บัญชี และระบบควบคุมคุณภาพสูตรชงแบบเรียลไทม์จากศูนย์กลาง HQ",
          en: "Cloud-based enterprise ERP connecting real-time sales, inventory, and branch standard recipe control.",
        },
        image: "/services/superblackcoffee-service-control.webp",
        href: "/franchise-portal",
        actionText: { th: "ดูรายละเอียด", en: "System Details" },
        accentColor: "#34d399",
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
    badge: {
      th: "OUR PHILOSOPHY",
      en: "OUR PHILOSOPHY",
    },
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
      th: "สัมผัสความเข้มลึกที่แท้จริงได้แล้ววันนี้",
      en: "Experience True Roast Intensity Today",
    },
    description: {
      th: "พร้อมเปิดประสบการณ์รสชาติกาแฟพิเศษที่ปรุงสดแก้วต่อแก้ว ที่ Super Black Coffee ทุกสาขาใกล้คุณ",
      en: "Discover crafted specialty coffee made fresh cup-by-cup at any Super Black store near you.",
    },
    exploreMenuText: {
      th: "ค้นหาเมนู",
      en: "Explore Our Menu",
    },
    franchiseText: {
      th: "แพ็กเกจแฟรนไชส์",
      en: "Franchise Packages",
    },
  },
};
