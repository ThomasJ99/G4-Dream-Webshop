import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import Hero from "@/components/ui/hero";
import { categories, getFeaturedProducts } from "@/lib/products";

const categoryImages = {
  Outerwear:
    "https://images.unsplash.com/photo-1544923246-77307dd628b1?w=600&q=80",
  Knitwear:
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
  Accessories:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
};

export default async function Home(params: PageProps<"/">) {
  const featuredProducts = getFeaturedProducts();
  const displayCategories = categories.filter(
    (c) => c !== "All" && categoryImages[c],
  );

  return (
    <main>
      <Hero />

      {/* Category section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium">
              Shopy by Category
            </h2>

            <Link
              href={"/products"}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {displayCategories.map((category) => (
              <Link
                key={category}
                href={""}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              >
                {/* Uses the images */}
                {/* <Image src={categoryImages[category]} /> */}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium">
              Featured Products
            </h2>

            <Link
              href={"/products"}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <span className="text-black/80 mb-8 block">Popular right now</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
