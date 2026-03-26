import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/db/categories-db";
import { getAllProducts } from "@/lib/db/products-db";
import type { ProductsResponse } from "@/lib/types";
import {
  getSearchParamsAsNumber,
  getSearchParamsAsString,
} from "@/utils/getSearchParams";

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

  return (
    <main>
      <h1>All Products</h1>
      <span>{total} products found</span>

      <section>
        <form action="">
          <input type="text" placeholder="Search products..." />
          <select name="category-select" id="category-select">
            <option value="" defaultValue="">
              All categories
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </form>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const firstImage = product.images?.[0];
          const productCategory = categories.find(
            (category) => category.id === product.categoryId,
          );

          return (
            <Link key={product.id} href={`/products/${product.id}`}>
              <article>
                {firstImage ? (
                  <Image
                    src={firstImage}
                    alt={product.description}
                    width={300}
                    height={300}
                    loading="eager"
                  />
                ) : null}

                <span>{productCategory?.name}</span>
                <h2>{product.title}</h2>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
