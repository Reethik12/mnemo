import { memo, useState } from "react";
import { ConversationSummary } from "@/types/conversation";
import { useConversations } from "@/hooks/use-conversations";
import { useConversationSelection } from "@/hooks/use-conversation-selection";
import { ConversationContextMenu } from "./conversation-context-menu";

interface ConversationItemProps {
  conversation: ConversationSummary;
}

export const ConversationItem = memo(function ConversationItem({
  conversation,
}: ConversationItemProps) {
  const { activeConversation, loadConversation } = useConversations();
  const { selectedIds, toggleSelection, isMultiSelect } =
    useConversationSelection();
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const isActive = activeConversation?.id === conversation.id;
  const isSelected = selectedIds.includes(conversation.id);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || isMultiSelect) {
      toggleSelection(conversation.id);
    } else {
      loadConversation(conversation.id);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        className={`group flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${isActive ? "bg-primary/10 border-primary/20" : "hover:bg-bg-secondary"} ${isSelected ? "bg-primary/20 border-primary" : "border border-transparent"} `}
      >
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            {conversation.isPinned && (
              <span className="text-primary text-xs" title="Pinned">
                📌
              </span>
            )}
            {conversation.isFavorite && (
              <span className="text-warning text-xs" title="Favorite">
                ⭐
              </span>
            )}
            <h4
              className={`truncate text-sm font-medium ${isActive || isSelected ? "text-primary" : "text-text-primary group-hover:text-primary"}`}
            >
              {conversation.title}
            </h4>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted mr-2 truncate text-xs">
              Updated {new Date(conversation.updatedAt).toLocaleDateString()}
            </span>
            <span className="bg-bg-tertiary text-text-secondary rounded px-1.5 py-0.5 text-[10px]">
              {conversation.messageCount || 0} msgs
            </span>
          </div>
        </div>
      </div>

      {showMenu && (
        <ConversationContextMenu
          conversation={conversation}
          position={menuPosition}
          onClose={() => setShowMenu(false)}
        />
      )}
    </>
  );
});
