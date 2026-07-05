"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMnemoAI } from "@/hooks/useMnemoAI";
import type { MnemoChatMessage } from "@/services/mnemo-ai/types";

export function MnemoAIFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { chat } = useMnemoAI();
  const [messages, setMessages] = useState<MnemoChatMessage[]>([
    {
      id: "init",
      role: "ai",
      content:
        "Hello! I am Mnemo AI. I can search across all modules, summarize projects, explain your Digital Twin, and manage your Memory Spaces.",
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: userMsg,
        timestamp: new Date().toISOString(),
      },
    ]);

    setIsTyping(true);
    const aiResponse = await chat(userMsg);
    setIsTyping(false);

    if (aiResponse) {
      setMessages((prev) => [...prev, aiResponse]);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed right-8 bottom-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl shadow-purple-500/20 transition-transform hover:scale-110 ${isOpen ? "hidden" : "flex"}`}
      >
        <svg
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-bg-secondary/95 fixed right-8 bottom-8 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Mnemo AI</h3>
                  <p className="text-text-secondary text-[10px] tracking-wider uppercase">
                    Global Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary transition-colors hover:text-white"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-accent-purple rounded-tr-sm text-white"
                        : "rounded-tl-sm border border-white/5 bg-white/10 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-white/5 bg-white/10 px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 delay-75" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 delay-150" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 bg-black/20 p-4">
              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Mnemo AI..."
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
        )}
      </AnimatePresence>
    </>
  );
}
