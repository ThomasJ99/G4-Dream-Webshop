"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { deleteProductActionState } from "@/lib/actions";

function DeleteButton() {
  // Get form submission status from parent form
  const { pending } = useFormStatus();
  return (
    <button
      className="cursor-pointer disabled:cursor-not-allowed"
      disabled={pending}
      type="submit"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

export function DeleteFormActionState({
  id,
  children,
  className
}: {
  id: string;
  children?: React.ReactNode;
  className?: string;
}) {
  // Call server action and get state back
  const [state, formAction] = useActionState(deleteProductActionState, null);

  // Watch for state changes and show toast
  useEffect(() => {
    if (state?.message) {
      // Show success or error toast based on message
      if (state.message.includes("success")) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  const handleAction = (formData: FormData) => {
    formAction(formData);
  };

  return (
    <form action={handleAction} className={className}>
      {/* Hidden input with product id */}
      <input hidden readOnly name="id" value={id} />
      {children || <DeleteButton />}
    </form>
  );
}