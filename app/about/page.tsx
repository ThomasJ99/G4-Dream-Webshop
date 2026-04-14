import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-transparent" />

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

// ****** OLD VERSION BELOW: REMOVE NEAR THE END OF THE PROJECT ****** //

/* <section className="py-16 bg-black/1 text-balance">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1698858212917-9dbd472abecb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWUlMjBpbWFnZXMlMjBzdG9ja2hvbG18ZW58MHx8MHx8fDA%3D"
              alt="Our story"
              fill
              className="object-cover"
            />
          </div>

          <section className="lg:pl-8 space-y-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">
              Our Story
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl text-pretty">
              Everything you need, all in one place
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              At DreamShop, we believe shopping should be simple and enjoyable.
              From electronics and furniture to beauty and fashion, our curated
              selection brings together the best products across every category.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              We partner with trusted brands and sellers to make sure every
              product meets our standards — so you can shop with confidence.
            </p>

            <div className="inline-block">
              <Link
                href="/products"
                className="flex gap-2 border py-2.5 px-5 rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                Discover Our Collection
                <ArrowRight className="ml-2 h-4 w-4 mt-1" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section> */
