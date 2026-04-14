import { FilePenLine, SmilePlus, SquareMinus } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { ProductActions } from "@/components/ui/admin/delete-actions";
import {
  addToFeaturedProductsById,
  removeFeaturedProductById,
} from "@/lib/actions/product-actions";
import { getCategories } from "@/lib/db/categories-db";
import { getFeaturedProducts, getProducts } from "@/lib/db/products-db";
import type { Category, ProductsResponse } from "@/lib/types";
import { getSearchParamsAsString } from "@/utils/getSearchParams";
import ProductTablePagination from "./product-table-pagination";

const thStyle = "p-4 text-sm font-semibold text-gray-500";
const tdStyle = "border-t border-gray-300 text-center p-4 text-ellipsis truncate";

const getColourFromAvailabilityStatus = (stock: number): string => {
  if (stock === 0) {
    return "text-red-500";
  } else if ((stock ?? 0) < 45) {
    return "text-orange-500";
  } else {
    return "text-green-500";
  }
};

function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export default async function ProductTable({
  searchParams,
  productResponse,
  tableType,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  productResponse: ProductsResponse;
  tableType: string;
}) {
  const { products, pages, total } = productResponse;

  // Calculate pages
  const totalProducts = total ?? 0;
  const leftover = totalProducts % 8;
  let totalPages = (totalProducts - leftover) / 8;

  if (leftover > 0) {
    totalPages += 1;
  }

  if (totalPages < 1) {
    totalPages = 1;
  }

  const categories: Category[] = await getCategories();

  return (
    <div className="border border-gray-300 rounded-2xl">
      <table className="w-full overflow-hidden rounded-2xl table-fixed">
        <thead className="bg-gray-50">
          <tr className="">
            <th className={`${thStyle} w-[30%]`}>Product</th>
            <th className={`${thStyle}`}>Category</th>
            <th className={`${thStyle}`}>Price</th>
            <th className={`${thStyle}`}>Stock</th>
            <th className={`${thStyle}`}>Status</th>
            <th className={`${thStyle}`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="bg-white">
              <td className={`${tdStyle} text-start`}>
                <div className="flex">
                  <Image
                    className="mr-4 rounded-2xl"
                    alt="product icon"
                    unoptimized={true}
                    width={50}
                    height={50}
                    src={product.thumbnail}
                  ></Image>
                  <div>
                    <span className="block font-medium">{product.title}</span>
                    <span className="block font-normal text-gray-400 text-sm">
                      {`SKU: ${product.sku}`}
                    </span>
                  </div>
                </div>
              </td>

              <td className={`${tdStyle}`}>
                {categories.find((cat) => cat.id === product.categoryId)?.name ??
                  titleCaseWord(product.tags![0]) ??
                  ""}
              </td>
              <td className={`${tdStyle}`}> {`${product.price} kr`}</td>
              <td className={`${tdStyle}`}>{product.stock}</td>

              <td className={`${tdStyle} ${getColourFromAvailabilityStatus(product.stock ?? 0)}`}>
                {(product.stock ?? 0) === 0
                  ? "Out of Stock"
                  : (product.stock ?? 0) < 45
                    ? "Low Stock"
                    : "In Stock"}
              </td>
              <td className={`${tdStyle} space-x-1.5`}>
                {tableType === "all" ? (
                  <div>
                    <Form
                      className="inline-flex "
                      action={addToFeaturedProductsById}
                    >
                      <input
                        type="hidden"
                        name="product_id"
                        value={product.id}
                      ></input>
                      <button type="submit">
                        <SmilePlus color="blue" size={24}></SmilePlus>
                      </button>
                    </Form>
                    <Link href={`/products/edit/${product.id}`}>
                      <button type="button" className="mr-1">
                        <FilePenLine color="purple" size={24} />
                      </button>
                    </Link>
                    <ProductActions id={String(product.id)} />
                  </div>
                ) : tableType === "featured" ? (
                  <Form
                    className="inline-flex "
                    action={removeFeaturedProductById}
                  >
                    <input
                      type="hidden"
                      name="product_id"
                      value={product.id}
                    ></input>
                    <button type="submit">
                      <SquareMinus color="red" size={24}></SquareMinus>
                    </button>
                  </Form>
                ) : (
                  <div></div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-gray-50 border-t border-t-gray-300 rounded-b-2xl">
        {tableType === "all" ? (
          <ProductTablePagination
            totalPages={totalPages ?? 0}
          ></ProductTablePagination>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
