import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <article className="space-y-3">
        <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-sm font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="font-medium text-foreground group-hover:underline underline-offset-4">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatPrice(product.price)}
          </p>
        </div>
      </article>
    </Link>
  );
}
