"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

// This is just a small demo on how to make a make toasts from searchParams
// maybe not the most useful thing, but could be fun to test
// could probably be written cleaner too...
export function ToastListener() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status");

    if (status === "success") {
      toast.success("Product added successfuly!");
      // Clean up the URL
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("status");
      router.replace(`/?${newParams.toString()}`);
    } else if (status === "updated") {
      toast.success("Product updated successfully!");
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("status");
      router.replace(`/?${newParams.toString()}`);
    } else if (status === "deleted") {
      toast.success("Product deleted successfully!");
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("status");
      router.replace(`/?${newParams.toString()}`);
    }
  }, [searchParams, router]);

  return null;
}