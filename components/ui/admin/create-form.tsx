"use client";

import Form from "next/form";
import { useActionState } from "react";
import { type ActionState, addProductActionState } from "@/lib/actions";
import type { ProductFormData, Category } from "@/lib/types";

const initialState: ActionState = null;

export default function CreateForm({
  categories,
}: {
  categories: Category[];
}) {
  const [state, formAction, pending] = useActionState(
    addProductActionState,
    initialState
  );


  const data = state?.data as ProductFormData;

  return (
    <div className="w-full">
      <Form
        key={state?.timestamp}
        action={formAction}
        className="w-full bg-[var(--color-bg)] p-12 rounded-3xl shadow-xl border border-[var(--color-border)]"
      >
        <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-6 items-center">
         
          <label
            className="font-medium text-[var(--color-text-secondary)]"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            type="text"
            id="title"
            name="title"
            minLength={3}
            maxLength={20}
            defaultValue={data?.title}
            required
          />

         
          <label
            className="font-medium text-[var(--color-text-secondary)]"
            htmlFor="brand"
          >
            Brand
          </label>
          <input
            className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            type="text"
            id="brand"
            name="brand"
            defaultValue={data?.brand}
            required
          />

          
          <label
            className="font-medium text-[var(--color-text-secondary)]"
            htmlFor="price"
          >
            Price
          </label>
          {/* <input
            className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            type="number"
            min="0.5"
            step="0.01"
            id="price"
            name="price"
            defaultValue={data?.price}
            required
          /> */}
          <div className="col-start-2 flex flex-col space-y-1">
            <input
                className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                type="number"
                id="price"
                name="price"
                min="0.5"
                step="0.01"
                defaultValue={data?.price}
                required
            />
            {state?.errors?.price && (
                <p className="text-sm text-red-600">
                {state.errors.price[0]}
                </p>
            )}
            </div>
       
          <label
            className="font-medium text-[var(--color-text-secondary)]"
            htmlFor="stock"
          >
            Stock
          </label>
          <input
            className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            type="number"
            id="stock"
            name="stock"
            defaultValue={data?.stock}
            required
          />

       
          <label
            className="font-medium text-[var(--color-text-secondary)]"
            htmlFor="categoryId"
          >
            Category
          </label>
          <select
            className="border border-[var(--color-border)] rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            id="categoryId"
            name="categoryId"
            defaultValue={data?.categoryId ?? ""}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

        
          <label
            className="font-medium text-[var(--color-text-secondary)]"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="border border-[var(--color-border)] rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            id="description"
            name="description"
            minLength={5}
            maxLength={400}
            defaultValue={data?.description}
            required
          />

        
          <label
            className="font-medium text-[var(--color-text-secondary)]"
            htmlFor="thumbnail"
          >
            Thumbnail
          </label>
          {/* <input
            className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            type="url"
            id="thumbnail"
            name="thumbnail"
            defaultValue={data?.thumbnail}
            required
          />
        </div> */}

    
        <div className="col-start-2 flex flex-col space-y-1">
        <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            defaultValue={data?.thumbnail}
            required
            className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
        {state?.errors?.thumbnail && (
            <p className="text-sm text-red-600">
            {state.errors.thumbnail[0]}
            </p>
        )}
        </div>

    </div>

       
        <button
          type="submit"
          disabled={pending}
          className="mt-8 w-auto px-8 bg-[var(--color-primary)] text-white py-2 rounded-lg font-medium hover:opacity-90 transition mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Saving..." : "Save Product"}
        </button>

       
        {state?.message && (
          <p className="mt-4 text-center text-sm text-[var(--color-danger)]">
            {state.message}
          </p>
        )}
      </Form>
    </div>
  );
}


