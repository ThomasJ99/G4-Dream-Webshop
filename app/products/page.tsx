import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/db/categories-db";
import { getAllProducts } from "@/lib/db/products-db";
import type { ProductsResponse } from "@/lib/types";
import { Search } from "lucide-react";
import ProductGrid from "@/components/product-grid";

interface Category {
  id: number;
  image: string;
  name: string;
  slug: string;
}

export default async function ProductPage(params: PageProps<"/">) {
  const { categoryId = "" } = await params.searchParams;

  const reqParams = new URLSearchParams({
    categoryId: categoryId.toString(),
  });

  const data: ProductsResponse = await getAllProducts(reqParams.toString());
  const categories: Category[] = await getCategories();

  const { total, products } = data;

  console.log(data);

  return (
    <main className="mx-auto max-w-7xl">
      <h1 className="text-3xl font-serif mt-16">All Products</h1>
      <span className="text-black/60 mb-8 block mt-2">{total} products found</span>

      <section className="mt-16">
        <form action="" className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </form>

        <div>
          <button className="cursor-pointer border-2 border-gray rounded-lg p-2 mr-2 mt-4">
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className="cursor-pointer border-2 border-gray rounded-lg p-2 mr-2 mt-2"
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <ProductGrid products={products} categories={categories}></ProductGrid>
    </main>
  );
}
