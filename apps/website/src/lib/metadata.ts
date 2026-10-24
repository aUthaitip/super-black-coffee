import type { Metadata } from "next";

export const SITE_NAME = "Super Black Coffee";
export const SITE_DESCRIPTION =
  "กาแฟออร์แกนิกจากไร่บนดอยสูง ณ แขวงหัวพัน สปป.ลาว สู่แก้วของคุณ พร้อมเมนูเครื่องดื่ม สาขา และโอกาสร่วมธุรกิจแฟรนไชส์ Super Black Coffee";

const BRAND_KEYWORDS = [
  "Super Black Coffee",
  "Superblack Coffee",
  "ซูเปอร์แบล็คคอฟฟี่",
  "กาแฟออร์แกนิก",
  "organic coffee",
];

export function getMetadataBase(): URL {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://superblackcoffee.com";

  const url = new URL(value);
  if (!["https:", "http:"].includes(url.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an http or https URL");
  }
  return new URL(url.origin);
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = "/services/superblackcoffee-organic-laos.webp",
  type = "website",
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: { absolute: fullTitle },
    description,
    keywords: [...new Set([...BRAND_KEYWORDS, ...keywords])],
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "th_TH",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: path,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: image, alt: title }],
    },
  };
}
