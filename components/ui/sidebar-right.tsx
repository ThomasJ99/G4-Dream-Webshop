"use client";

import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { removeCartItem, updateQuantity } from "@/lib/actions/cart-actions";
import { supabase } from "@/supabaseClient";
import Tooltip from "./tooltip";

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
    // <div className="fixed z-40 top-16 -right-3 bg-black/10 w-[430px] h-[44.6vh] rounded-bl-lg ">
    <div
      className={`${className ?? ""} fixed w-full md:w-auto z-40 top-16 right-0 bg-white/50 backdrop-blur-sm shadow-sm md:rounded-bl-lg`}
    >
      <motion.aside
        className="flex overflow-hidden"
        variants={{
          visible: { width: "100%" },
          hidden: { width: "0%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        initial={hidden ? "hidden" : "visible"}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col w-full md:w-[430px] overflow-hidden text-gray-600">
          <header className=" py-3 border-b-3 border-gray-600 px-3 flex md:w-[430px]">
            <h2 className="flex items-center text-md font-bold mx-auto">
              Items in Cart
            </h2>
          </header>

          <ul
            className="flex flex-col w-full md:min-w-[420px] overflow-y-auto max-h-[40vh]
          [&::-webkit-scrollbar]:w-2
           [&::-webkit-scrollbar-track]:bg-transparent
           [&::-webkit-scrollbar-thumb]:bg-gray-400/80
           [&::-webkit-scrollbar-thumb]:hover:bg-gray-500
           [&::-webkit-scrollbar-thumb]:rounded-full"
          >
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
                  className={`flex items-center gap-2 px-2 py-5 ${
                    index > 0 ? "border-t-2 border-border " : ""
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
                  <div className="h-full w-full flex flex-col gap-1 ml-2 flex-1 mt-0">
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
                    <span className="text-sm font-semibold mt-auto mb-1">
                      ${product.price}
                    </span>
                  </div>

                  <div className="h-full flex flex-col ">
                    {/* Remove button */}
                    <div className="relative flex justify-end ">
                      <Tooltip text="Remove item" position="left" arrow={false}>
                        <button
                          type="button"
                          className="text-xs peer text-gray-400 hover:text-red-500 flex justify-end gap-1 transition-colors"
                          onClick={() => removeCartItem(product.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5  ml-auto mr-1.5 " />
                        </button>
                      </Tooltip>
                      {/* <span className="absolute right-10 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 peer-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Remove item
                      </span> */}
                    </div>

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
                        <Tooltip
                          text="Decrease quantity"
                          position="left"
                          arrow={false}
                        >
                          <Minus className="h-3 w-3 hover:cursor-pointer" />
                        </Tooltip>
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
                        <Tooltip
                          text="Increase quantity"
                          position="left"
                          arrow={false}
                        >
                          <Plus className="h-3 w-3 hover:cursor-pointer" />
                        </Tooltip>
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
