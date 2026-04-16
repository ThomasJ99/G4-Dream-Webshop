import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

const heroImages = [
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
    <header className="relative min-h-[35vh] sm:min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <Image
          src={randomImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent transition-colors"></div>
      </div>

      {/* Text section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full text-white">
        <div className="max-w-lg text-shadow-md">
          <span className="text-xl font-semibold uppercase tracking-wide">
            New arrivals
          </span>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl max-w-[10ch] font-semibold tracking-tight text-balance leading-none">
            Everything you need, all in one place
          </h1>

          <p className="mt-6 text-xl max-w-md leading-relaxed text-balance">
            From electronics to furniture to beauty and fashion - curated
            products from trusted brands, all in one place.
          </p>

          <Link
            className="text-centeritems-center inline-flex mt-6 rounded-lg cursor-pointer"
            href={"/products"}
          >
            <Button type="button" size={"lg"} className="py-5 px-5">
              Explore collection
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </header>
  );
}
