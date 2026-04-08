"use client";

import { Category } from "@/lib/types";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function FilterProducts({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key === "_categoryId" || key === "_q") {
      params.set("_page", "1");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="mt-16">
      {/* Search by text */}
      <form action="" className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          defaultValue={searchParams.get("q")?.toString() || ""}
          onChange={(e) => {
            setParam("_q", e.target.value);
          }}
        />
      </form>

      {/* Category search buttons */}
      <div className="hidden md:block">
        <button
          type="button"
          className="cursor-pointer border-2 border-gray rounded-lg p-2 mr-2 mt-4"
          onClick={() => {
            setParam("_categoryId", "");
          }}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className="cursor-pointer border-2 border-gray rounded-lg p-2 mr-2 mt-2"
            onClick={() => {
              setParam("_categoryId", category.id.toString());
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Category search dropdown */}
      <select
        name="category"
        id="category"
        className="max-w-md rounded-lg border border-input bg-background p-2 mt-4 md:hidden"
        defaultValue={searchParams.get("categoryId")?.toString() || ""}
        onChange={(e) => {
          setParam("_categoryId", e.target.value);
        }}
      >
        <option value="">All categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </section>
  );
}
