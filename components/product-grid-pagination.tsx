"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductGridPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("_page") || 1);
  const currentLimit = searchParams.get("_limit") || 16;
  // const currentCategory = searchParams.get("_categoryId") || "";

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("_page", pageNumber.toString());
    params.set("_limit", currentLimit.toString());
    // params.set("_categoryId", currentCategory.toString());

    return `${pathname}?${params.toString()}`;
  };

  const pages = ["Go to page..."];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i.toString());
  }

  return (
    <div className="flex justify-end gap-4 w-fit m-auto my-12">
      <Link
        className={`${currentPage > 1 ? "text-blue-400" : "text-gray-400"} p-1 hidden sm:block`}
        href={createPageURL(1)}
      >
        <ChevronsLeft />
      </Link>
      <Link
        className={`${currentPage > 1 ? "text-blue-400" : "text-gray-400"} p-1 hidden sm:block`}
        href={createPageURL(Math.max(1, currentPage - 1))}
      >
        <ChevronLeft />
      </Link>

      <Link
        className="bg-blue-600 text-white p-1 min-w-10 text-center rounded-lg"
        href={createPageURL(currentPage)}
      >
        {currentPage}
      </Link>
      <select
        className="border border-blue-400 rounded-xl px-2"
        onChange={(e) => {
          const value = +e.target.value;
          if (value > 0) {
            const url = createPageURL(value);
            router.replace(url);
            e.target.selectedIndex = 0;
          }
        }}
      >
        {pages.map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
      {currentPage < totalPages && (
        <>
          <Link
            className="bg-white text-blue-600 border border-blue-400 p-1 min-w-10 text-center rounded-lg hidden sm:block"
            href={createPageURL(totalPages)}
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        className={`${currentPage >= totalPages ? "text-gray-400" : "text-blue-600"} p-1 hidden sm:block`}
        href={createPageURL(Math.min(totalPages, currentPage + 1))}
      >
        <ChevronRight />
      </Link>
      <Link
        className={`${currentPage >= totalPages ? "text-gray-400" : "text-blue-600"} p-1 hidden sm:block`}
        href={createPageURL(totalPages)}
      >
        <ChevronsRight />
      </Link>
    </div>
  );
}
