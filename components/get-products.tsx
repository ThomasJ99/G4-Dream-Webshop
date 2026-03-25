"use client";

import { getAllProducts, getProductById } from "@/lib/actions/products/actions";

export default function GetProducts() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submit klickat");

    const response = await getProductById("15");

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">skicka</button>
    </form>
  );
}
