import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="relative min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <Image
          src={
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          }
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
            Spring & Summer 2026
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-balance leading-tight">
            Discover your personal style
          </h1>

          <p className="mt-6 text-lg text-black max-w-md leading-relaxed">
            Timeless fashion and accessories — carefully curated for those who
            appreciate quality and design.
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
