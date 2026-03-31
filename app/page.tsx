import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import CategoryGrid from "@/components/category-grid";
import CategoryGridSkeleton from "@/components/category-grid-skeleton";
import { ProductCard } from "@/components/product-card";
import Hero from "@/components/ui/hero";
import { getProducts } from "@/lib/db/products-db";

export default async function Home() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  const featuredProducts = (await getProducts()).products.slice(0, 4);

  return (
    <main>
      <Hero />

      {/* Category section */}
      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategoryGrid />
      </Suspense>

      {/* Featured section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-2xl sm:text-3xl">
              Featured Products
            </h2>

            <Link
              href={"/products"}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <span className="text-black/80 mb-8 block">Popular right now</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
