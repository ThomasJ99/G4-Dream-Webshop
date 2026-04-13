import { supabase } from "@/supabaseClient";
import type { Product, Review } from "@/lib/types";

export const getProductById = async (id): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories (id, name, slug, image)")
    .eq("id", id)
    .single();

  if (error) {
    return;
  }

  const product = {
    ...data,
    categoryId: data.category_id,
    discountPercentage: data.discount_percentage,
    warrantyInformation: data.warranty_information,
    shippingInformation: data.shipping_information,
    availabilityStatus: data.availability_status,
    returnPolicy: data.return_policy,
    minimumOrderQuantity: data.minimum_order_quantity,
    category: data.categories,
  };

  return product;
}

export const getReviewsByProductId = async (id): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", id)

  if (error) {
    return;
  }

  const reviews = data?.map((review) => ({
    ...review,
    reviewerName: review.reviewer_name,
    reviewerEmail: review.reviewer_email,
  }));

  return reviews;
}
