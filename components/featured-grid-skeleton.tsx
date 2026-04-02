import { Skeleton } from "./ui/skeleton";

export default async function FeaturedGridSkeleton() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          {/* h2 skeleton */}
          <Skeleton className="h-10 w-65 bg-muted" />

          {/* Tiny view all link skeleton */}
          <Skeleton className="h-4 w-16" />
        </div>

        {/* View all skeleton */}
        <Skeleton className="mb-8 h-4 w-35" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
                {/* Image */}
              <Skeleton className="aspect-3/4 w-full rounded-lg bg-muted-foreground" />

              {/* Text below */}
              <Skeleton className="h-4 w-2/4 bg-muted" />
              <Skeleton className="h-3 w-16 bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
