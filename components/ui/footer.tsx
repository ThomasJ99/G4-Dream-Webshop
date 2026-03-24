import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";

export default function Footer() {
  return (
    <footer className=" border-t-1 border-gray-300 mt-20 pt-10 text-sm text-gray-600">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[90%] lg:w-[60%] mx-auto gap-8 border-b border-gray-300 pb-8">
        <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
          <span className="text-xl font-bold font-serif text-black">
            DreamShop
          </span>
          <p className="max-w-[30ch]">
            Scandinavian fashion for modern living. Timeless design meets
            sustainable craftsmanship.
          </p>
        </div>

        <div className="flex flex-col gap-3 ">
          <h2 className="text-base font-bold text-black">Shop</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/products">All Products</Link>
            </li>
            <li>
              <Link href="#">Outerwear</Link>
            </li>
            <li>
              <Link href="#">Knitwear</Link>
            </li>
            <li>
              <Link href="#">Accessories</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 ">
          <h2 className="text-base font-bold text-black">Support</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="#">Contact Us</Link>
            </li>
            <li>
              <Link href="#">Shipping & Returns</Link>
            </li>
            <li>
              <Link href="#">Size Guide</Link>
            </li>
            <li>
              <Link href="#">FAQ</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3  ">
          <h2 className="text-base font-bold text-black">Newsletter</h2>
          <span className="max-w-[28ch]">
            Subscribe for updates on new arrivals and exclusive offers.
          </span>
          <div className="flex gap-2 max-w-60">
            <Input
              className="min-w-40"
              autoComplete="email"
              type="email"
              placeholder="Your email"
            />
            <Button type="button">Join</Button>
          </div>
        </div>
      </div>

      <div className="flex w-[60%] mx-auto my-5 gap-5">
        <span className="mr-auto">© 2026 DreamShop. All rights reserved.</span>
        <div className="flex ml-auto gap-2">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
