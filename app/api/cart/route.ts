import { type NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/lib/types";
import { supabase } from "@/supabaseClient";

// GET /api/cart
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("_userId");
    const cartId = searchParams.get("_cartId");

    //   const { data, error } = await supabase
    // .from("cart")
    // .select("*")

    let queryBuilder = supabase
      .from("cart")
      .select("*")
      .order("created_at", { ascending: false });

    // Filter by product ID if provided
    if (userId) {
      queryBuilder = queryBuilder.eq("user_id", userId);
    } else if (cartId) {
      queryBuilder = queryBuilder.eq("cart_id", cartId);
    }

    const { data: cartItems, error, count } = await queryBuilder;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // // Transform the data to match the expected format
    // const transformedCartItems = cartItems?.map((item) => ({
    //   ...item,
    //   reviewerName: item.reviewer_name,
    //   reviewerEmail: review.reviewer_email,
    // }));

    return NextResponse.json({
      cartItems: cartItems || [],
      total: count || 0,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_id, rating, comment, date, reviewerName, reviewerEmail } =
      body;

    // Validate required fields
    if (!product_id || !rating || !reviewerName || !reviewerEmail) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: product_id, rating, reviewerName, reviewerEmail",
        },
        { status: 400 },
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    // Check if product exists
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id")
      .eq("id", product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const reviewData = {
      product_id,
      rating,
      comment,
      date: date || new Date().toISOString(),
      reviewer_name: reviewerName,
      reviewer_email: reviewerEmail,
    };

    const { data, error } = await supabase
      .from("reviews")
      .insert([reviewData])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform response
    const transformedReview = {
      ...data[0],
      reviewerName: data[0].reviewer_name,
      reviewerEmail: data[0].reviewer_email,
    };

    return NextResponse.json(transformedReview, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
