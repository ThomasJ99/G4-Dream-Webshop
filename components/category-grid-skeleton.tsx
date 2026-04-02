import { Skeleton } from "./ui/skeleton";

export default async function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          {/* h2 skeleton */}
          <Skeleton className="h-10 w-50 bg-muted" />

          {/* Tiny view all link skeleton */}
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="group relative aspect-4/5 rounded-lg"
            >
              {/* Image skeleton */}
              <Skeleton
                // Add h/w
                className="bg-muted-foreground absolute inset-0"
              />

              <div className="absolute bottom-6 left-6 right-6">
                {/* Text skeleton on the bottom of the image */}
                <Skeleton className="h-3 w-30" />
                <Skeleton className="h-3 w-35 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
