import { ChevronLeft, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { CartItemCard } from "@/components/cart-item-card";
import { Button } from "@/components/ui/button";
import { getCartAction } from "@/lib/actions/cart-actions";
import { getCartItemsByIdParams } from "@/lib/db/carts-db";
import { supabase } from "@/supabaseClient";
import { formatPrice } from "@/utils/utils";

export const metadata: Metadata = {
  title: "Shopping Cart | DreamShop",
  description:
    "Review your items, update quantities, and proceed to checkout securely.",
};

export default async function Cart() {
  // TODO: REMOVE THIS LINE OF CODE LATER, GOOD TO TEST SKELETONS
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value as string;
  const reqParams = new URLSearchParams({
    _cartId: cartId,
  });

  let productsWithQuantity: any;
  if (cartId) {
    const cartItems = await getCartItemsByIdParams(await reqParams.toString());

    const productIds = cartItems.map(({ product_id }) => product_id);

    //Get products with quantity
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

    productsWithQuantity = data?.map((item) => ({
      ...item,
      quantity: cartItems
        .filter((i) => i.product_id === item.id)
        .map((j) => j.quantity),
    }));
  }

  let totalPrice = 0;
  productsWithQuantity?.map((item: any) => {
    totalPrice += +item.price * +item.quantity;
    return totalPrice;
  });

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

        <h1 className="font-serif text-3xl sm:text-4xl leading-relaxed mt-2">
          Shopping Cart
        </h1>

        <span className="text-muted-foreground">
          {productsWithQuantity ? productsWithQuantity.length : "0"} items in
          your cart
        </span>
      </header>

      {/* If products > 0 */}
      {productsWithQuantity?.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart items — spans 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {productsWithQuantity?.map((item: any) => (
              <CartItemCard
                key={item.id}
                item={item}
                quantity={item.quantity}
              />
            ))}
          </div>

          {/* Order summary — spans 1 column */}
          <div className="bg-secondary/30 rounded-lg p-6 sticky top-24 h-fit">
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
                  {formatPrice(totalPrice)}
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
      ) : (
        <section className="text-center py-16">
          {/* If 0 products */}
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="font-serif text-2xl leading-loose">
            Your cart is empty
          </h2>

          <span>Looks like you haven't added any items yet.</span>
          <div>
            <Link href="/products">
              <Button type="button" size={"lg"} className="inline-block mt-4">
                Start shopping
              </Button>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
