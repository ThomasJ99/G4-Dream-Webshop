"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
  });

  const menuItems = [
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky z-50 top-0 w-full bg-white/50 backdrop-blur-sm shadow-sm">
      <nav className="flex items-center justify-between mx-[2.5%] h-16">
        {/* Logo — takes up equal space, left-aligned */}
        <div className="flex-1">
          <Link
            className="text-xl font-serif font-bold tracking-tight shrink-0 hover:text-blue-400"
            href="/"
          >
            DreamShop
          </Link>
        </div>

        {/* Center links — truly centered */}
        <ul className="hidden md:flex items-center gap-5">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                className="p-2 text-md font-semibold hover:text-blue-400"
                href={item.href}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side — takes up equal space, right-aligned */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <Link
            className="relative p-2 rounded-sm hover:bg-blue-900/20 hover:text-blue-400 mr-1"
            href="#"
          >
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full text-white flex items-center justify-center text-xs">
              8
            </div>
            <ShoppingCart size={24} className="" />
          </Link>

          <div ref={menuRef} className="md:hidden">
            <button
              className="cursor-pointer p-2 mr-1 rounded-sm hover:bg-blue-900/20 hover:text-blue-400"
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
          <ul className="flex flex-col gap-1 items-center">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  // rounded-sm hover:bg-blue-900/20
                  className="text-md font-semibold block py-1 px-4 hover:text-blue-400"
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
// "use client";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { ShoppingCart, Menu, X } from "lucide-react";
// import { createPortal } from "react-dom";

// export default function Navigation() {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const menuItems = [
//     { name: "Shop", href: "/products" },
//     { name: "About", href: "/about" },
//   ];

//   const dropdown = isOpen && createPortal(
//     <div className="fixed top-14 left-0 right-0 z-40 bg-white/50 backdrop-blur-sm shadow-sm border-t px-6 py-4">
//       <ul className="flex flex-col gap-4 items-center">
//         {menuItems.map((item) => (
//           <li key={item.name}>
//             <Link
//               href={item.href}
//               className="text-xl block py-1"
//               onClick={() => setIsOpen(false)}
//             >
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>,
//     document.body
//   );

//   return (
//     <>
//       <nav className="sticky z-50 top-0 w-full bg-white/50 backdrop-blur-sm shadow-sm">
//         <div className="flex items-center justify-between px-4 h-14">
//           <Link className="text-xl font-serif font-bold tracking-tight shrink-0" href="/">
//             DreamShop
//           </Link>

//           <ul className="hidden md:flex items-center gap-10">
//             {menuItems.map((item) => (
//               <li key={item.name}>
//                 <Link className="text-xl" href={item.href}>{item.name}</Link>
//               </li>
//             ))}
//           </ul>

//           <div className="flex items-center gap-2 shrink-0">
//             <Link className="relative p-2 rounded-lg hover:bg-blue-900/10" href="#">
//               <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full text-white flex items-center justify-center text-xs">
//                 2
//               </div>
//               <ShoppingCart size={20} />
//             </Link>

//             <div ref={menuRef} className="md:hidden">
//               <button className="p-1 rounded-sm" type="button" onClick={() => setIsOpen(!isOpen)}>
//                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {dropdown}
//     </>
//   );
// }
