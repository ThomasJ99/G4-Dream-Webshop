import { Product } from "@/app/types";
import Image from "next/image";
import { FilePenLine, Trash } from "lucide-react";

export default function ProductTable({ products }: { products: Product[] }) {
  const tdStyle = "border-t border-gray-300 text-center p-4";

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

  return (
    <div className="border border-gray-300 rounded-2xl">
      <table className="w-full overflow-hidden rounded-2xl">
        <thead className="bg-gray-50  ">
          <tr className="">
            <th className="p-4 text-sm font-semibold text-gray-500   rounded-tl-2xl">
              Product
            </th>
            <th className="p-4 text-sm font-semibold text-gray-500">
              Category
            </th>
            <th className="p-4 text-sm font-semibold text-gray-500">Price</th>
            <th className="p-4 text-sm font-semibold text-gray-500">Stock</th>
            <th className="p-4 text-sm font-semibold text-gray-500">Status</th>
            <th className="p-4 text-sm font-semibold text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="">
              <td className={`${tdStyle} text-start`}>
                <div className="flex">
                  <Image
                    className="mr-4 rounded-2xl"
                    alt="product icon"
                    unoptimized={true}
                    width={50}
                    height={50}
                    src={product.category?.image ?? ""}
                  ></Image>
                  <div>
                    <span className="block font-medium">{product.title}</span>
                    <span className="block font-normal text-gray-400 text-sm">
                      {`SKU: ${product.sku}`}
                    </span>
                  </div>
                </div>
              </td>
              <td className={`${tdStyle}`}>{product.category?.name}</td>
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
        Pagination stuff..
      </div>
    </div>
  );
}
