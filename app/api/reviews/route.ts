import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabaseClient";
import { Review } from "@/lib/types";

// GET /api/reviews - Get all reviews with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const limit = searchParams.get("_limit");
    const page = searchParams.get("_page");

    let queryBuilder = supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    // Filter by product ID if provided
    if (productId) {
      queryBuilder = queryBuilder.eq("product_id", productId);
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

    const { data: reviews, error, count } = await queryBuilder;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the data to match the expected format
    const transformedReviews = reviews?.map((review) => ({
      ...review,
      reviewerName: review.reviewer_name,
      reviewerEmail: review.reviewer_email,
    }));

    return NextResponse.json({
      reviews: transformedReviews || [],
      total: count || 0,
      limit: limit ? parseInt(limit) : undefined,
      page: page ? parseInt(page) : undefined,
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
