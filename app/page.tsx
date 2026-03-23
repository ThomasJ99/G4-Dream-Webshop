import type { ProductsResponse } from "../../lib/types";
import Sidebar from "@/components/ui/admin/sidebar";
import ProductTable from "@/components/ui/admin/product-table";
import Header from "@/components/ui/admin/header";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

const API_URL = "http://localhost:4000";
const defaultLimit = "6";

export default async function Home(params: PageProps<"/">) {
  const featuredProducts = getFeaturedProducts();

  return (
    <main className="flex flex-row min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
