import { Branch, Amenity } from "@/types";

export interface BranchRegionFilter {
  id: "all" | "central" | "north" | "northeast" | "south";
  nameTh: string;
  nameEn: string;
}

export const BRANCH_REGIONS: BranchRegionFilter[] = [
  { id: "all", nameTh: "ทุกภูมิภาค", nameEn: "All Regions" },
  { id: "central", nameTh: "กรุงเทพฯ & ภาคกลาง", nameEn: "Bangkok & Central" },
  { id: "north", nameTh: "ภาคเหนือ", nameEn: "Northern" },
  { id: "northeast", nameTh: "ภาคตะวันออกเฉียงเหนือ", nameEn: "Northeastern" },
  { id: "south", nameTh: "ภาคใต้", nameEn: "Southern" },
];

export interface AmenityFilterOption {
  id: Amenity;
  labelTh: string;
  labelEn: string;
}

export const AMENITY_OPTIONS: AmenityFilterOption[] = [
  { id: "drive-thru", labelTh: "Drive-Thru", labelEn: "Drive-Thru" },
  { id: "ev-charger", labelTh: "จุดชาร์จ EV", labelEn: "EV Charger" },
  { id: "wifi", labelTh: "ฟรี Wi-Fi", labelEn: "Free Wi-Fi" },
  { id: "power-outlets", labelTh: "ปลั๊กไฟ", labelEn: "Power Outlets" },
  { id: "parking", labelTh: "มีที่จอดรถ", labelEn: "Parking" },
  { id: "seating", labelTh: "ที่นั่งทานในร้าน", labelEn: "Dine-in Seating" },
];

export const MOCK_BRANCHES: Branch[] = [
  {
    id: "b-ayu",
    slug: "ayutthaya",
    nameTh: "สาขาอยุธยา (Flagship & EV Station)",
    nameEn: "Ayutthaya Flagship & EV Station",
    addressTh: "ถนนสายเอเชีย กม.19 ต.คลองสวนพลู อ.พระนครศรีอยุธยา จ.พระนครศรีอยุธยา 13000",
    addressEn: "Asian Highway Km.19, Khlong Suan Phlu, Phra Nakhon Si Ayutthaya 13000",
    provinceTh: "พระนครศรีอยุธยา",
    provinceEn: "Phra Nakhon Si Ayutthaya",
    region: "central",
    latitude: 14.3418,
    longitude: 100.5872,
    openingHoursTh: "ทุกวัน 06:30 - 20:30 น.",
    openingHoursEn: "Daily 06:30 - 20:30",
    amenities: ["ev-charger", "parking", "seating", "wifi", "power-outlets", "drive-thru"],
    image: "/branches/ayutthaya-ev-dusk.webp",
    phone: "035-950-888",
    googleMapsUrl: "https://maps.google.com/?q=Ayutthaya+Thailand",
    isOpenNow: true,
    highlightTagTh: "สาขาเรือธง & จุดชาร์จ EV",
    highlightTagEn: "Flagship & EV Hub",
  },
];
