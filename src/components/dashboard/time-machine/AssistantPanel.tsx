import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAssistant } from "@/hooks/useAssistant";

export function AssistantPanel({ memoryId }: { memoryId: string }) {
  const { messages, isTyping, sendMessage } = useAssistant(memoryId);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12141a]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 p-4">
        <div className="bg-accent-blue/20 border-accent-blue/30 flex h-8 w-8 items-center justify-center rounded-full border">
          <svg
            className="text-accent-blue h-4 w-4"
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
          <h4 className="text-sm font-medium text-white">
            Evolution Assistant
          </h4>
          <p className="text-text-secondary text-[10px]">
            AI analyzing graph changes
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && !isTyping && (
          <div className="text-text-secondary mt-10 text-center text-sm">
            Ask me how this memory has evolved over time!
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {[
                "Explain evolution",
                "What new concepts?",
                "Why did confidence improve?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs transition-colors hover:bg-white/10"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === "user" ? "bg-accent-blue rounded-br-none text-white" : "text-text-primary rounded-bl-none border border-white/5 bg-white/10"}`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-1 rounded-2xl rounded-bl-none border border-white/10 bg-white/5 px-4 py-3">
                <div className="bg-text-secondary h-1.5 w-1.5 animate-bounce rounded-full" />
                <div
                  className="bg-text-secondary h-1.5 w-1.5 animate-bounce rounded-full"
                  style={{ animationDelay: "0.15s" }}
                />
                <div
                  className="bg-text-secondary h-1.5 w-1.5 animate-bounce rounded-full"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-white/10 bg-white/5 p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about changes..."
          className="focus:border-accent-blue/50 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="bg-accent-blue flex items-center justify-center rounded-xl px-4 text-white transition-opacity disabled:opacity-50"
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
