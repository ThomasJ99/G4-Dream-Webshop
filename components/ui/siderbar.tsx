"use client";

import Link from "next/link";

const NavItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <li className="hover:bg-purple-600 p-2 rounded-md">
      <Link
        href={href}
        className="px-3 py-2 hover:text-blue-500 transition-colors"
      >
        {label}
      </Link>
    </li>
  );
};

export default function Sidebar() {
  return (
    <section className="flex flex-col gap-6">
      <header className="p-6 border-b border-gray-300">
        <h1 className="text-black font-bold text-4xl">Future Store</h1>
        <span className="text-gray-500">Admin Panel</span>
      </header>
      <nav className="p-6 border-b border-gray-300">
        <ul className="">
          <NavItem href="/products" label="Products" />
          <NavItem href="/analytics" label="Analytics" />
          <NavItem href="/orders" label="Orders" />
          <NavItem href="/customers" label="Customers" />
          <NavItem href="/settings" label="Settings" />
        </ul>
      </nav>
      <footer className="p-6">
        <span className="text-gray-500">
          © 2024 Future Store. All rights reserved.
        </span>
      </footer>
    </section>
  );
}
