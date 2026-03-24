"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="sticky z-100 top-0 flex w-full bg-white/50 backdrop-blur-xs shadow-sm h-14">
      <div className="flex w-[95%] mx-auto h-full">
        <div className="w-[20%] h-full items-center flex">
          <Link
            className="text-xl font-serif font-bold tracking-tight"
            href="#"
          >
            DreamShop
          </Link>
        </div>
        <ul className="w-[60%] h-full items-center flex gap-10 justify-center">
          <li>
            <Link className="text-xl" href="/products">
              Shop
            </Link>
          </li>
          <li>
            <Link className="text-xl" href="/shop">
              About
            </Link>
          </li>
        </ul>

        <div className="w-[20%] h-full items-center flex justify-end">
          <Link className="relative p-2 rounded-lg hover:bg-blue-900" href="#">
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full text-white flex items-center justify-center text-xs">
              2
            </div>
            <ShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
}
