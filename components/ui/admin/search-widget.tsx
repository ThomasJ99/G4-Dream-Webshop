"use client";

import { Category } from "@/lib/types";
import { ChevronDown, Funnel, Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchWidget({ categories }: { categories: Category[] }) {
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
    <section className="flex bg-white rounded-2xl p-3 gap-10 border border-gray-300 items-center">
      <div className="flex gap-3 relative w-full p-1.5 border border-gray-300 rounded-xl focus-within:border-purple-700 focus-within:border">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 focus:outline-none"
          onChange={(e) => {
            setParam("q", e.target.value);
          }}
        />
      </div>

      <div className="flex p-1.5 border border-gray-300 rounded-xl">
        <select
          className="flex whitespace-nowrap gap-4 px-2 items-center"
          onChange={(e) => {
            setParam("_categoryId", e.target.value);
          }}
        >
          <option value="" defaultValue="">
            All categories
            {/* <ChevronDown /> */}
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex p-1.5 border border-gray-300 rounded-xl">
        <button className="flex whitespace-nowrap gap-4 px-2 items-center" type="button">
          All status
          <ChevronDown />
        </button>
      </div>

      <div className="flex p-1.5 border border-gray-300 rounded-xl">
        <button className="flex gap-2 px-2 items-center" type="button">
          <Funnel className="w-4 h-4 fill-black stroke-black" />
          Filter
        </button>
      </div>
    </section>
  );
}
