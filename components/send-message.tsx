"use client";
export default function SendMessage() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submit klickat");

    // hårdkodade värden
    const myData = {
      content: "blabla",
    };

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: myData }),
    });

    if (response.ok) {
      console.log("meddelandet skickat");
    } else {
      console.log("errorrr");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">skicka</button>
    </form>
  );
}
