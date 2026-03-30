import Image from "next/image";
import Link from "next/link";
import type { Category, Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  category?: Category;
}

export function ProductCard({ product, category }: ProductCardProps) {
  // Choose the first image in the array of image urls
  const firstImage = product.images?.[0];

  return (
    <Link href={`/products/${product.id}`} className="group">
      <article className="space-y-3">
        <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-secondary">
          <Image
            unoptimized
            src={firstImage}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.availabilityStatus === "Out of Stock" && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-sm font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{category?.name}</p>
          <h3 className="font-medium text-foreground group-hover:underline underline-offset-4">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground">{product.price}</p>
        </div>
      </article>
    </Link>
  );
}
