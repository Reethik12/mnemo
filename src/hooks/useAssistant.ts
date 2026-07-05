import { useState, useCallback } from "react";
import type { AssistantMessage } from "@/services/timeline/types";

export function useAssistant(memoryId: string) {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(
    async (query: string) => {
      if (!query.trim()) return;

      const newMsg: AssistantMessage = {
        id: `usr_${Date.now()}`,
        role: "user",
        content: query,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMsg]);
      setIsTyping(true);

      try {
        const res = await fetch("/api/timeline/assistant", {
          method: "POST",
          body: JSON.stringify({ memoryId, query }),
        });
        if (res.ok) {
          const aiMsg = await res.json();
          setMessages((prev) => [...prev, aiMsg]);
        }
      } catch (err) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            role: "ai",
            content: "I encountered an error analyzing this evolution.",
            timestamp: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [memoryId],
  );

  return { messages, isTyping, sendMessage, setMessages };
}
