import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabaseClient";

// GET /api/products - Get all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("_limit");
    const page = searchParams.get("_page");
    const query = searchParams.get("q");
    const categoryId = searchParams.get("categoryId");

    let queryBuilder = supabase.from("products").select(`
        *,
        categories (
          id,
          name,
          slug,
          image
        )
      `);

    // Apply filters
    if (categoryId) {
      queryBuilder = queryBuilder.eq("category_id", categoryId);
    }

    if (query) {
      queryBuilder = queryBuilder.ilike("title", `%${query}%`);
    }

    // Apply pagination
    if (limit) {
      const limitNum = parseInt(limit);
      queryBuilder = queryBuilder.limit(limitNum);

      if (page) {
        const pageNum = parseInt(page);
        const offset = (pageNum - 1) * limitNum;
        queryBuilder = queryBuilder.range(offset, offset + limitNum - 1);
      }
    }

    const { data: products, error, count } = await queryBuilder;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the data to match the expected format
    const transformedProducts = products?.map((product) => ({
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

    return NextResponse.json({
      products: transformedProducts || [],
      total: products.length || 0,
      limit: limit ? parseInt(limit) : undefined,
      page: page ? parseInt(page) : undefined,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      categoryId,
      price,
      discountPercentage,
      rating,
      stock,
      tags,
      brand,
      sku,
      weight,
      dimensions,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      returnPolicy,
      minimumOrderQuantity,
      meta,
      images,
      thumbnail,
    } = body;

    // Validate required fields
    if (!title || !price || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields: title, price, categoryId" },
        { status: 400 },
      );
    }

    const productData = {
      title,
      description,
      category_id: categoryId,
      price,
      discount_percentage: discountPercentage,
      rating,
      stock,
      tags,
      brand,
      sku,
      weight,
      dimensions,
      warranty_information: warrantyInformation,
      shipping_information: shippingInformation,
      availability_status: availabilityStatus,
      return_policy: returnPolicy,
      minimum_order_quantity: minimumOrderQuantity,
      meta,
      images,
      thumbnail,
    };

    const { data, error } = await supabase.from("products").insert([productData]).select(`
        *,
        categories (
          id,
          name,
          slug,
          image
        )
      `);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform response
    const transformedProduct = {
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

    return NextResponse.json(transformedProduct, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
