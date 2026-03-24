import Form from "next/form";
import { updateProduct } from "@/lib/actions";
import { API_URL } from "@/lib/config";
import type { Product, Category } from "@/lib/types";

export default async function EditForm({ product }: { product: Product }) {
 
  const categories: Category[] = await fetch(`${API_URL}/categories`).then(
    (res) => res.json()
  );

  return (
    <Form action={updateProduct} className="w-full bg-[var(--color-bg)] p-12 rounded-3xl shadow-xl border border-[var(--color-border)]">
      <input type="hidden" name="id" value={product.id} />

      <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-6 items-center">
        <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          minLength={3}
          maxLength={20}
          defaultValue={product.title}
          className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />

        <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="brand">
          Brand
        </label>
        <input
          id="brand"
          name="brand"
          type="text"
          defaultValue={product.brand}
          className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />

        <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="price">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="10"
          max="100000"
          step="0.01"
          defaultValue={product.price}
          className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />

        <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="stock">
          Stock
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          defaultValue={product.stock}
          className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />

        <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="categoryId">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={product.categoryId}
          className="border border-[var(--color-border)] rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          minLength={5}
          maxLength={400}
          defaultValue={product.description}
          className="border border-[var(--color-border)] rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />

        <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="thumbnail">
          Thumbnail
        </label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="text"
          defaultValue={product.thumbnail}
          className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-8 w-auto px-8 bg-[var(--color-primary)] text-white py-2 rounded-lg font-medium hover:opacity-90 transition mx-auto block"
      >
        Save changes
      </button>
    </Form>
  );
}











