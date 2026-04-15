import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageSkeleton() {
  return (
    <main className="my-8">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-9">
        <Skeleton className="h-4 w-36" />
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <Skeleton className="aspect-square w-full" />

        <section className="flex flex-col gap-8">
          {/* Summary */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-50" />
            <Skeleton className="h-10 w-full" />
            <div className="flex items-end justify-between mt-4">
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>

          {/* Badge */}
          <Skeleton className="h-6 w-24 rounded-full" />

          {/* Add to cart button */}
          <Skeleton className="h-10 w-full rounded-lg" />

          {/* Details and reviews */}
          <section className="flex gap-32">
            <div className="pt-8 border-t border-border space-y-4 flex-1">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-36" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-28" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-36" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>

            <div className="pt-8 border-t border-border space-y-4 flex-1">
              <Skeleton className="h-4 w-16" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-8" />
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}