import { memo } from "react";

export const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div className="bg-bg-secondary text-text-muted border-border-subtle flex w-fit items-center gap-1.5 rounded-2xl border p-3">
      <div
        className="bg-text-muted h-1.5 w-1.5 animate-bounce rounded-full"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="bg-text-muted h-1.5 w-1.5 animate-bounce rounded-full"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="bg-text-muted h-1.5 w-1.5 animate-bounce rounded-full"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
});
