import { HomePageContent } from "@/components/home/home-page-content";
import { getPromotions, getBlogPosts } from "@/sanity/queries";

export const revalidate = 60;

export default async function Home() {
  const promotions = await getPromotions();
  const blogPosts = await getBlogPosts();
  return <HomePageContent initialPromotions={promotions} initialPosts={blogPosts} />;
}
