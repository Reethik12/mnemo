import { memo } from "react";
import { useConversationContext } from "@/providers/conversation-provider";

export const ConversationActions = memo(function ConversationActions() {
  const {
    selectedConversationIds,
    deleteSelected,
    archiveSelected,
    clearSelection,
  } = useConversationContext();

  if (selectedConversationIds.length === 0) return null;

  return (
    <div className="bg-bg-primary border-border-subtle animate-in slide-in-from-bottom-10 fade-in fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full border px-6 py-3 shadow-lg duration-300">
      <span className="text-text-primary border-border-subtle border-r pr-4 text-sm font-medium">
        {selectedConversationIds.length} Selected
      </span>

      <button
        onClick={archiveSelected}
        className="text-text-secondary hover:text-text-primary flex items-center gap-2 text-sm transition-colors"
      >
        <span>📦</span> Archive
      </button>

      <button
        onClick={deleteSelected}
        className="text-error hover:text-error/80 flex items-center gap-2 text-sm transition-colors"
      >
        <span>🗑️</span> Delete
      </button>

      <button
        onClick={clearSelection}
        className="text-text-muted hover:text-text-primary ml-2 text-sm transition-colors"
      >
        ✕
      </button>
    </div>
  );
});
