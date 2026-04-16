import { Skeleton } from "./ui/skeleton";

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-3/4 w-full rounded-lg" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}

export default ProductGridSkeleton;
