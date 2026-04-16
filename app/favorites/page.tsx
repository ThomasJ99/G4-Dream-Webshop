import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import AddFavorite from "@/components/ui/add-favorite";
import RemoveFavorite from "@/components/ui/delete-favorite";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/lib/config";
import { getFavorites } from "@/lib/db/favorites-db";

export const metadata: Metadata = {
  title: "Your Favorites | DreamShop",
  description: "Save products you love and come back to them anytime.",
};

async function getProduct(id: number) {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
  return response.json();
}

export default async function Favorites() {
  // TODO: remove delay.
  // Delay för att se skeleton under dev, MEN produkter tas bort efter 5 sec då.
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // await new Promise(() => {}); // This promise never resolves → loading.tsx stays forever

  const favorites = await getFavorites();
  const products = await Promise.all(
    favorites.map((fav: { product_id: number }) => getProduct(fav.product_id)),
  );

  return (
    <main>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-4xl leading-relaxed">
            Favorites
          </h1>
          <span className="text-muted-foreground mb-8 block">
            {favorites.length} saved products
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                {/* TODO: Remove RemoveFavorite */}
                {/* <RemoveFavorite productId={product.id} /> */}
                <div className="absolute top-2 right-1">
                  <AddFavorite productID={product.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
