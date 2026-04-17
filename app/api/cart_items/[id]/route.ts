import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabaseClient";

// POST /api/carts - Create a new cart item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cart_id, product_id } = body;

    // Validate required fields
    if (!product_id || !cart_id) {
      return NextResponse.json(
        {
          error: "Missing required fields: product_id, cart_id",
        },
        { status: 400 },
      );
    }

    // Check if cart item exists
    //TODO: check if cartitem (product_id) on (cart_id) exists before click and redirect to update (quantity) if exists
    // const { data: cartItem, error: cartItemError } = await supabase
    //   .from("cart_items")
    //   .select("product_id")
    //   .eq("product_id", product_id)
    //   .single();

    const cartItemData = {
      cart_id,
      product_id,
      quantity: 1,
    };

    const { data, error } = await supabase
      .from("cart_items")
      .insert([cartItemData])
      .select()
      .single(); // för att få tillbaka det skapade objektet

    if (error) {
      console.log("Supabase-fel: ", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return await NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
