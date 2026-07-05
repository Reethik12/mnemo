"use client";

import { useEffect, useState, useRef, use, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "@/services/messages/mock-data";

export default function ChatPage(props: {
  params: Promise<{ conversationId: string }>;
}) {
  const params = use(props.params);
  const { conversationId } = params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { error } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`/api/messages/${conversationId}`);
      if (res.ok) {
        setMessages(await res.json());
        scrollToBottom();
      }
    } catch {
      error("Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, error, scrollToBottom]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchMessages();
    }, 0);
    const interval = setInterval(fetchMessages, 5000); // Polling for new messages
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const textToSend = inputText;
    setInputText("");

    // Optimistic UI update
    const tempMsg: Message = {
      id: `temp-${Date.now()}`,
      conversationId,
      senderId: "user-1",
      senderName: "Current User",
      text: textToSend,
      timestamp: new Date().toISOString(),
      status: "sent",
    };
    setMessages((prev) => [...prev, tempMsg]);

    try {
      const res = await fetch(`/api/messages/${conversationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSend }),
      });
      if (res.ok) {
        const savedMsg = await res.json();
        setMessages((prev) =>
          prev.map((m) => (m.id === tempMsg.id ? savedMsg : m)),
        );

        // Mock partner reply
        setIsTyping(true);
        setTimeout(async () => {
          await fetch(`/api/messages/${conversationId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: "Got it, looking into this now." }),
          });
          setIsTyping(false);
          await fetchMessages();
        }, 3000);
      }
    } catch {
      error("Failed to send message");
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="relative flex h-[calc(100vh-12rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div>
          <h2 className="text-lg font-bold text-white capitalize">
            {conversationId.replace("-", " ")}
          </h2>
          <p className="text-text-secondary flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-green-400"></span>
            Shared Memory • Partner Online
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-text-secondary p-2 transition-colors hover:text-white">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="scrollbar-hide flex-1 space-y-4 overflow-y-auto p-4">
        {isLoading ? (
          <div className="text-text-secondary py-10 text-center">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="text-text-secondary py-10 text-center">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === "user-1" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.senderId === "user-1"
                    ? "bg-accent-purple rounded-tr-none text-white"
                    : "rounded-tl-none bg-white/10 text-white"
                }`}
              >
                {msg.senderId !== "user-1" && (
                  <p className="mb-1 text-xs text-white/50">{msg.senderName}</p>
                )}
                <p>{msg.text}</p>
                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="text-[10px] text-white/60">
                    {new Date(msg.timestamp).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {msg.senderId === "user-1" && (
                    <span className="text-[10px] text-white/80 capitalize">
                      ✓✓
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-none bg-white/10 px-4 py-3 text-sm text-white">
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white/50"></span>
              <span
                className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white/50"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white/50"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="relative flex items-center gap-3">
          <button className="text-text-secondary rounded-xl bg-white/5 p-2 transition-colors hover:bg-white/10 hover:text-white">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-white transition-colors outline-none focus:bg-white/15"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-accent-purple hover:bg-accent-purple-hover rounded-xl p-3 text-white shadow-lg transition-colors disabled:opacity-50"
          >
            <svg
              className="h-5 w-5 translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
