"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  image: string;
  quantity: number[];
};

export default function SidebarRight({
  className,
  hidden,
  cartItems,
}: {
  className?: string;
  hidden: boolean;
  cartItems: CartItem[];
}) {
  return (
    <div
      className={`${className ?? ""} fixed z-40 top-16 right-0 bg-white/50 backdrop-blur-sm shadow-sm rounded-bl-4xl`}
    >
      <motion.aside
        className="flex overflow-hidden"
        variants={{ visible: { width: 250 }, hidden: { width: 0 } }}
        animate={hidden ? "hidden" : "visible"}
        initial={hidden ? "hidden" : "visible"}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="pt-3 flex flex-col my-5 w-[250px]">
          <header className="pb-5 mb-8 border-b-3 border-border px-3 flex">
            <h2 className="flex gap-5 items-center text-2xl font-bold mx-auto">
              Cart <ShoppingCart fill="black" />
            </h2>
          </header>

          <ul className="flex flex-col gap-5 mx-auto w-[80%]">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-semibold">{item.name}</span>
                  {/* + - counter here later */}
                  <span className="text-xs text-muted-foreground">
                    Qty: {item.quantity[0]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.aside>
    </div>
  );
}
