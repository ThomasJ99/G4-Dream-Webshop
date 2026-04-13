"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
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
        // 1. Get first cart
        const { data: carts } = await supabase
          .from("carts")
          .select("id")
          .order("created_at", { ascending: true })
          .limit(1);

        console.log("carts:", carts);
        const firstCartId = carts?.[0]?.id;
        if (!firstCartId) return;

        // 2. Get cart items for that cart
        const { data: cartItems } = await supabase
          .from("cart_items")
          .select("product_id")
          .eq("cart_id", 2424)
          .limit(10);

        console.log("cartItems:", cartItems);
        if (!cartItems || cartItems.length === 0) return;

        // 3. Get products for those IDs
        const productIds = cartItems.map((item) => item.product_id);
        const { data: products } = await supabase
          .from("products")
          .select("id, title, price, thumbnail")
          .in("id", productIds);

        console.log("products:", products);
        setProducts(products ?? []);
      } catch (err) {
        console.error("Failed to load cart products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCartProducts();
  }, []);

  return (
    <div
      className={`${className ?? ""} fixed z-40 top-16 right-0 bg-white/50 backdrop-blur-sm shadow-sm rounded-bl-4xl`}
    >
      <motion.aside
        className="flex overflow-hidden"
        variants={{
          visible: { width: 250 },
          hidden: { width: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        initial={hidden ? "hidden" : "visible"}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className=" flex flex-col w-[250px] overflow-hidden text-gray-600">
          <header className="py-3 border-b-3 border-border px-3 flex min-w-[230px]">
            <h2 className="flex items-center text-md  font-bold mx-auto">
              Items in Cart
            </h2>
          </header>

          <ul className="flex gap-3 flex-col min-w-[230px] overflow-y-auto max-h-[40vh]">
            {loading ? (
              <li className="text-center text-sm text-gray-400">Loading...</li>
            ) : products.length === 0 ? (
              <li className="text-center text-sm text-gray-400">
                No items in cart
              </li>
            ) : (
              products.map((product, index) => (
                <li
                  key={product.id}
                  className={`flex flex-col items-center gap-2  ${
                    index > 0 ? "border-t-2 border-border" : ""
                  }`}
                >
                  <Image
                    src={
                      product.thumbnail ??
                      "https://placehold.co/80x80/png?text=N/A"
                    }
                    alt={product.title}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <span className="text-center text-sm font-bold leading-tight">
                    {product.title}
                  </span>
                  <span className="text-sm font-semibold">
                    ${product.price}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </motion.aside>
    </div>
  );
}
