"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProductTablePagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 5;
  const currentQuery = searchParams.get("q") || "";

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    params.set("limit", currentLimit.toString());
    params.set("q", currentQuery.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-end gap-4">
      <Link scroll={false} href={createPageURL(1)}>
        First
      </Link>
      <Link scroll={false} href={createPageURL(currentPage - 1)}>
        &larr; Previous
      </Link>
      <Link scroll={false} href={createPageURL(currentPage + 1)}>
        Next &rarr;
      </Link>
      <Link scroll={false} href={createPageURL(totalPages)}>
        Last
      </Link>
    </div>
  );
}
