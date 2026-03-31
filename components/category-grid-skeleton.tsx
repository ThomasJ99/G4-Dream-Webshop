import { getCategories } from "@/lib/db/categories-db";
import { Skeleton } from "./ui/skeleton";

export default async function CategoryGrid() {
  const categories = await getCategories();

  const array = categories.splice(0, 3);
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          {/* h2 skeleton */}
          <Skeleton className="font-serif text-2xl sm:text-3xl" />

          {/* Tiny view all link skeleton */}
          <Skeleton className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {array.map((q) => (
            <div
              key={q.id}
              className="group relative aspect-4/5 rounded-lg overflow-hidden bg-white/95"
            >
              {/* Image skeleton */}
              <Skeleton
                // Add h/w
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-6 left-6 right-6">
                {/* Text skeleton on the bottom of the image */}
                <Skeleton className="text-white text-xl leading-relaxed" />
                <Skeleton className="text-white/80 text-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
