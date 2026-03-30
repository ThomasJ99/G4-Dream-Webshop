import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabaseClient";

export async function GET(request: NextRequest) {
  try {
    const { data: favorites, error } = await supabase
      .from("favorites")
      .select("*")
      .order("created_at");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(favorites || []);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_id } = body;

    if (!product_id) {
      return NextResponse.json(
        { error: "Missing required field: product_id" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("favorites")
      .insert([{ product_id }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_id } = body;

    if (!product_id) {
      return NextResponse.json(
        { error: "Missing required field: product_id" },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("product_id", product_id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
