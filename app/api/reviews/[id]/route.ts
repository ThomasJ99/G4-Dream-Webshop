import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabaseClient";

// GET /api/reviews/[id] - Get a single review
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Review not found" },
          { status: 404 },
        );
      }
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the data to match the expected format
    const transformedReview = {
      ...data,
      reviewerName: data.reviewer_name,
      reviewerEmail: data.reviewer_email,
    };

    return NextResponse.json(transformedReview);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/reviews/[id] - Update a review
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { rating, comment, date, reviewerName, reviewerEmail } = body;

    const updateData: any = {};
    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return NextResponse.json(
          { error: "Rating must be between 1 and 5" },
          { status: 400 },
        );
      }
      updateData.rating = rating;
    }
    if (comment !== undefined) updateData.comment = comment;
    if (date !== undefined) updateData.date = date;
    if (reviewerName !== undefined) updateData.reviewer_name = reviewerName;
    if (reviewerEmail !== undefined) updateData.reviewer_email = reviewerEmail;

    const { data, error } = await supabase
      .from("reviews")
      .update(updateData)
      .eq("id", params.id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Transform response
    const transformedReview = {
      ...data[0],
      reviewerName: data[0].reviewer_name,
      reviewerEmail: data[0].reviewer_email,
    };

    return NextResponse.json(transformedReview);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/reviews/[id] - Delete a review
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
