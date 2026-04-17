import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
  return (
    <main>
      {/* Persistent */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-4 w-36 mb-4" />
        <Skeleton className="h-10 w-60 mb-2" />
        <Skeleton className="h-4 w-36" />
      </header>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-38 w-32 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between mt-25 items-center">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="rounded-lg p-6 h-fit space-y-4">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-4 w-full" />
        </div>
      </section>
    </main>
  );
}
