"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Category, Product } from "@/lib/types";
import ProductBadge from "./product-badge";

interface ProductCardProps {
  product: Product;
  category?: Category;
  index?: number;
}

export function ProductCard({
  product,
  category,
  index = 0,
}: ProductCardProps) {
  // Choose the first image in the array of image urls
  const firstImage = product.images?.[0];

  return (
    <motion.div
      // Card animations, initial is the initial card value | animate is what it gets set to | transition handles the duration and smoothness
      initial={{ opacity: 0, y: 24, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
    >
      <Link href={`/products/${product.id}`} className="group">
        <article className="space-y-3">
          <div className="aspect-3/4 relative overflow-hidden rounded-lg bg-secondary">
            <Image
              src={firstImage}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Style as badges: look at lovable example */}
            {product.availabilityStatus === "Out of Stock" && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center"></div>
            )}

            {/* Product badges */}
            <div className="absolute top-3 left-3">
              <ProductBadge
                availabilityStatus={product.availabilityStatus}
                discountPercentage={product.discountPercentage}
                stock={product.stock}
                rating={product.rating}
              />
            </div>
          </div>

          {/* Text below image */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {category?.name}
            </p>

            <h3 className="font-medium text-foreground group-hover:underline underline-offset-4">
              {product.title}
            </h3>

            <p className="text-sm text-muted-foreground">{`${product.price} kr`}</p>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
