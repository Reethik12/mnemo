"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useDigitalTwin } from "@/hooks/useDigitalTwin";

export function TwinChat({ isTeam = false }: { isTeam?: boolean }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "twin"; content: string; sources?: string[] }[]
  >([
    {
      role: "twin",
      content: isTeam
        ? "Hello! I am the Digital Twin for this user. I can answer questions about their knowledge and decisions based on the Memory Spaces they've shared with you."
        : "Hello! I am your Digital Twin. I can recall anything from your Memory Fabric, explain your strongest skills, or simulate how you might make decisions.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { chatWithTwin } = useDigitalTwin();

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    const response = await chatWithTwin(userMessage, isTeam);

    setIsTyping(false);
    if (response) {
      setMessages((prev) => [
        ...prev,
        { role: "twin", content: response.message, sources: response.sources },
      ]);
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="glass glow-border flex h-[600px] flex-col overflow-hidden rounded-2xl bg-white/5"
    >
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-lg ${
                msg.role === "user"
                  ? "bg-white/20 text-white"
                  : "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
              }`}
            >
              {msg.role === "user" ? "U" : "T"}
            </div>
            <div
              className={`flex max-w-[80%] flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-accent-purple rounded-tr-sm text-white"
                    : "rounded-tl-sm border border-white/5 bg-white/10 text-white"
                }`}
              >
                {msg.content}
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {msg.sources.map((s) => (
                    <span
                      key={s}
                      className="text-text-secondary rounded-full border border-white/10 bg-black/40 px-2 py-1 text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-row gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg">
              T
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 delay-75" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 delay-150" />
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-white/10 bg-black/20 p-4">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isTeam
                ? "Ask the twin about their knowledge..."
                : "Ask your twin ('What would I do?', 'Summarize my skills')..."
            }
            className="focus:border-accent-purple/50 w-full rounded-xl border border-white/10 bg-white/5 py-3 pr-12 pl-4 text-sm text-white transition-colors focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-accent-purple absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-2 text-white transition-opacity disabled:opacity-50"
          >
            <svg
              className="h-4 w-4"
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
        </form>
      </div>
    </motion.div>
  );
}
