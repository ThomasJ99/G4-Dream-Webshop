import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import SendMessage from "@/components/send-message";
import Hero from "@/components/ui/hero";
import { categories, getFeaturedProducts } from "@/lib/products";
import GetProducts from "@/components/get-products";

// Maps each clothing category to a representative background image URL
// Used to display a preview image for each category card in the UI
const categoryImages: Record<string, string> = {
  Outerwear:
    "https://images.unsplash.com/photo-1773289338213-5ddb80074720?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Knitwear:
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
  Accessories:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
};

export default async function Home() {
  const featuredProducts = getFeaturedProducts();
  const displayCategories = categories.filter(
    (c) => c !== "All" && categoryImages[c],
  );

  return (
    <main>
      <GetProducts />
      <Hero />

      {/*****  TODO: ADD CORRECT LINK HREFS TO CATEGORY LINK  ******/}

      {/* Category section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium">
              Shop by Category
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
                className="group relative aspect-4/5 rounded-lg overflow-hidden bg-white/95"
              >
                {/* Uses the images */}
                <Image
                  src={categoryImages[category]}
                  alt={category}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Adds bg to card on the bottom for text to pop */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-medium text-xl leading-relaxed">
                    {category}
                  </h3>
                  <span className="text-white/80 text-sm">
                    Explore collection
                  </span>
                </div>
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
