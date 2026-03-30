import { ChevronLeft, CircleX } from "lucide-react";
import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="p-8">
      <Link
        href={"/products"}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Products
      </Link>

      <section className="text-center py-16">
        <CircleX className="h-16 w-16 mx-auto text-muted-foreground" />
        <h2 className="font-serif text-2xl leading-loose">Product Not Found</h2>
        <span>Something went wrong</span>
      </section>
    </main>
  );
}
