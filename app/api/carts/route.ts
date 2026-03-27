import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
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

// POST /api/reviews - Create a new cart
export async function POST(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("carts")
      .insert({})
      .select()
      .single(); // för att få tillbaka det skapade objektet

    if (error) {
      console.log("Supabase-fel: ", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const cookieStore = await cookies();
    const cartId = data.id.toString();
    console.log("c: " + cartId);
    await cookieStore.set("cartId", cartId);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
