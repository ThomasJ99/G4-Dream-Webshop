import { getCategories } from "@/lib/db/categories-db";
import { getProducts } from "@/lib/db/products-db";
import type { Category, ProductsResponse } from "@/lib/types";
import ProductGrid from "@/components/product-grid";
import FilterProducts from "@/components/filter-products";

export default async function ProductPage(params: PageProps<"/">) {
  const { categoryId = "", q = "" } = await params.searchParams;

  const reqParams = new URLSearchParams({
    categoryId: categoryId.toString(),
    q: q.toString(),
  });

  const data: ProductsResponse = await getProducts(reqParams.toString());
  const categories: Category[] = await getCategories();

  const { total, products } = data;

  console.log(data);

  return (
    <main className="mx-auto max-w-7xl">
      <h1 className="text-3xl font-serif mt-16">All Products</h1>
      <span className="text-black/60 mb-8 block mt-2">{total} products found</span>

      <FilterProducts categories={categories} />

      <ProductGrid products={products} categories={categories}></ProductGrid>
    </main>
  );
}
