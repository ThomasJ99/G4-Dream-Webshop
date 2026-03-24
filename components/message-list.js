import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from("messages").select();
      setMessages(data);
    };

    fetchMessages();

    const subscription = supabase
      .from("messages")
      .on("INSERT", (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <ul>
      {messages.map((msg) => (
        <li key={msg.id}>{msg.content}</li>
      ))}
    </ul>
  );
};

export default MessageList;
