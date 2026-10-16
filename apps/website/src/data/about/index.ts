export interface StoryScene {
  id: string;
  badge?: { th: string; en: string };
  title: { th: string; en: string };
  subtitle?: { th: string; en: string };
  desc: { th: string; en: string };
  image: string;
  durationSeconds: number; // default 4s
}

export const ABOUT_STORY_SCENES: StoryScene[] = [
  {
    id: "scene-1",
    title: {
      th: "ไร่กาแฟหัวพัน สปป.ลาว",
      en: "Houaphan Coffee Farm, Lao PDR",
    },
    subtitle: {
      th: "บ้าน ຈາດ (บ้านจาด) · เมืองเวียงไซ · แขวงหัวพัน · สปป.ลาว",
      en: "Ban Jad · Viengxay · Houaphan Province · Lao PDR",
    },
    desc: {
      th: "แหล่งปลูกกาแฟคุณภาพที่ยังคงความบริสุทธิ์ของธรรมชาติ และเต็มไปด้วยเอกลักษณ์เฉพาะตัว",
      en: "A pristine high-altitude terroir surrounded by untouched nature.",
    },
    image: "/about/laos-coffee-farm-dawn.png",
    durationSeconds: 4,
  },
  {
    id: "scene-2",
    badge: {
      th: "รู้จักกับแหล่งปลูกเมล็ดกาแฟของเรา",
      en: "Our Coffee Origin",
    },
    title: {
      th: "ขุมทรัพย์แห่งกาแฟของเอเชียตะวันออกเฉียงใต้",
      en: "Southeast Asia's Hidden Coffee Treasure",
    },
    desc: {
      th: "ไร่ของเราอยู่สูงกว่า 1,200 เมตรจากระดับน้ำทะเล อากาศเย็นตลอดปี ช่วยให้เมล็ดกาแฟเติบโตช้าและสะสมรสชาติได้อย่างเข้มข้น ปลูกแบบออร์แกนิกด้วยแนวทางเกษตรอินทรีย์",
      en: "Perched over 1,200 meters above sea level with cool year-round climate, allowing beans to mature slowly and accumulate rich flavors through organic farming.",
    },
    image: "/about/houaphan-coffee-farm-location.png",
    durationSeconds: 4,
  },
  {
    id: "scene-3",
    badge: {
      th: "พิกัดไร่กาแฟที่หัวพัน สปป.ลาว",
      en: "Farm Coordinates",
    },
    title: {
      th: "พิกัด 20°14'44.2\"N 104°27'09.0\"E",
      en: "Coordinates 20°14'44.2\"N 104°27'09.0\"E",
    },
    desc: {
      th: "คือพื้นที่ปลูกที่โอบล้อมด้วยธรรมชาติ และเป็นต้นทางของเมล็ดกาแฟที่เราดูแลอย่างตั้งใจ ไร่ตั้งอยู่ในเขตบ้าน ຈາດ (บ้านจาด) เมืองเวียงไซ แขวงหัวพัน สปป.ลาว",
      en: "Enveloped by untouched virgin nature, located in Ban Jad, Viengxay District, Houaphan Province, Lao PDR.",
    },
    image: "/about/houaphan-coffee-farm-location.png",
    durationSeconds: 4,
  },
  {
    id: "scene-4",
    badge: {
      th: "01 การดูแลดินในไร่กาแฟ",
      en: "01 Soil Stewardship",
    },
    title: {
      th: "พื้นที่สูงกว่า 1,200 เมตร",
      en: "Altitude Above 1,200 Meters",
    },
    desc: {
      th: "อากาศเย็นตลอดปี ช่วยให้เมล็ดเติบโตช้าและสะสมรสชาติเข้มข้น",
      en: "Year-round cool climate ensures slow maturation, concentrating intense flavors and natural sweetness.",
    },
    image: "/about/organic-soil-life.png",
    durationSeconds: 4,
  },
  {
    id: "scene-5",
    badge: {
      th: "02 ต้นกาแฟที่เติบโตในไร่ สปป.ลาว",
      en: "02 Flourishing Coffee Trees",
    },
    title: {
      th: "ดินภูเขาไฟอุดมสมบูรณ์",
      en: "Rich Volcanic Soil",
    },
    desc: {
      th: "แร่ธาตุจากธรรมชาติช่วยให้เมล็ดมีกลิ่นหอมพิเศษและบอดี้แน่น",
      en: "Abundant natural volcanic minerals impart a distinct fragrance and bold, full-bodied mouthfeel.",
    },
    image: "/about/organic-coffee-growing.png",
    durationSeconds: 4,
  },
  {
    id: "scene-6",
    badge: {
      th: "03 การเก็บเกี่ยวผลกาแฟอย่างคัดสรร",
      en: "03 Selective Hand Harvest",
    },
    title: {
      th: "กระบวนการปลูกแบบออร์แกนิก",
      en: "Organic Cultivation Method",
    },
    desc: {
      th: "ปลอดสารเคมี ด้วยแนวทางเกษตรอินทรีย์เพื่อรสชาติที่สะอาดบริสุทธิ์",
      en: "Free of synthetic chemicals, relying on regenerative organic methods for a clean and pure taste.",
    },
    image: "/about/selective-coffee-harvest.png",
    durationSeconds: 4,
  },
  {
    id: "scene-7",
    badge: {
      th: "04 เส้นทางกาแฟจากต้นทางสู่สาขา",
      en: "04 From Origin to Cups",
    },
    title: {
      th: "เอกลักษณ์ของรสชาติ",
      en: "Signature Flavor Profile",
    },
    desc: {
      th: "สัมผัสโน้ตของช็อกโกแลต ถั่ว และผลไม้เบอร์รี ที่เปรี้ยวอมหวานอย่างลงตัว",
      en: "Tasting notes of rich chocolate, roasted nuts, and berry fruit with an exquisite sweet-tart balance.",
    },
    image: "/about/coffee-journey-transparent.png",
    durationSeconds: 4,
  },
  {
    id: "scene-8",
    badge: {
      th: "การเก็บเกี่ยวผลกาแฟแบบออร์แกนิกในไร่ที่ สปป.ลาว",
      en: "Organic Laos Coffee Harvest",
    },
    title: {
      th: "เส้นทางกาแฟจากดินสู่ถ้วย ตั้งแต่การปลูกจนถึงการเก็บเกี่ยว",
      en: "From Soil to Cup: From Planting to Selective Harvest",
    },
    desc: {
      th: "ทุกขั้นตอนคัดสรรด้วยมืออย่างพิถีพิถัน เพื่อให้ได้เมล็ดกาแฟคุณภาพสูงสุดส่งตรงถึงทุกคน",
      en: "Hand-picked and traditionally sun-dried on elevated African raised beds.",
    },
    image: "/about/organic-coffee-harvest.png",
    durationSeconds: 4,
  },
  {
    id: "scene-9",
    badge: {
      th: "จาก สปป.ลาว สู่สาขาที่เติบโตไปด้วยกัน",
      en: "Expanding Across Thailand",
    },
    title: {
      th: "อยุธยา · พิษณุโลก · ประชาอุทิศ",
      en: "Ayutthaya · Phitsanulok · Pracha Uthit",
    },
    desc: {
      th: "เส้นทางของเราค่อย ๆ เติบโตจากสาขาอยุธยา ไปพิษณุโลก และต่อมาที่ประชาอุทิศ เชื่อมโยงเรื่องราวของกาแฟสู่ผู้คน",
      en: "Our journey steadily unfolded from Ayutthaya to Phitsanulok and Pracha Uthit.",
    },
    image: "/about/soil-to-cup-journey.png",
    durationSeconds: 4,
  },
  {
    id: "scene-10",
    badge: {
      th: "ทีมงานและผู้ประกอบการกำลังร่วมวางแผนธุรกิจ",
      en: "Our Heart & Vision",
    },
    title: {
      th: "เราไม่ได้ทำเพียงกาแฟ แต่สร้างจุดพักที่ทำให้ทุกวันไปต่อได้ดีขึ้น",
      en: "We don't just brew coffee — we craft a sanctuary that empowers every day.",
    },
    desc: {
      th: "Super Black Coffee มุ่งมั่นส่งต่อพลังงานดี ๆ และรสชาติที่จริงใจในทุกแก้วที่คุณดื่ม",
      en: "Super Black Coffee delivers warm hospitality, sincere flavors, and empowering spaces.",
    },
    image: "/about/about-growing-together.png",
    durationSeconds: 4,
  },
];

