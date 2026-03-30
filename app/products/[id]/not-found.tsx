import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotFound() {
  return (
    <section className="text-center py-16">
      <CircleX className="h-16 w-16 mx-auto text-muted-foreground" />
      <h2 className="font-serif text-2xl leading-loose">Product Not Found</h2>

      <span>Something went wrong</span>
      <div>
      </div>
    </section>
  );
}
