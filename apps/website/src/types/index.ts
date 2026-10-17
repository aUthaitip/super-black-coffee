export type Language = "th" | "en";

export interface TranslatedString {
  th: string;
  en: string;
}

export type DrinkType = "hot" | "iced" | "blended";
export type SweetnessLevel = "0%" | "25%" | "50%" | "100%" | "120%";
export type BeanOption = "House Blend" | "Dark Roast" | "Decaf";
export type MenuCategory = "all" | "coffee" | "non-coffee" | "seasonal" | "bakery";

export interface Product {
  id: string;
  slug: string;
  nameTh: string;
  nameEn: string;
  category: "coffee" | "non-coffee" | "seasonal" | "bakery";
  price: number;
  descriptionTh: string;
  descriptionEn: string;
  image: string;
  isRecommended: boolean;
  isAvailable: boolean;
  drinkTypes: DrinkType[];
  sweetnessOptions: SweetnessLevel[];
  beanOptions: BeanOption[];
  ingredientsTh: string[];
  ingredientsEn: string[];
  calories?: number;
  allergensTh?: string[];
  allergensEn?: string[];
  roastLevel?: "Dark" | "Medium-Dark" | "Extra Dark";
  tastingNotes?: { th: string[]; en: string[] };
}

export type Amenity = "drive-thru" | "parking" | "ev-charger" | "wifi" | "power-outlets" | "seating";

export interface Branch {
  id: string;
  slug: string;
  nameTh: string;
  nameEn: string;
  addressTh: string;
  addressEn: string;
  provinceTh: string;
  provinceEn: string;
  region: "central" | "north" | "northeast" | "south" | "east";
  latitude: number;
  longitude: number;
  openingHoursTh: string;
  openingHoursEn: string;
  amenities: Amenity[];
  image: string;
  phone: string;
  googleMapsUrl?: string;
  isOpenNow?: boolean;
  is24Hours?: boolean;
  highlightTagTh?: string;
  highlightTagEn?: string;
  hasPromotions?: boolean;
  promotionsCount?: number;
}

export interface FranchisePackage {
  id: string;
  tier: "S" | "M" | "L";
  nameTh: string;
  nameEn: string;
  taglineTh?: string;
  taglineEn?: string;
  descriptionTh: string;
  descriptionEn: string;
  illustrativeInvestmentTh: string;
  illustrativeInvestmentEn: string;
  franchiseFeeTh?: string;
  franchiseFeeEn?: string;
  sizeTh: string;
  sizeEn: string;
  evStations?: number;
  image?: string;
  planImage?: string;
  recommendedForTh: string;
  recommendedForEn: string;
  targetLocationsTh?: string[];
  targetLocationsEn?: string[];
  includedFeaturesTh: string[];
  includedFeaturesEn: string[];
  popular?: boolean;
}

export interface FranchiseInquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  province: string;
  budget: string;
  preferredPackage: string;
  businessExperience?: string;
  note?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: "general" | "product" | "franchise" | "partnership" | "other";
  message: string;
  createdAt: string;
}
