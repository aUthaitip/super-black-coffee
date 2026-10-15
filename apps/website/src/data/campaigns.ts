export interface SeasonalCampaign {
  id: string;
  isActive: boolean;
  festivalTag: {
    th: string;
    en: string;
  };
  title: {
    th: string;
    en: string;
  };
  subtitle: {
    th: string;
    en: string;
  };
  description: {
    th: string;
    en: string;
  };
  image: string;
  ctaText: {
    th: string;
    en: string;
  };
  ctaLink: string;
  startDate?: string;
  endDate?: string;
}

export const SEASONAL_CAMPAIGNS: SeasonalCampaign[] = [
  {
    id: "special-brand-campaign",
    isActive: true,
    festivalTag: {
      th: "แคมเปญพิเศษ",
      en: "Special Campaign",
    },
    title: {
      th: "สัมผัสประสบการณ์ Specialty Dark Roast",
      en: "Experience Specialty Dark Roast",
    },
    subtitle: {
      th: "กาแฟดีในทุกจังหวะของคุณ พร้อมเสิร์ฟแล้วทุกสาขา",
      en: "Great Coffee, Every Moment — Now at All Branches",
    },
    description: {
      th: "คัดสรรเมล็ดกาแฟสายพันธุ์พิเศษ คั่วเข้มลึกระดับมาสเตอร์ พร้อมบริการครบวงจรทั้งสถานีชาร์จรถไฟฟ้า DC Fast Charge และจุดรับส่งพัสดุด่วน Bpost65",
      en: "Carefully selected beans crafted with signature deep dark roasting. Enjoy our complete lifestyle hub with DC fast EV charging and express logistics.",
    },
    image: "/coffee/coffee-drinks.webp",
    ctaText: {
      th: "ค้นหาสาขาใกล้คุณ",
      en: "Find a Branch",
    },
    ctaLink: "/branches",
  },
  {
    id: "new-year-celebration",
    isActive: false,
    festivalTag: {
      th: "เทศกาลส่งท้ายปีเก่า ต้อนรับปีใหม่",
      en: "New Year Celebration",
    },
    title: {
      th: "ส่งต่อความสุข ด้วยกาแฟพรีเมียมจาก Super Black",
      en: "Gift Joy with Super Black Premium Coffee",
    },
    subtitle: {
      th: "ชุดของขวัญ Drip Bag Box Set & เมล็ดกาแฟ Single-Origin",
      en: "Exclusive Drip Bag Box Sets & Single-Origin Beans",
    },
    description: {
      th: "มอบรสชาติเข้มลึกระดับมาสเตอร์เป็นของขวัญแทนความห่วงใยแด่คนพิเศษของคุณในเทศกาลปีใหม่นี้",
      en: "Share the masterfully crafted dark roast experience with those who matter most this New Year.",
    },
    image: "/coffee/coffee-story-amber.webp",
    ctaText: {
      th: "เลือกซื้อชุดของขวัญ",
      en: "Shop Gift Sets",
    },
    ctaLink: "/menu",
  },
];

export function getActiveCampaign(): SeasonalCampaign | null {
  const now = new Date();
  
  for (const campaign of SEASONAL_CAMPAIGNS) {
    if (!campaign.isActive) continue;

    // Check date bounds if specified
    if (campaign.startDate && new Date(campaign.startDate) > now) continue;
    if (campaign.endDate && new Date(campaign.endDate) < now) continue;

    return campaign;
  }

  return null;
}
