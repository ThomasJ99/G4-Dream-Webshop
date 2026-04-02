import { Suspense } from "react";
import CategoryGrid from "@/components/category-grid";
import CategoryGridSkeleton from "@/components/category-grid-skeleton";
import FeaturedGrid from "@/components/featured-grid";
import FeaturedGridSkeleton from "@/components/featured-grid-skeleton";
import Hero from "@/components/ui/hero";

export default async function Home() {
  // const cookieStore = await cookies();
  // const cartId = cookieStore.get("cartId")?.value;

  return (
    <main>
      <Hero />

      {/* Suspense around components that need to be async for skeleton to work */}

      {/* Category section */}
      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategoryGrid />
      </Suspense>

      {/* Featured section */}
      <Suspense fallback={<FeaturedGridSkeleton />}>
        <FeaturedGrid />
      </Suspense>
    </main>
  );
}
