import { memo, useEffect, useRef } from "react";
import { useChat } from "@/hooks/use-chat";
import { ChatMessage } from "./chat-message";
import { ConversationEmptyState } from "./conversation-empty-state";

export const ChatWindow = memo(function ChatWindow() {
  const { messages } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        <ConversationEmptyState />
      </div>
    );
  }

  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
});