export const ABOUT_DATA = {
  // Hero Section
  hero: {
    badge: {
      th: "ไร่กาแฟหัวพัน สปป.ลาว",
      en: "Houaphan Coffee Farm, Laos",
    },
    locationDetail: {
      th: "บ้าน ຈາດ (บ้านจาด) · เมืองเวียงไซ · แขวงหัวพัน · สปป.ลาว",
      en: "Ban Jad · Viengxay · Houaphan Province · Lao PDR",
    },
    title: {
      th: "แหล่งปลูกกาแฟคุณภาพที่ยังคงความบริสุทธิ์ของธรรมชาติ และเต็มไปด้วยเอกลักษณ์เฉพาะตัว",
      en: "A Pristine Coffee Terroir Retaining Pure Nature & Unique Identity",
    },
    brandSubtitle: {
      th: "Super Black Coffee",
      en: "Super Black Coffee",
    },
    sectionTitle: {
      th: "รู้จักกับแหล่งปลูกเมล็ดกาแฟของเรา",
      en: "Discover Our Coffee Origin",
    },
    introParagraphs: [
      {
        th: "หัวพัน สปป.ลาว คือหนึ่งในขุมทรัพย์แห่งกาแฟของเอเชียตะวันออกเฉียงใต้ ที่ยังคงความบริสุทธิ์ของธรรมชาติ และเต็มไปด้วยเอกลักษณ์เฉพาะตัว",
        en: "Houaphan, Lao PDR is one of Southeast Asia's greatest coffee treasures, untouched and blessed with remarkable distinctive character.",
      },
      {
        th: "ไร่ของเราอยู่สูงกว่า 1,200 เมตรจากระดับน้ำทะเล อากาศเย็นตลอดปี ช่วยให้เมล็ดกาแฟเติบโตช้าและสะสมรสชาติได้อย่างเข้มข้น",
        en: "Perched over 1,200 meters above sea level with year-round cool climate, allowing coffee cherries to mature slowly and accumulate deep complexity.",
      },
      {
        th: "เราปลูกแบบออร์แกนิกด้วยแนวทางเกษตรอินทรีย์ และดึงเอกลักษณ์ของเมล็ดกาแฟหัวพันออกมาให้ดีที่สุดในทุกแก้วของ Super Black Coffee",
        en: "Organically grown with regenerative agriculture, bringing out the finest nuances of Houaphan beans in every single cup of Super Black Coffee.",
      },
    ],
    image: "/about/laos-coffee-farm-dawn.png",
  },

  // Coordinates Section
  coordinates: {
    badge: {
      th: "พิกัดไร่กาแฟที่หัวพัน สปป.ลาว",
      en: "Houaphan Coffee Coordinates",
    },
    coords: "20°14'44.2\"N 104°27'09.0\"E",
    tagline: {
      th: "พิกัด 20°14'44.2\"N 104°27'09.0\"E คือพื้นที่ปลูกที่โอบล้อมด้วยธรรมชาติ และเป็นต้นทางของเมล็ดกาแฟที่เราดูแลอย่างตั้งใจ",
      en: "Coordinates 20°14'44.2\"N 104°27'09.0\"E enveloped by untouched virgin nature, the very origin of our coffee.",
    },
    locationName: {
      th: "ไร่ตั้งอยู่ในเขตบ้าน ຈາດ (บ้านจาด) เมืองเวียงไซ แขวงหัวพัน สปป.ลาว",
      en: "Located in Ban Jad, Viengxay District, Houaphan Province, Lao PDR",
    },
    image: "/about/houaphan-coffee-farm-location.png",
  },

  // Why Houaphan (4 Pillars)
  whyHouaphan: {
    badge: {
      th: "ทำไมต้องกาแฟจากหัวพัน?",
      en: "Why Houaphan Coffee?",
    },
    title: {
      th: "ทุกปัจจัยของแหล่งปลูก ส่งผลให้กาแฟหัวพันมีรสชาติและกลิ่นที่เป็นเอกลักษณ์",
      en: "Every Terroir Factor Shapes Houaphan Coffee's Unmatched Flavor and Aroma",
    },
    pillars: [
      {
        num: "01",
        label: {
          th: "การดูแลดินในไร่กาแฟ",
          en: "Soil Stewardship in the Farm",
        },
        title: {
          th: "พื้นที่สูงกว่า 1,200 เมตร",
          en: "Altitude Above 1,200 Meters",
        },
        desc: {
          th: "อากาศเย็นตลอดปี ช่วยให้เมล็ดเติบโตช้าและสะสมรสชาติเข้มข้น",
          en: "Year-round cool climate ensures slow maturation, concentrating intense flavors and natural sweetness.",
        },
        image: "/about/organic-soil-life.png",
      },
      {
        num: "02",
        label: {
          th: "ต้นกาแฟที่เติบโตในไร่ สปป.ลาว",
          en: "Coffee Trees Flourishing in Laos",
        },
        title: {
          th: "ดินภูเขาไฟอุดมสมบูรณ์",
          en: "Rich Volcanic Soil",
        },
        desc: {
          th: "แร่ธาตุจากธรรมชาติช่วยให้เมล็ดมีกลิ่นหอมพิเศษและบอดี้แน่น",
          en: "Abundant natural volcanic minerals impart a distinct fragrance and bold, full-bodied mouthfeel.",
        },
        image: "/about/organic-coffee-growing.png",
      },
      {
        num: "03",
        label: {
          th: "การเก็บเกี่ยวผลกาแฟอย่างคัดสรร",
          en: "Selective Coffee Harvesting",
        },
        title: {
          th: "กระบวนการปลูกแบบออร์แกนิก",
          en: "Organic Cultivation Method",
        },
        desc: {
          th: "ปลอดสารเคมี ด้วยแนวทางเกษตรอินทรีย์เพื่อรสชาติที่สะอาดบริสุทธิ์",
          en: "Free of synthetic chemicals, relying on regenerative organic methods for a clean and pure taste.",
        },
        image: "/about/selective-coffee-harvest.png",
      },
      {
        num: "04",
        label: {
          th: "เส้นทางกาแฟจากต้นทางสู่สาขา",
          en: "From Origin to Signature Cups",
        },
        title: {
          th: "เอกลักษณ์ของรสชาติ",
          en: "Signature Flavor Profile",
        },
        desc: {
          th: "สัมผัสโน้ตของช็อกโกแลต ถั่ว และผลไม้เบอร์รี ที่เปรี้ยวอมหวานอย่างลงตัว",
          en: "Tasting notes of rich chocolate, roasted nuts, and berry fruit with an exquisite sweet-tart balance.",
        },
        image: "/about/coffee-journey-transparent.png",
      },
    ],
  },

  // Harvest & Soil to Cup Interlude
  soilToCup: {
    harvestBadge: {
      th: "การเก็บเกี่ยวผลกาแฟแบบออร์แกนิกในไร่ที่ สปป.ลาว",
      en: "Organic Harvest at the Laos Plantation",
    },
    harvestImage: "/about/organic-coffee-harvest.png",
    journeyBadge: {
      th: "เส้นทางกาแฟจากดินสู่ถ้วย ตั้งแต่การปลูกจนถึงการเก็บเกี่ยว",
      en: "The Journey from Soil to Cup: From Planting to Harvest",
    },
    journeyImage: "/about/soil-to-cup-journey.png",
  },

  // Branches Growth Section
  branchesSection: {
    title: {
      th: "จาก สปป.ลาว สู่สาขาที่เติบโตไปด้วยกัน",
      en: "From Lao PDR to Our Flourishing Branches",
    },
    description: {
      th: "เส้นทางของเราค่อย ๆ เติบโตจากสาขาอยุธยา ไปพิษณุโลก และต่อมาที่ประชาอุทิศ",
      en: "Our journey steadily unfolded from our very first branch in Ayutthaya, extending to Phitsanulok, and now thriving at Pracha Uthit.",
    },
    branches: [
      {
        num: "01",
        name: {
          th: "อยุธยา",
          en: "Ayutthaya",
        },
        desc: {
          th: "สาขาแรกที่เราเริ่มต้นทำให้เรื่องราวของกาแฟมีพื้นที่พบผู้คน",
          en: "Our flagship birthplace where our coffee story first met coffee lovers.",
        },
        image: "/branches/ayutthaya-ev-dusk.webp",
      },
      {
        num: "02",
        name: {
          th: "พิษณุโลก",
          en: "Phitsanulok",
        },
        desc: {
          th: "ก้าวต่อไปของการเติบโตและการดูแลประสบการณ์ในแต่ละสาขา",
          en: "The next chapter of expansion, perfecting the guest experience in the lower north.",
        },
        image: "/branches/phitsanulok-dusk.webp",
      },
      {
        num: "03",
        name: {
          th: "ประชาอุทิศ",
          en: "Pracha Uthit",
        },
        desc: {
          th: "จุดเริ่มต้นใหม่ที่กำลังเติบโตได้ดีในเมือง",
          en: "A vibrant new landmark flourishing right in the heart of the city.",
        },
        image: "/branches/pracha-uthit-sunset.webp",
      },
    ],
  },

  // Team & Philosophy Section
  philosophy: {
    tag: {
      th: "ทีมงานและผู้ประกอบการกำลังร่วมวางแผนธุรกิจ",
      en: "Teams & Partners Collaborating for the Future",
    },
    quote: {
      th: "เราไม่ได้ทำเพียงกาแฟ แต่สร้างจุดพักที่ทำให้ทุกวันไปต่อได้ดีขึ้น",
      en: "We don't just brew coffee — we craft a rejuvenating sanctuary that empowers you to keep going every day.",
    },
    image: "/about/about-growing-together.png",
  },
};
