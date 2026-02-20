"use client";

import { ChartLine, Package2, Settings, ShoppingCart,User,Users } from "lucide-react";
import Link from "next/link";

const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  return (
    <Link href={href}>
      <li className="flex flex-row items-center gap-4 hover:bg-purple-800 hover:text-white p-2 rounded-md">
        {icon}
        {label}
      </li>
    </Link>
  );
};

export default function Sidebar() {
  const links = [
    { href: "/products", icon: <Package2 width={18} height={18}/>, label: "Products" },
    { href: "/analytics", icon: <ChartLine width={18} height={18}/>, label: "Analytics" },
    { href: "/orders", icon: <ShoppingCart width={18} height={18}/>, label: "Orders" },
    { href: "/customers", icon: <Users width={18} height={18}/>, label: "Customers" },
    { href: "/settings", icon: <Settings width={18} height={18}/>, label: "Settings" },
  ];
  return (
    <section className="flex flex-col gap-6 min-h-screen">
      <header className="p-6 pb-3 border-b border-gray-300">
        <h1 className="text-black font-bold text-3xl mb-2">Future Store</h1>
        <span className="text-gray-500">Admin Panel</span>
      </header>
      <nav className="p-6 flex-1">
        <ul className="flex flex-col gap-4 text-gray-600 text-sm">
          {links.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
            />
          ))}
        </ul>
      </nav>
      <footer className="p-6 flex flex-row items-center gap-2 border-t border-gray-300">
        <User
          height={52}
          width={52}
          className="bg-purple-800 rounded-full p-3 text-white"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700">
            Admin user
          </span>
          <span className="text-gray-500 text-xs">admin@futurestore.com</span>
        </div>
      </footer>
    </section>
  );
}
