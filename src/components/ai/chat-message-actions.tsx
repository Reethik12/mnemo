import { memo } from "react";
import { MessageRole } from "@/types/ai";
import { useChat } from "@/hooks/use-chat";

interface ChatMessageActionsProps {
  messageId: string;
  role: MessageRole;
  content: string;
}

export const ChatMessageActions = memo(function ChatMessageActions({
  messageId,
  role,
  content,
}: ChatMessageActionsProps) {
  const { retry, deleteMessage, isGenerating } = useChat();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
      <button
        onClick={handleCopy}
        className="text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded p-1 transition-colors"
        title="Copy"
      >
        <span className="text-xs">📋</span>
      </button>

      {role === "assistant" && !isGenerating && (
        <button
          onClick={() => retry(messageId)}
          className="text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded p-1 transition-colors"
          title="Regenerate"
        >
          <span className="text-xs">🔄</span>
        </button>
      )}

      <button
        onClick={() => deleteMessage(messageId)}
        className="text-text-muted hover:text-error hover:bg-error/10 rounded p-1 transition-colors"
        title="Delete"
      >
        <span className="text-xs">🗑️</span>
      </button>
    </div>
  );
});
