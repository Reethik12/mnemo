"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useCollectionChat } from "@/hooks/useCollectionChat";
import { fadeInUp } from "@/lib/animations";

export function ChatPanel({
  collectionId,
  collectionTitle,
}: {
  collectionId: string;
  collectionTitle: string;
}) {
  const { messages, isTyping, sendMessage } = useCollectionChat(collectionId);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="glass glow-border flex h-[600px] flex-col overflow-hidden rounded-2xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4">
        <div>
          <h3 className="text-text-primary font-semibold">
            Chat with Collection
          </h3>
          <p className="text-text-secondary text-xs">
            AI retrieving specifically from &quot;{collectionTitle}&quot;
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="bg-accent-blue absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
            <span className="bg-accent-blue relative inline-flex h-2 w-2 rounded-full"></span>
          </span>
          <span className="text-accent-blue text-xs font-medium">
            Memory Active
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-text-secondary flex h-full flex-col items-center justify-center gap-4 opacity-50">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <p className="text-sm">Ask a question about this collection...</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === "user" ? "bg-accent-blue text-white" : "text-text-primary bg-white/10"}`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="text-text-secondary max-w-[80%] rounded-2xl bg-white/5 px-4 py-3">
              <span className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  .
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  .
                </span>
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 bg-white/5 p-4"
      >
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Ask anything..."
            className="text-text-primary placeholder-text-secondary focus:border-accent-blue/50 focus:ring-accent-blue/50 w-full rounded-xl border border-white/10 bg-[#0f1115] py-3 pr-12 pl-4 text-sm focus:ring-1 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-accent-blue hover:bg-accent-blue/80 absolute top-2 right-2 rounded-lg p-1.5 text-white transition-colors disabled:opacity-50"
          >
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
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
