import { HomePageContent } from "@/components/home/home-page-content";
import { getPromotions } from "@/sanity/queries";

export const revalidate = 60;

export default async function Home() {
  const promotions = await getPromotions();
  return <HomePageContent initialPromotions={promotions} />;
}
