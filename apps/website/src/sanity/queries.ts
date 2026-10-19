import { client } from "./client";

// Fetch Menu Items
export async function getMenuItems() {
  const query = `*[_type == "menuItem"] | order(order asc) {
    _id,
    "id": _id,
    nameTh,
    nameEn,
    price,
    category,
    "image": image.asset->url,
    isPopular,
    order
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching menu items from Sanity:", error);
    return [];
  }
}

// Fetch Blog Posts
export async function getBlogPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    titleTh,
    titleEn,
    "title": coalesce(titleTh, titleEn),
    "slug": slug.current,
    excerptTh,
    excerptEn,
    "excerpt": coalesce(excerptTh, excerptEn),
    "coverImage": coverImage.asset->url,
    category,
    publishedAt,
    contentTh,
    contentEn
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching posts from Sanity:", error);
    return [];
  }
}

// Fetch Single Blog Post by Slug
export async function getBlogPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    titleTh,
    titleEn,
    "title": coalesce(titleTh, titleEn),
    "slug": slug.current,
    excerptTh,
    excerptEn,
    "excerpt": coalesce(excerptTh, excerptEn),
    "coverImage": coverImage.asset->url,
    category,
    publishedAt,
    contentTh,
    contentEn
  }`;
  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching post by slug from Sanity:", error);
    return null;
  }
}

// Fetch Branches
export async function getBranches() {
  const query = `*[_type == "branch"] {
    _id,
    nameTh,
    nameEn,
    "slug": slug.current,
    addressTh,
    addressEn,
    openingHours,
    phone,
    mapUrl,
    "image": image.asset->url,
    features
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching branches from Sanity:", error);
    return [];
  }
}

// Fetch Active Promotions & Popups
export async function getPromotions() {
  const query = `*[_type == "promotion" && (active == true || !defined(active))] | order(_createdAt desc) {
    _id,
    titleTh,
    titleEn,
    "bannerImage": bannerImage.asset->url,
    isPopup,
    active,
    linkUrl
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching promotions from Sanity:", error);
    return [];
  }
}
