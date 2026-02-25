

import { API_URL } from "@/lib/config";
import CreateForm from "@/components/ui/create-form";
import type { Category } from "@/lib/types";

export default async function CreatePage() {
  const categories: Category[] = await fetch(
    `${API_URL}/categories`
  ).then((res) => res.json());

  return (
    <main className="bg-[var(--color-bg-muted)] flex justify-center px-6 py-16">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-[var(--color-text-strong)] mb-12 text-center">
          Create New Product
        </h1>

        <CreateForm categories={categories} />
      </div>
    </main>
  );
}