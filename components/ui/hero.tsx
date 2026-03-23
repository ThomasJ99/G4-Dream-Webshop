import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="relative min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src={
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          }
          alt="Dream Webshop hero image"
          fill="true"
          className="object-cover"
          // Make it load fast when changed to Image
        />
        <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 to-transparent"></div>
      </div>

      {/* Text section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
          Spring & Summer 2026
        </span>
        
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-balance leading-tight">
          Discover your personal style
        </h1>

        <p>
          Timeless fashion and accessories — carefully curated for those who
          appreciate quality and design.
        </p>

        <div className="bg-blue-600 hover:bg-blue-700 text-white inline-block py-3 px-5 rounded-lg cursor-pointer">
          <div className="flex gap-2">
            <Link href={"/products"}>Explore collection</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </section>
    </header>
  );
}
