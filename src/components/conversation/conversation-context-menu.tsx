import { memo, useEffect, useRef } from "react";
import { ConversationSummary } from "@/types/conversation";
import { useConversations } from "@/hooks/use-conversations";

interface ConversationContextMenuProps {
  conversation: ConversationSummary;
  position: { x: number; y: number };
  onClose: () => void;
}

export const ConversationContextMenu = memo(function ConversationContextMenu({
  conversation,
  position,
  onClose,
}: ConversationContextMenuProps) {
  const {
    duplicateConversation,
    deleteConversation,
    archiveConversation,
    restoreConversation,
    favoriteConversation,
    pinConversation,
  } = useConversations();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  const isArchived = conversation.status === "archived";

  return (
    <div
      ref={menuRef}
      className="bg-bg-primary border-border-subtle animate-in fade-in fixed z-50 w-48 rounded-md border py-1 shadow-xl duration-200"
      style={{ top: position.y, left: position.x }}
    >
      {!isArchived && (
        <>
          <button
            onClick={() =>
              handleAction(() =>
                pinConversation(conversation.id, !conversation.isPinned),
              )
            }
            className="text-text-primary hover:bg-bg-secondary w-full px-4 py-2 text-left text-sm transition-colors"
          >
            {conversation.isPinned ? "Unpin" : "Pin"}
          </button>
          <button
            onClick={() =>
              handleAction(() =>
                favoriteConversation(conversation.id, !conversation.isFavorite),
              )
            }
            className="text-text-primary hover:bg-bg-secondary w-full px-4 py-2 text-left text-sm transition-colors"
          >
            {conversation.isFavorite ? "Unfavorite" : "Favorite"}
          </button>
          <button
            onClick={() =>
              handleAction(() => duplicateConversation(conversation.id))
            }
            className="text-text-primary hover:bg-bg-secondary w-full px-4 py-2 text-left text-sm transition-colors"
          >
            Duplicate
          </button>
          <button
            onClick={() =>
              handleAction(() => archiveConversation(conversation.id))
            }
            className="text-text-primary hover:bg-bg-secondary w-full px-4 py-2 text-left text-sm transition-colors"
          >
            Archive
          </button>
        </>
      )}

      {isArchived && (
        <button
          onClick={() =>
            handleAction(() => restoreConversation(conversation.id))
          }
          className="text-text-primary hover:bg-bg-secondary w-full px-4 py-2 text-left text-sm transition-colors"
        >
          Restore
        </button>
      )}

      <div className="bg-border-subtle my-1 h-px" />

      <button
        onClick={() => handleAction(() => deleteConversation(conversation.id))}
        className="text-error hover:bg-error/10 w-full px-4 py-2 text-left text-sm transition-colors"
      >
        Delete
      </button>
    </div>
  );
});
