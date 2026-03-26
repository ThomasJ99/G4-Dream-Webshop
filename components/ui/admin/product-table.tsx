import { FilePenLine, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductActions } from "@/components/ui/admin/delete-actions";
import { API_URL } from "@/lib/config";
import { getProductsFromParams } from "@/lib/db";
import { getCategories } from "@/lib/db/categories-db";
import { getAllProducts } from "@/lib/db/products-db";
import { type Category, Product, type ProductsResponse } from "@/lib/types";
import {
  getSearchParamsAsNumber,
  getSearchParamsAsString,
} from "@/utils/getSearchParams";
import ProductTablePagination from "./product-table-pagination";

const thStyle = "p-4 text-sm font-semibold text-gray-500";
const tdStyle =
  "border-t border-gray-300 text-center p-4 text-ellipsis truncate";

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
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page = "1", limit = "5", q = "" } = await searchParams;

  const currentLimit = getSearchParamsAsString(limit);
  const currentPage = getSearchParamsAsString(page);
  const currentQuery = getSearchParamsAsString(q);

  const params = new URLSearchParams({
    _limit: limit.toString(),
    _page: page.toString(),
  });

  const { products, pages, total } = await getAllProducts(params.toString());
  console.log(page);
  const totalProducts = total ?? 0;
  const totalPages = Math.ceil(totalProducts);

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
                {categories.find((cat) => cat.id === product.categoryId)
                  ?.name ??
                  titleCaseWord(product.tags![0]) ??
                  ""}
              </td>
              <td className={`${tdStyle}`}> {`${product.price} kr`}</td>
              <td className={`${tdStyle}`}>{product.stock}</td>

              <td
                className={`${tdStyle} ${getColourFromAvailabilityStatus(product.stock ?? 0)}`}
              >
                {(product.stock ?? 0) === 0
                  ? "Out of Stock"
                  : (product.stock ?? 0) < 45
                    ? "Low Stock"
                    : "In Stock"}
              </td>
              <td className={`${tdStyle}`}>
                <Link href={`/products/edit/${product.id}`}>
                  <button type="button" className="mr-1">
                    <FilePenLine color="purple" size={24} />
                  </button>
                </Link>

                <ProductActions id={String(product.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-gray-50 border-t border-t-gray-300 rounded-b-2xl">
        <ProductTablePagination
          totalPages={totalPages ?? 0}
        ></ProductTablePagination>
      </div>
    </div>
  );
}
