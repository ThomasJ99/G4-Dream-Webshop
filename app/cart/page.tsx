import { ChevronLeft, ShoppingBag } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { NextResponse } from "next/server";
import { CartItemCard } from "@/components/cart-item-card";
import { Button } from "@/components/ui/button";
import { getCartAction } from "@/lib/actions/cart-actions";
import { getCartItemsByIdParams } from "@/lib/db/carts-db";
import { supabase } from "@/supabaseClient";

export default async function Cart() {
  const cartId = (await getCartAction()) as string;
  const reqParams = new URLSearchParams({
    _cartId: cartId,
  });
  console.log(cartId);
  const cartItems = await getCartItemsByIdParams(await reqParams.toString());
  console.log(cartItems);

  const productIds = cartItems.map(({ product_id }) => product_id);

  const { data, error } = await supabase
    .from("products")
    .select(`
        *,
        categories (
          id,
          name,
          slug,
          image
        )
      `)
    .in("id", productIds);

  console.log("DATA: " + data?.map((i) => i.title));
  console.log("ERROR: " + error?.message);

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

        <h1 className="font-serif text-3xl sm:text-4xl leading-relaxed">
          Shopping Cart
        </h1>
        {/* TODO: LOGIC FOR AMOUNT OF ITEMS */}
        <span className="text-muted-foreground">(x) items in your cart</span>
      </header>

      {/* If products */}
      {/* items.length > 0 ? (content below) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Logic to map through all items */}
        <div className="mx-auto ps-4">
          {data?.map((item) => (
            <CartItemCard key={item.id} item={item} quantity={1}></CartItemCard>
          ))}
        </div>
        {/* Order info */}
        <div className="bg-secondary/30 rounded-lg p-6 sticky top-24">
          <h2 className="font-semibold text-lg">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>Price nr</span>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>VAT (included)</span>
              {/* Format tax price here with math */}
              <span>Price</span>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between">
                <span>Total</span>
                {/* Get the total price as kr */}
                <span>Total Price</span>
              </div>
            </div>

            <div className="text-center">
              <Button type="button" size={"lg"} className="w-full">
                Proceed to Checkout
              </Button>

              <span className="text-xs text-muted-foreground inline-block mt-4">
                Free shipping on order over 999 SEK
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional render, : () */}
      {/* If no products */}
      <section className="text-center py-16">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
        <h2 className="font-serif text-2xl leading-loose">
          Your cart is empty
        </h2>

        <span>Looks live you haven't added any items yet.</span>
        <div>
          <Link href="/products">
            <Button type="button" size={"lg"} className="inline-block mt-4">
              Start shopping
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
