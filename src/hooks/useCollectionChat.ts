import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export function useCollectionChat(collectionId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { error } = useToast();

  const sendMessage = async (query: string) => {
    if (!query.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: query } as ChatMessage,
    ];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch("/api/exchange/chat", {
        method: "POST",
        body: JSON.stringify({ collectionId, query }),
      });
      const data = await res.json();

      if (res.ok && data.text) {
        setMessages([...newMessages, { role: "ai", content: data.text }]);
      } else {
        setMessages([
          ...newMessages,
          { role: "ai", content: "I'm sorry, I couldn't process that query." },
        ]);
        error("Chat failed");
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "ai", content: "Network error occurred." },
      ]);
      error("Network error");
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, isTyping, sendMessage };
}
