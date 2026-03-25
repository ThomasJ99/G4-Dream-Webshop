import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabaseClient";

// GET /api/products/[id] - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          image
        )
      `)
      .eq("id", params.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        );
      }
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the data to match the expected format
    const transformedProduct = {
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

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (categoryId !== undefined) updateData.category_id = categoryId;
    if (price !== undefined) updateData.price = price;
    if (discountPercentage !== undefined)
      updateData.discount_percentage = discountPercentage;
    if (rating !== undefined) updateData.rating = rating;
    if (stock !== undefined) updateData.stock = stock;
    if (tags !== undefined) updateData.tags = tags;
    if (brand !== undefined) updateData.brand = brand;
    if (sku !== undefined) updateData.sku = sku;
    if (weight !== undefined) updateData.weight = weight;
    if (dimensions !== undefined) updateData.dimensions = dimensions;
    if (warrantyInformation !== undefined)
      updateData.warranty_information = warrantyInformation;
    if (shippingInformation !== undefined)
      updateData.shipping_information = shippingInformation;
    if (availabilityStatus !== undefined)
      updateData.availability_status = availabilityStatus;
    if (returnPolicy !== undefined) updateData.return_policy = returnPolicy;
    if (minimumOrderQuantity !== undefined)
      updateData.minimum_order_quantity = minimumOrderQuantity;
    if (meta !== undefined) updateData.meta = meta;
    if (images !== undefined) updateData.images = images;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", params.id)
      .select(`
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

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
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

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
