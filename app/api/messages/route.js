import { NextResponse } from "next/server"; //https://nextjs.org/docs/app/api-reference/functions/next-response
import { supabase } from "../../../supabaseClient";

export async function POST(req) {
  console.log("gick in i handlern");

  try {
    const body = await req.json();
    console.log(body);
    const { content } = body;

    console.log("Innehållet att spara: ", content);

    const { data, error } = await supabase
       .from("messages")
       .insert([{ content: content.content }])
       .select(); // för att få tillbaka det skapade objektet

       if (error) {
        console.log("Supabase-fel: ", error.message);
        return NextResponse.json({error: error.message}, {status: 500});
       }
       return NextResponse.json(data, {status: 200});
  } catch (err) {
    console.error("JSON-fel: ", err.message);
    return NextResponse.json({error: "Kunde inte läsa JSON-data"}, {status: 400});
  }
}
