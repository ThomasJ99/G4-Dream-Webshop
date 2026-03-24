import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" border-t-1 border-gray-300 mt-20 pt-10 text-sm text-gray-600">
      <div className=" flex w-[60%] mx-auto justify-between border-b border-gray-300 pb-8">
        <div className="flex flex-col gap-3 w-[24%]">
          <h3 className="text-xl font-bold font-serif text-black">DreamShop</h3>
          <p className="max-w-[30ch]">
            Scandinavian fashion for modern living. Timeless design meets
            sustainable craftsmanship.
          </p>
        </div>

        <div className="flex w-[40%] mx-auto">
          <div className="flex flex-col gap-3 w-1/2">
            <h4 className="text-md font-bold text-black">Shop</h4>
            <ul className="flex flex-col gap-2">
              <li>All Products</li>
              <li>Outerwear</li>
              <li>Knitwear</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <h4 className="text-md font-bold text-black">Support</h4>
            <ul className="flex flex-col gap-2">
              <li>Contact Us</li>
              <li>Shipping & Returns</li>
              <li>Size Guide</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-[24%] ">
          <h4 className="text-md font-bold text-black">Newsletter</h4>
          <p>Subscribe for updates on new arrivals and exclusive offers.</p>
          <div>
            <input></input>
            <button type="button">Join</button>
          </div>
        </div>
      </div>

      <div className="flex w-[60%] mx-auto my-5">
        <span className="mr-auto">© 2026 DreamShop. All rights reserved.</span>
        <div className="ml-auto">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

// Shop
// All Products
// Outerwear
// Knitwear
// Accessories

// Support
// Contact Us
// Shipping & Returns
// Size Guide
// FAQ

// Newsletter
// Subscribe for updates on new arrivals and exclusive offers.

// input:
// Your email
// button:
// Join
