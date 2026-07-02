import { memo } from "react";
import { ChatMessage as IChatMessage } from "@/types/ai";
import { ChatMessageActions } from "./chat-message-actions";
import { cn } from "@/lib/cn";
import { TypingIndicator } from "./typing-indicator";

interface ChatMessageProps {
  message: IChatMessage;
}

export const ChatMessage = memo(function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser = message.role === "user";
  const isStreaming = message.status === "streaming";

  return (
    <div
      className={cn(
        "group flex w-full py-4",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "flex max-w-[80%] gap-4",
          isUser ? "flex-row-reverse" : "flex-row",
        )}
      >
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm",
            isUser
              ? "bg-primary text-white"
              : "bg-bg-tertiary text-text-primary",
          )}
        >
          {isUser ? "U" : "AI"}
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-text-secondary text-xs font-medium">
              {isUser ? "You" : "Assistant"}
            </span>
            <span className="text-text-muted text-[10px]">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div
            className={cn(
              "rounded-2xl p-4 text-sm leading-relaxed",
              isUser
                ? "bg-bg-secondary text-text-primary rounded-tr-sm"
                : "text-text-primary bg-transparent",
            )}
          >
            {message.content ? (
              <div className="break-words whitespace-pre-wrap">
                {message.content}
              </div>
            ) : isStreaming ? (
              <TypingIndicator />
            ) : null}
          </div>

          <ChatMessageActions
            messageId={message.id}
            role={message.role}
            content={message.content}
          />
        </div>
      </div>
    </div>
  );
});
