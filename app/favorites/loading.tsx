import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm bg-white ">
      {/* Image */}
      <Skeleton className="aspect-[9/12] w-full bg-zinc-300 animate-pulse" />

      <div className="py-4 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-4/5 bg-zinc-300 animate-pulse" />
          <Skeleton className="h-5 w-3/5 bg-zinc-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function FavoritesLoading() {
  return (
    <main>
      <section className="py-16 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col gap-2 mb-1">
            <Skeleton className="h-9 w-30 bg-zinc-300 animate-pulse" />
            <Skeleton className="h-5 w-35 mb-8 bg-zinc-300 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
