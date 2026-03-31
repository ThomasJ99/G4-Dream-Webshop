import { Skeleton } from "@/components/ui/skeleton";

function LoadingPage() {
  return (
    <article className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background skeleton — fills the whole article */}
      <Skeleton className="absolute inset-0 rounded-none bg-muted-foreground" />

      {/* Text content skeleton - anchored to the middle */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-3 w-24" />
          
          {/* Hidden are extra lines that appear on small screens, useful because the text gets more lines */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-3/4 sm:hidden" />
          </div>

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-full sm:hidden" />
          <Skeleton className="h-4 w-[90%] sm:hidden" />

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[85%] sm:hidden" />

          <Skeleton className="h-10 w-70 rounded-lg" />
        </div>
      </div>
    </article>
  );
}

export default LoadingPage;
