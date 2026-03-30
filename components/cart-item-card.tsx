"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

interface CartItemCardProps {
  item: Product;
  quantity: number;
}

export function CartItemCard({ item, quantity }: CartItemCardProps) {
  //   const { updateQuantity, removeItem } = useCart();

  //   const handleQuantityChange = (newQuantity: number) => {
  //     updateQuantity(item.product.id, item.size, item.color, newQuantity);
  //   };

  //   const handleRemove = () => {
  //     removeItem(item.product.id, item.size, item.color);
  //   };

  return (
    <article className="flex gap-4 sm:gap-6 pb-6 border-b border-border">
      {/* Product Image */}
      <Link href={`/products/${item.id}`} className="shrink-0">
        <div className="w-24 h-32 sm:w-32 sm:h-40 relative rounded-md overflow-hidden bg-secondary">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between gap-4">
          <div>
            <Link href={`/products/${item.id}`}>
              <h3 className="font-medium hover:underline underline-offset-4">
                {item.title}
              </h3>
            </Link>
            {/* <p className="text-sm text-muted-foreground mt-1">
              {item.color} / {item.size}
            </p> */}
          </div>
          <p className="font-medium shrink-0">
            {item.price}
            {/* {formatPrice(item.product.price * item.quantity)} */}
          </p>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center border border-input rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              //   onClick={() => handleQuantityChange(item.quantity - 1)}
              //   disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-10 text-center text-sm font-medium">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              //   onClick={() => handleQuantityChange(item.quantity + 1)}
              //   disabled={item.quantity >= 10}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            // onClick={handleRemove}
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </article>
  );
}
