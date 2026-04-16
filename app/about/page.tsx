import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About | DreamShop",
  description: "Find out about DreamStore's rich history.",
};

export default async function About() {
  // TODO: REMOVE THIS LINE OF CODE LATER, GOOD TO TEST SKELETONS
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  return (
    <article className="relative min-h-[50vh] sm:min-h-[70vh] flex items-center">
      {/* Version 2: Background image with text on top */}
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1698858212917-9dbd472abecb?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWUlMjBpbWFnZXMlMjBzdG9ja2hvbG18ZW58MHx8MHx8fDA%3D"
        alt="Our story - Image of Stockholm City, Gamla Stan featuring a prominent church"
        fill
        className="object-cover"
        priority
      />

      {/* Linear overlay — dark at bottom so text is more readable */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

      {/* Text content */}
      <section className="relative z-9 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="max-w-2xl space-y-6 text-shadow-md text-white">
          <span className="text-md uppercase font-semibold tracking-widest">
            Our Story
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-pretty tracking-tight">
            A store built around you
          </h1>

          <p className="leading-relaxed">
            At DreamShop, we believe shopping should be simple and enjoyable -
            everything you need, all in one place. From electronics and
            furniture to beauty and fashion, our curated selection brings
            together the best products across every category.
          </p>

          <p className="leading-relaxed">
            We partner with trusted brands and sellers to make sure every
            product meets our standards — so you can shop with confidence.
          </p>

          <Link href="/products">
            <Button type="button" size={"lg"} className="py-5 px-5">
              Discover Our Collection
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </article>
  );
}