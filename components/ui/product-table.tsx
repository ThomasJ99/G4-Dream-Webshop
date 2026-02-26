import Image from "next/image";
import { FilePenLine, Trash } from "lucide-react";
import ProductTablePagination from "./product-table-pagination";
import { getSearchParamsAsString } from "@/utils/getSearchParams";
import { getProductsFromParams } from "@/lib/db";

const thStyle = "p-4 text-sm font-semibold text-gray-500";
const tdStyle =
  "border-t border-gray-300 text-center p-4 text-ellipsis truncate";

const getColourFromAvailabilityStatus = (
  availabilityStatus: string | undefined,
): string => {
  let colour = "";
  if (availabilityStatus === "Out of Stock") {
    colour = "text-red-500";
  } else if (availabilityStatus === "In Stock") {
    colour = "text-green-500";
  } else if (availabilityStatus === "Low Stock") {
    colour = "text-orange-500";
  }
  return colour;
};
function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export default async function ProductTable({searchParams, total}: {searchParams: Promise<{ [key: string]: string | string[] | undefined}>; total: number}) {
  const { page = "1", limit = "5", q = "" } = await searchParams;

  const totalPages = Math.floor((total+5)/5);

  const currentLimit = getSearchParamsAsString(limit);
  const currentPage = getSearchParamsAsString(page);
  const currentQuery = getSearchParamsAsString(q);
  console.log(currentLimit, currentPage, q);

  const { products } = await getProductsFromParams(
    currentLimit ?? "",
    currentPage ?? "",
    currentQuery ?? "",
  );

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
                {product.category?.name ??
                  titleCaseWord(product.tags![0]) ??
                  ""}
              </td>
              <td className={`${tdStyle}`}> {`${product.price} kr`}</td>
              <td className={`${tdStyle}`}>{product.stock}</td>
              <td
                className={`${tdStyle} ${getColourFromAvailabilityStatus(product.availabilityStatus)}`}
              >
                {product.availabilityStatus}
              </td>
              <td className={`${tdStyle}`}>
                <button type="button" className="mr-1">
                  <FilePenLine color="purple" size={24} />
                </button>
                <button type="button">
                  <Trash color="red" size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-gray-50 border-t border-t-gray-300 rounded-b-2xl">
        <ProductTablePagination totalPages={totalPages}></ProductTablePagination>
      </div>
    </div>
  );
}
