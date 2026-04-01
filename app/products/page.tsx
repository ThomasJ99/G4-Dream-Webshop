import { getCategories } from "@/lib/db/categories-db";
import { getProducts } from "@/lib/db/products-db";
import type { Category } from "@/lib/types";
import ProductGrid from "@/components/product-grid";
import FilterProducts from "@/components/filter-products";
import { getSearchParamsAsString } from "@/utils/getSearchParams";
import ProductGridPagination from "@/components/product-grid-pagination";

export default async function ProductPage(params: PageProps<"/">) {
  // "params: PageProps<'/'>" contains searchParams, able to fetch async without 'use client'
  const { _categoryId = "", _page = "1", _limit = "8" } = await params.searchParams;

  const currentLimit = getSearchParamsAsString(_limit) as string;
  const currentPage = getSearchParamsAsString(_page) as string;
  const currentCategoryId = getSearchParamsAsString(_categoryId) as string;

  // Create new URL searchParams string
  const searchParams = new URLSearchParams({
    _limit: currentLimit.toString(),
    _page: currentPage.toString(),
    _categoryId: currentCategoryId.toString(),
  });

  // getProducts accepts URL string for fetch
  const { products, total } = await getProducts(searchParams.toString());

  const categories: Category[] = await getCategories();

  // Calculate pages
  const totalProducts = total ?? 0;
  const leftover = totalProducts % 8;
  let totalPages = (totalProducts - leftover) / 8;

  if (leftover > 0) {
    totalPages += 1;
  }

  if (totalPages < 1) {
    totalPages === 1;
  }

  return (
    <main className="mx-auto max-w-7xl">
      <h1 className="text-3xl font-serif mt-16">All Products</h1>
      <span className="text-black/60 mb-8 block mt-2">{total} products found</span>

      <FilterProducts categories={categories} />

      <ProductGrid products={products} categories={categories}></ProductGrid>

      <ProductGridPagination totalPages={totalPages} />
    </main>
  );
}
