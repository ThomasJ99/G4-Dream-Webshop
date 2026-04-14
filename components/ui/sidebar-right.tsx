"use client";

import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { removeCartItem, updateQuantity } from "@/lib/actions/cart-actions";
import { supabase } from "@/supabaseClient";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  categories: {
    id: number;
    name: string;
    slug: string;
  } | null;
};

export default function SidebarRight({
  className,
  hidden,
}: {
  className?: string;
  hidden: boolean;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCartProducts() {
      try {
        const cartId = Cookies.get("cartId");
        if (!cartId) return;

        const { data: cartItems } = await supabase
          .from("cart_items")
          .select("product_id, quantity")
          .eq("cart_id", cartId)
          .limit(10);

        if (!cartItems || cartItems.length === 0) {
          setProducts([]);
          return;
        }

        const productIds = cartItems.map((item) => item.product_id);
        const { data: fetchedProducts } = await supabase
          .from("products")
          .select("id, title, price, thumbnail, categories(id, name, slug)")
          .in("id", productIds);

        const merged = fetchedProducts?.map((p) => ({
          ...p,
          quantity: cartItems.find((c) => c.product_id === p.id)?.quantity ?? 1,
          categories: Array.isArray(p.categories)
            ? (p.categories[0] ?? null)
            : p.categories,
        }));

        setProducts(merged ?? []);
      } catch (err) {
        console.error("Failed to load cart products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCartProducts();
    const interval = setInterval(loadCartProducts, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${className ?? ""} fixed z-40 top-16 right-0 bg-white/50 backdrop-blur-sm shadow-sm rounded-bl-4xl`}
    >
      <motion.aside
        className="flex overflow-hidden"
        variants={{
          visible: { width: 420 },
          hidden: { width: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        initial={hidden ? "hidden" : "visible"}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col w-[430px] overflow-hidden text-gray-600">
          <header className="py-3 border-b-3 border-border px-3 flex min-w-[400px]">
            <h2 className="flex items-center text-md font-bold mx-auto">
              Items in Cart
            </h2>
          </header>

          <ul className="flex flex-col min-w-[430px] overflow-y-auto max-h-[40vh]">
            {loading ? (
              <li className="text-center text-sm text-gray-400 p-4">
                Loading...
              </li>
            ) : products.length === 0 ? (
              <li className="text-center text-sm text-gray-400 p-4">
                No items in cart
              </li>
            ) : (
              products.map((product, index) => (
                <li
                  key={product.id}
                  className={`flex items-center gap-2 px-2 pb-2 ${
                    index > 0 ? "border-t-2 border-border pt-2" : "pt-2"
                  }`}
                >
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={
                        product.thumbnail ??
                        "https://placehold.co/80x80/png?text=N/A"
                      }
                      alt={product.title}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover h-full"
                    />
                  </Link>
                  <div className="h-full flex flex-col gap-1 ml-2 flex-1 mt-auto">
                    <span className="text-sm font-bold leading-tight hover:text-blue-400">
                      <Link href={`/products/${product.id}`}>
                        {product.title}
                      </Link>
                    </span>
                    {product.categories && (
                      <Link
                        href={`/products?_categoryId=${product.categories.id}`}
                        className="text-xs hover:text-blue-400"
                      >
                        {product.categories.name}
                      </Link>
                    )}
                    <span className="text-sm font-semibold mt-auto mb-2">
                      ${product.price}
                    </span>
                  </div>

                  <div className="h-full flex flex-col group relative">
                    {/* Remove button */}
                    <button
                      type="button"
                      className="text-xs text-gray-400 hover:text-red-500 flex justify-end gap-1 transition-colors"
                      onClick={() => removeCartItem(product.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5 mt-px mr-1 hover:cursor-pointer" />
                    </button>

                    {/* Quantity controls */}
                    <div className="flex items-center w-20 h-8 border mt-auto border-input rounded-md">
                      <button
                        type="button"
                        className="h-8 w-8 flex items-center justify-center hover:text-blue-400 disabled:opacity-40"
                        onClick={() =>
                          updateQuantity(product.id, product.quantity - 1)
                        }
                        disabled={product.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3 hover:cursor-pointer" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {product.quantity}
                      </span>
                      <button
                        type="button"
                        className="h-8 w-8 flex items-center justify-center hover:text-blue-400 disabled:opacity-40"
                        onClick={() =>
                          updateQuantity(product.id, product.quantity + 1)
                        }
                        disabled={product.quantity >= 10}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3 hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </motion.aside>
    </div>
  );
}
