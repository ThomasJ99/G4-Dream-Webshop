import { ProductCard } from "@/components/product-card";
import SendMessage from "@/components/send-message";
import Hero from "@/components/ui/hero";
import { getFeaturedProducts } from "@/lib/products";

export default async function Home(params: PageProps<"/">) {
  const featuredProducts = getFeaturedProducts();

  return (
    <main>
      <SendMessage></SendMessage>
      <Hero />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
