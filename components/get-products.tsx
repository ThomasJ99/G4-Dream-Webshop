"use client";

import { getProductById } from "@/lib/db/products-db";
import { getReviewsByProductId } from "@/lib/db/reviews-db";
//import { getProductById } from "@/lib/products";

export default function GetProducts() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submit klickat");

    const response = await getReviewsByProductId("5");

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">skicka</button>
    </form>
  );
}
