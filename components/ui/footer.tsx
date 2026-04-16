"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { Input } from "./input";

export default function Footer() {
  const footerLinks = [
    {
      category: "Shop",
      links: [
        { name: "All Products", href: "/products" },
        { name: "Favorites", href: "/favorites" },
        { name: "Cart", href: "/cart" },
      ],
    },
    {
      category: "Support",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "Suggestions", href: "#" },
      ],
    },
  ];

  const pathname = usePathname();
  if (pathname.includes("admin")) return null;

  return (
    <footer className="border-t border-gray-300 text-sm text-muted-foreground">
      <div className="grid grid-cols-1 sm:grid-cols-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 gap-8 border-b border-gray-300 pb-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold font-serif text-black">DreamShop</h2>
          <p className="max-w-[30ch] text-balance">
            We bring together trusted brands and curated products to make every
            purchase easy and reliable.
          </p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.category} className="space-y-3">
            <h3 className="text-base font-bold text-black">
              {section.category}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-black">Newsletter</h3>
          <span>
            Subscribe for updates on new arrivals and exclusive offers.
          </span>

          <div className="flex gap-2 w-full">
            <Input
              className="flex-1 min-w-0 h-9"
              autoComplete="email"
              type="email"
              placeholder="Your email"
              aria-label="Email address"
            />
            <Button type="button" size={"lg"}>Join</Button>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl px-4 text-center sm:px-6 lg:px-8 mx-auto my-5 gap-5">
        <span className="mr-auto">© 2026 DreamShop. All rights reserved.</span>
        <div className="flex ml-auto gap-8">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
