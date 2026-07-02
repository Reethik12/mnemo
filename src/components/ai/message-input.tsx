import { memo, useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";

export const MessageInput = memo(function MessageInput() {
  const [content, setContent] = useState("");
  const { send, isGenerating, cancelGeneration } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [content]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isGenerating) {
      cancelGeneration();
      return;
    }
    if (!content.trim()) return;

    send(content);
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bg-primary border-border-subtle relative mx-auto flex w-full max-w-4xl items-end rounded-t-3xl border p-4 shadow-lg"
    >
      <button
        type="button"
        className="text-text-muted hover:text-text-primary shrink-0 p-3 transition-colors"
        title="Attach file (mock)"
      >
        📎
      </button>

      <div className="relative mx-2 flex-1">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask the AI core anything..."
          className="text-text-primary placeholder:text-text-muted max-h-[200px] w-full resize-none overflow-hidden bg-transparent py-3 text-sm focus:outline-none"
          rows={1}
        />
      </div>

      <button
        type="submit"
        className="bg-primary hover:bg-primary-hover flex shrink-0 items-center justify-center rounded-full p-3 text-white transition-colors disabled:opacity-50"
        disabled={!isGenerating && !content.trim()}
      >
        {isGenerating ? "⏹️" : "↑"}
      </button>

      {content.length > 0 && (
        <div className="text-text-muted absolute -top-6 right-4 text-[10px]">
          {content.length} / 4000
        </div>
      )}
    </form>
  );
});
