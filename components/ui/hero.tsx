import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const heroImages = [
  // Mall
  "https://images.unsplash.com/photo-1580793241553-e9f1cce181af?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // Open Shop sign
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1920&q=80",
  // Red screen with SALE plastered on it
  "https://plus.unsplash.com/premium_photo-1673429738836-b3581b1b6636?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // STORE text
  "https://images.unsplash.com/photo-1635439953647-4568bd2a93af?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzIyfHxzaG9wfGVufDB8fDB8fHww",
];

export default function Hero() {
  // Gets a random number from our heroImages array, can be the same one
  const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];

  return (
    <header className="relative min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <Image
          src={randomImage}
          alt="Dream Webshop hero image"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient looks pretty bad in mobile view */}
        <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 sm:to-transparent to-white/70 transition-colors"></div>
      </div>

      {/* Text section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="max-w-lg text-shadow-xs">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide ps-1">
            New arrivals
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-balance leading-tight">
            Everything you need, all in one place
          </h1>

          <p className="mt-6 text-lg text-black max-w-md leading-relaxed text-balance">
            From electronics to furniture to beauty and fashion - curated
            products from trusted brands, all in one place.
          </p>

          <Link
            className="bg-blue-600 text-center hover:bg-blue-700 items-center text-white inline-flex gap-2 py-2.5 px-5 mt-8 rounded-lg cursor-pointer"
            href={"/products"}
          >
            Explore collection
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </section>

      {/* Shipping info / Badges, will wait with these for now!!!! */}
      {/* <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-48">

          </div>

        </div>
          
      </section> */}
    </header>
  );
}
