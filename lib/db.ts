import type { Category, Product, ProductsResponse, Review } from "@/lib/types";
import { supabase } from "@/supabaseClient";

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    return [];
  }

  return data;
};

export const getProducts = async (
  limit = 8,
  page = 0,
  query = "",
  categoryId = 0,
): Promise<ProductsResponse> => {
  let queryBuilder = supabase
    .from("products")
    .select("*, categories (id, name, slug, image)", { count: "exact" });

  if (categoryId) {
    queryBuilder = queryBuilder.eq("category_id", categoryId);
  }

  if (query) {
    queryBuilder = queryBuilder.ilike("title", `%${query}%`);
  }

  if (limit) {
    const limitNum = Number(limit);
    queryBuilder = queryBuilder.limit(limitNum);

    if (page) {
      const pageNum = Number(page);
      const offset = (pageNum - 1) * limitNum;
      queryBuilder = queryBuilder.range(offset, offset + limitNum - 1);
    }
  }

  const { data: products, error, count } = await queryBuilder;

  if (error) {
    return {};
  }

  const transformed = products?.map((product) => ({
    ...product,
    categoryId: product.category_id,
    discountPercentage: product.discount_percentage,
    warrantyInformation: product.warranty_information,
    shippingInformation: product.shipping_information,
    availabilityStatus: product.availability_status,
    returnPolicy: product.return_policy,
    minimumOrderQuantity: product.minimum_order_quantity,
    category: product.categories,
  }));

  return {
    products: transformed || [],
    total: count || 0,
    limit: limit ? Number(limit) : undefined,
    page: page ? Number(page) : undefined,
  };
};

export const getProductById = async (id): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories (id, name, slug, image)")
    .eq("id", id)
    .single();

  if (error) {
    return {};
  }

  const transformed = {
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

  return transformed;
};

export const getReviewsByProductId = async (id): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", id);

  if (error) {
    return [];
  }

  const transformed = data?.map((review) => ({
    ...review,
    reviewerName: review.reviewer_name,
    reviewerEmail: review.reviewer_email,
  }));

  return transformed;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  return { error: error?.message };
};

export const updateProduct = async (id): Promise<ProductsResponse> => {
  const { data, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", id)
    .select("*, categories (id, name, slug, image)");

  if (error) {
    return {};
  }

  const transformed = {
    ...data[0],
    categoryId: data[0].category_id,
    discountPercentage: data[0].discount_percentage,
    warrantyInformation: data[0].warranty_information,
    shippingInformation: data[0].shipping_information,
    availabilityStatus: data[0].availability_status,
    returnPolicy: data[0].return_policy,
    minimumOrderQuantity: data[0].minimum_order_quantity,
    category: data[0].categories,
  };

  return transformed;
};
