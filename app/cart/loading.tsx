import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
  return (
    <main>
      {/* Persistent */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors" />
        <Skeleton className="h-4 w-4 mr-1" />

        <Skeleton className="font-serif text-3xl sm:text-4xl leading-relaxed" />
        {/* AMOUNT OF ITEMS */}
        <Skeleton className="text-muted-foreground" />
      </header>

      {/* If products > 0 */}
      {productsWithQuantity?.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart items — spans 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {productsWithQuantity?.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                quantity={item.quantity}
              />
            ))}
          </div>

          {/* Order summary — spans 1 column */}
          <div className="bg-secondary/30 rounded-lg p-6 sticky top-24 h-fit">
            <Skeleton className="font-semibold text-lg" />

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <Skeleton className="text-muted-foreground" />
                <Skeleton />
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <Skeleton />
                <Skeleton />
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <Skeleton />
                {/* Format tax price here with math */}
                <Skeleton />
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>

              <div className="text-center">
                <Skeleton />
                <Skeleton className="text-xs text-muted-foreground inline-block mt-4"/>
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
