import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  return (
    <main>
      {/* Persistent */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={"/products"}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Continue shopping
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl">Shopping Cart</h1>
        {/* TODO: LOGIC FOR AMOUNT OF ITEMS */}
        <span className="text-muted-foreground">(x) items in your cart</span>
      </header>
      {/* If no products */}
      <section className="text-center py-16">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="font-serif text-2xl leading-loose">
          {" "}
          Your cart is empty
        </h2>
        
        <span>Looks live you haven't added any items yet.</span>
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-4 border border-black bg-black text-white py-1.5 px-4 mt-6 rounded-lg hover:border-white hover:opacity-85 transition-colors"
          >
            Start shopping
          </Link>
        </div>
      </section>

      {/* If products */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Logic to map through all items */}
        yes
      </section>
    </main>
  );
}
