import { Skeleton } from "@/components/ui/skeleton";

function LoadingPage() {
  return (
    <article className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background skeleton — fills the whole article */}
      <Skeleton className="absolute inset-0 rounded-none bg-zinc-700" />

      {/* Text content anchored to the bottom */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-10 w-70 rounded-lg" />
        </div>
      </div>
    </article>
  );
}

export default LoadingPage;