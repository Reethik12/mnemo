import { memo } from "react";
import { useConversation } from "@/hooks/use-conversation";

export const ConversationHeader = memo(function ConversationHeader() {
  const {
    activeConversation,
    favoriteConversation,
    pinConversation,
    archiveConversation,
    deleteConversation,
    clearConversation,
  } = useConversation();

  if (!activeConversation) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <h2 className="text-text-primary text-sm font-semibold">
          {activeConversation.title}
        </h2>
        <span className="text-text-muted text-[10px]">
          Updated {new Date(activeConversation.updatedAt).toLocaleTimeString()}
        </span>
      </div>

      <div className="border-border-subtle ml-2 flex items-center gap-1 border-l pl-4">
        <button
          onClick={() =>
            favoriteConversation(
              activeConversation.id,
              !activeConversation.isFavorite,
            )
          }
          className={`rounded p-1.5 transition-colors ${activeConversation.isFavorite ? "text-warning" : "text-text-muted hover:bg-bg-tertiary"}`}
          title={activeConversation.isFavorite ? "Unfavorite" : "Favorite"}
        >
          <span className="text-sm">⭐</span>
        </button>

        <button
          onClick={() =>
            pinConversation(activeConversation.id, !activeConversation.isPinned)
          }
          className={`rounded p-1.5 transition-colors ${activeConversation.isPinned ? "text-primary" : "text-text-muted hover:bg-bg-tertiary"}`}
          title={activeConversation.isPinned ? "Unpin" : "Pin"}
        >
          <span className="text-sm">📌</span>
        </button>

        <button
          onClick={() => archiveConversation(activeConversation.id)}
          className="text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded p-1.5 transition-colors"
          title="Archive"
        >
          <span className="text-sm">📦</span>
        </button>

        <button
          onClick={() => {
            deleteConversation(activeConversation.id);
            clearConversation();
          }}
          className="text-text-muted hover:text-error hover:bg-error/10 rounded p-1.5 transition-colors"
          title="Delete"
        >
          <span className="text-sm">🗑️</span>
        </button>
      </div>
    </div>
  );
});
