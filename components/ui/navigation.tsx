"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  Menu,
  PanelRight,
  PanelRightOpen,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SidebarRight from "./sidebar-right";

export default function Navigation({
  cartItemsLength,
}: {
  cartItemsLength: number;
}) {
  const [sidebarHidden, setSidebarHidden] = useState(true);
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
    { name: "Favorites", href: "/favorites" },
  ];

  if (pathname.includes("admin")) return null;

  return (
    <>
      <header
        ref={menuRef}
        className="sticky z-50 top-0 w-full bg-white/50 shadow-sm"
      >
        <div className="w-full h-16 backdrop-blur-sm">
          <nav className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16">
            <Link href="/">
              {/* Full logo — desktop */}
              <svg
                className="hidden sm:block"
                width="200"
                height="38"
                viewBox="0 0 200 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="DreamShop Logo"
              >
                <rect
                  x="0"
                  y="0"
                  width="38"
                  height="38"
                  rx="9"
                  fill="currentColor"
                />
                <text
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fontSize="18"
                  fontWeight="700"
                  fill="white"
                  x="20"
                  y="26"
                  textAnchor="middle"
                >
                  DS
                </text>
                <text
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fontSize="22"
                  fontWeight="700"
                  fill="currentColor"
                  x="52"
                  y="26"
                >
                  Dream
                </text>
                <text
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fontSize="22"
                  fontWeight="300"
                  fill="currentColor"
                  x="129"
                  y="26"
                >
                  Shop
                </text>
              </svg>

              {/* Badge only — mobile */}
              <svg
                className="sm:hidden"
                width="40"
                height="38"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="DreamShop Logo"
              >
                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  rx="9"
                  fill="currentColor"
                />
                <text
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fontSize="18"
                  fontWeight="700"
                  fill="white"
                  x="20"
                  y="26"
                  textAnchor="middle"
                >
                  DS
                </text>
              </svg>
            </Link>

            <div className="flex-1 flex items-center justify-end gap-5">
              <ul className="hidden md:flex items-center gap-5">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      className="p-2 text-xs uppercase tracking-widest font-semibold text-gray-600 hover:text-blue-400 transition-colors"
                      href={item.href}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                className="relative p-2 rounded-sm hover:text-blue-400 transition-colors"
                href="/cart"
              >
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full text-white flex items-center justify-center text-xs">
                  {cartItemsLength}
                </div>
                <ShoppingCart size={24} />
              </Link>
              <div className=" absolute -right-2 top-3">
                <motion.button
                  className="cursor-pointer p-2  transition-colors  hover:text-blue-400 "
                  onClick={() => setSidebarHidden(!sidebarHidden)}
                >
                  <motion.div
                    className=""
                    animate={{ scaleX: sidebarHidden ? 1 : -1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  >
                    <ChevronLeft size={24} />
                  </motion.div>
                </motion.button>
              </div>{" "}
              {/* Leaving old Button here for now. */}
              {/* <div className="md:hidden">
              <button
                className="cursor-pointer p-2 rounded-sm w-10 h-10 flex hover:text-blue-400 transition-colors focus:outline-none"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div> */}
              {/* New BUTTON */}
              <div className="md:hidden">
                <button
                  className="cursor-pointer p-2 rounded-sm w-10 h-10 flex hover:bg-blue-900/20 hover:text-blue-400 transition-colors focus:outline-none"
                  type="button"
                  aria-label="Toggle menu"
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div
                    className={`flex flex-col items-center justify-center w-6 h-6`}
                  >
                    {/* Top Bar Wrapper */}
                    <div
                      className={`w-full transition-transform ease-in-out ${isOpen ? "duration-400 delay-100 translate-y-0.5" : "duration-400 translate-y-0 delay-300"}`}
                    >
                      <div
                        className={`bg-current h-0.5 w-full transition-transform duration-400 ease-in-out ${isOpen ? "duration-400 rotate-45 delay-400" : "duration-400 rotate-0 delay-0"}`}
                      />
                    </div>

                    {/* Middle Bar */}
                    <div
                      className={`w-full transition-[margin] duration-500 ${isOpen ? "my-0" : "my-2 delay-300"}`}
                    >
                      <div
                        className={`bg-current h-0.5 w-full transition-transform ease-in-out ${isOpen ? "duration-300 scale-x-0" : "duration-300 delay-400 scale-x-100"}`}
                      />
                    </div>

                    {/* Bottom Bar Wrapper */}
                    <div
                      className={`w-full transition-transform ease-in-out ${isOpen ? "duration-400 delay-100 -translate-y-0.5" : "duration-400 translate-y-0 delay-300"}`}
                    >
                      <div
                        className={`bg-current h-0.5 w-full transition-transform ease-in-out ${isOpen ? "duration-400 -rotate-45 delay-400" : "duration-400 rotate-0 delay-0"}`}
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.7, ease: "easeInOut" },
                opacity: { duration: 0.7, ease: "easeInOut" },
              }}
              className={`md:hidden absolute top-16 w-full
              border-t border-black/20 backdrop-blur-sm
              bg-white/50 shadow-sm overflow-hidden z-50`}
            >
              <ul className="flex flex-col gap-3 px-6 py-6 items-center">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-md font-semibold block py-1 px-4 hover:text-blue-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <SidebarRight hidden={sidebarHidden} setHidden={setSidebarHidden} />
      {/* className="hidden md:block" if not want sidebar on mobile */}
    </>
  );
}
