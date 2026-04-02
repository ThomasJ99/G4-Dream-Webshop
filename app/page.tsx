import { Suspense } from "react";
import CategoryGrid from "@/components/category-grid";
import CategoryGridSkeleton from "@/components/category-grid-skeleton";
import FeaturedGrid from "@/components/featured-grid";
import Hero from "@/components/ui/hero";

export default async function Home() {
  // const cookieStore = await cookies();
  // const cartId = cookieStore.get("cartId")?.value;

  return (
    <main>
      <Hero />

      {/* Category section */}
      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategoryGrid />
      </Suspense>

      <FeaturedGrid />
    </main>
  );
}
