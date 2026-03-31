"use client";
import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navigation({
  cartItemsLength,
}: {
  cartItemsLength: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
  ];

  if (pathname.includes("admin")) return null;

  return (
    <header
      ref={menuRef}
      className="sticky z-50 top-0 w-full bg-white/50 backdrop-blur-sm shadow-sm"
    >
      <nav className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex-1">
          <Link
            className="text-xl font-serif font-bold tracking-tight shrink-0 hover:text-blue-400 transition-colors"
            href="/"
          >
            DreamShop
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-5">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                className="p-2 text-md font-semibold hover:text-blue-400 transition-colors"
                href={item.href}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex-1 flex items-center justify-end gap-2">
          <Link
            className="relative p-2 rounded-sm hover:bg-blue-900/20 hover:text-blue-400 transition-colors"
            href="/cart"
          >
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full text-white flex items-center justify-center text-xs">
              {cartItemsLength}
            </div>
            <ShoppingCart size={24} />
          </Link>

          <div className="md:hidden">
            <button
              className="cursor-pointer p-2 rounded-sm hover:bg-blue-900/20 hover:text-blue-400 transition-colors"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-black px-6 py-2">
          <ul className="flex flex-col gap-2 items-center">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  // rounded-sm hover:bg-blue-900/20
                  className="text-md font-semibold block py-1 px-4 hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
