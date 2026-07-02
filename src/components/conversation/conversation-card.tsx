import { memo, useState } from "react";
import { ConversationSummary } from "@/types/conversation";
import { useConversations } from "@/hooks/use-conversations";
import { useConversationSelection } from "@/hooks/use-conversation-selection";
import { ConversationContextMenu } from "./conversation-context-menu";

interface ConversationCardProps {
  conversation: ConversationSummary;
}

export const ConversationCard = memo(function ConversationCard({
  conversation,
}: ConversationCardProps) {
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
        className={`group flex cursor-pointer flex-col gap-3 rounded-xl p-4 transition-all duration-200 ${isActive ? "bg-primary/10 border-primary/20 shadow-primary/5 scale-[1.02] shadow-md" : "bg-bg-secondary hover:bg-bg-tertiary border-border-subtle"} ${isSelected ? "bg-primary/20 border-primary shadow-sm" : "border"} `}
      >
        <div className="flex items-start justify-between gap-2">
          <h4
            className={`truncate text-sm font-semibold ${isActive || isSelected ? "text-primary" : "text-text-primary group-hover:text-primary"}`}
          >
            {conversation.title}
          </h4>
          <div className="flex shrink-0 items-center gap-1">
            {conversation.isPinned && (
              <span className="text-primary text-[10px]" title="Pinned">
                📌
              </span>
            )}
            {conversation.isFavorite && (
              <span className="text-warning text-[10px]" title="Favorite">
                ⭐
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-text-muted text-xs">
            {new Date(conversation.updatedAt).toLocaleDateString()}
          </span>
          <span className="bg-bg-primary border-border-subtle text-text-secondary rounded-full border px-2 py-0.5 text-[10px] font-medium">
            {conversation.messageCount || 0} msgs
          </span>
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
