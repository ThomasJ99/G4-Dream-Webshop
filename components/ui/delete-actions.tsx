"use client";

import { Trash } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProductActionState } from "@/lib/actions";

export function ProductActions({ id }: { id: string }) {
  // Track if server action is running
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", id);

      // Call server action to delete product
      await deleteProductActionState(
        { data: null, timestamp: Date.now() },
        formData
      );

      // Change URL - ToastListener reacts to this
      router.push("/?status=deleted");
    });
  };

  return (
    // Button is disabled while isPending = true
    <button type="button" onClick={handleDelete} disabled={isPending}>
      <Trash color="red" size={24} />
    </button>
  );
}