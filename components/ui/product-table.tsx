import { Product } from "@/app/types";
import Image from "next/image";

export default function ProductTable({ products }: { products: Product[] }) {
  const tdStyle = "border-t border-gray-300 text-center p-4";

  return (
    <div className="m-2  border border-gray-300 rounded-2xl">
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
                <Image
                  className="inline mr-4"
                  alt="product icon"
                  unoptimized={true}
                  width={50}
                  height={50}
                  src={product.category?.image ?? ""}
                ></Image>
                <div className="inline-block">
                  <span className="block font-medium">{product.title}</span>
                  <span className="block font-normal text-gray-400">
                    {`SKU: ${product.sku}`}
                  </span>
                </div>
              </td>
              <td className={`${tdStyle}`}>{product.category?.name}</td>
              <td className={`${tdStyle}`}> {`${product.price} kr`}</td>
              <td className={`${tdStyle}`}>{product.stock}</td>
              <td className={`${tdStyle}`}>{product.availabilityStatus}</td>
              <td className={`${tdStyle}`}>
                <button type="button" className="mr-1">
                  Edit
                </button>
                <button type="button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
