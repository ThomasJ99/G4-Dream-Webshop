"use client";

import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { ChevronUp, Minus, Plus, Trash2 } from "lucide-react";
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
  setHidden,
}: {
  className?: string;
  hidden: boolean;
  setHidden: (value: boolean) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

    const channel = supabase
      .channel("cart-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cart_items" },
        loadCartProducts,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const cartContent = (
    <div className="flex mx-auto lg:min-w-[420px] flex-col w-full text-gray-600 h-full">
      <header className="py-3 shadow-md px-3 flex">
        <h2 className="flex items-center text-md font-bold mx-auto">
          Items in Cart
        </h2>
      </header>
      <ul
        className="flex flex-col w-full border-b-2 border-border overflow-y-auto flex-1 min-h-0
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-gray-400/80
        [&::-webkit-scrollbar-thumb]:hover:bg-gray-500
        [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {loading ? (
          <li className="text-center text-sm text-gray-400 p-4">Loading...</li>
        ) : products.length === 0 ? (
          <li className="text-center text-sm text-gray-400 p-4">
            No items in cart
          </li>
        ) : (
          products.map((product, index) => (
            <li
              key={product.id}
              className={`flex items-center  px-[3.3%] lg:gap-2 lg:pl-2 lg:pr-5 py-5 h-35  ${
                index > 0 ? "border-t-2 border-border" : ""
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
                  <Link href={`/products/${product.id}`}>{product.title}</Link>
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
              <div className="h-full flex flex-col justify-between">
                <div className="relative flex justify-end">
                  <Tooltip text="Remove item" position="left" arrow={false}>
                    <button
                      type="button"
                      className="text-xs peer text-gray-400 hover:text-red-500 flex transition-colors"
                      onClick={() => removeCartItem(product.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5 ml-auto mt-1 mr-1.5 hover:cursor-pointer" />
                    </button>
                  </Tooltip>
                </div>
                <div className="flex items-center w-20 h-8 border mt-auto border-input  rounded-md">
                  <button
                    type="button"
                    className="h-8 w-8 flex items-center justify-center  hover:text-red-500 disabled:opacity-40"
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
      {isMobile && (
        <button
          className="group mx-auto my-1"
          type="button"
          onClick={() => setHidden(!hidden)}
        >
          <ChevronUp
            className="group-hover:text-blue-400 group-hover:cursor-pointer"
            size={24}
          ></ChevronUp>
        </button>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <motion.div
        className={`${className ?? ""} fixed z-40 top-16 left-0 right-0 w-full overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm`}
        variants={{
          visible: { height: "50vh" },
          hidden: { height: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        initial={hidden ? "hidden" : "visible"}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {cartContent}
      </motion.div>
    );
  }

  return (
    <motion.aside
      className={`${className ?? ""} fixed z-40 top-16 right-0 overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm rounded-bl-lg`}
      variants={{
        visible: { width: 420, height: "40vh" },
        hidden: { width: 0, height: "40vh" },
      }}
      animate={hidden ? "hidden" : "visible"}
      initial={hidden ? "hidden" : "visible"}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {cartContent}
    </motion.aside>
  );
}
