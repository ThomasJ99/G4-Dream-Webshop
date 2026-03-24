import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <section className="py-16 bg-black/1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-secondary">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                  alt="Our story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:pl-8">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                  Our Story
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium mb-6 text-balance">
                  Designed in Stockholm, crafted with care
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  At NORD, we believe in the power of simplicity. Our designs are inspired by 
                  the Scandinavian philosophy of lagom—finding balance and harmony in everyday life. 
                  Each piece is thoughtfully created to be both beautiful and functional.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We work with ethical manufacturers and sustainable materials to create 
                  timeless pieces that you&apos;ll treasure for years to come.
                </p>
                <div>
                  <Link href="/products">
                    Discover Our Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}