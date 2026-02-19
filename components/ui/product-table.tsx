import { Product } from "@/app/types";

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.title}</td>
            <td>{product.category?.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>{product.availabilityStatus}</td>
            <td>
              <button type="button">Edit</button>
              <button type="button">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
