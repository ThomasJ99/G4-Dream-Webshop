import { supabase } from "../../supabaseClient";

export default async function POST(req, res) {
  console.log("gick in i handlern");

  if (req.method === "POST") {
    console.log("Kom in i POST");
    const { content } = req.body;
    const { data, error } = await supabase
      .from("messages")
      .insert([{ content }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === "GET") {
  } else if (req.method === "DELETE") {
    //
  }
  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
