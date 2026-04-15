"use client";

import { Category } from "@/lib/types";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterProducts({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentActive = searchParams.get("_categoryId") || "";
  const currentQuery = searchParams.get("_q") || "";

  const [searchValue, setSearchValue] = useState(currentQuery);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParam("_q", searchValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(currentQuery);
  }, [currentQuery]);

  const allCategories = [{ id: "", name: "All" }, ...categories];

  return (
    <section>
      {/* Search by text */}
      <form action="" className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </form>

      {/* Category search buttons */}
      <div className="hidden md:block mt-4">
        <div className="no-scrollbar overflow-x-auto">
          <div className="flex w-max gap-2 pb-1">
            {allCategories.map((category) => {
              const isActive = currentActive === category.id.toString();

              return (
                <button
                  type="button"
                  key={category.id || "all"}
                  className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                  onClick={() => {
                    setParam("_categoryId", category.id.toString());
                  }}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category search dropdown */}
      <select
        name="category"
        id="category"
        className="max-w-md rounded-lg border border-input bg-background p-2 mt-4 md:hidden"
        value={currentActive}
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
