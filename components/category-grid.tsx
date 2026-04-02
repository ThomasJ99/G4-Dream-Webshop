import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/db/categories-db";

export default async function CategoryGrid() {
  // TODO: REMOVE THIS LINE OF CODE LATER, GOOD TO TEST SKELETONS
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const categories = await getCategories();

  const displayCategories = categories.splice(0, 3);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl">Shop by Category</h2>

          <Link
            href={"/products"}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products/?categoryId=${category.id}`}
              className="group relative aspect-4/5 rounded-lg overflow-hidden bg-white/95"
            >
              {/* Uses the images */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Adds bg to card on the bottom for text to pop */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl leading-relaxed">
                  {category.name}
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
  );
}
