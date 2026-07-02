import { memo, useState } from "react";
import { ConversationFolder as IConversationFolder } from "@/types/conversation";
import { useConversationFilter } from "@/hooks/use-conversation-filter";

interface ConversationFolderProps {
  folder: IConversationFolder;
}

export const ConversationFolder = memo(function ConversationFolder({
  folder,
}: ConversationFolderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { filter, setFilter } = useConversationFilter();
  const isSelected = filter.folderId === folder.id;

  return (
    <div className="flex flex-col">
      <div
        className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 transition-colors ${isSelected ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"}`}
        onClick={() => {
          if (isSelected) {
            setFilter({ ...filter, folderId: undefined });
          } else {
            setFilter({
              ...filter,
              folderId: folder.id,
              status: "active",
              isPinned: undefined,
              isFavorite: undefined,
            });
          }
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="hover:bg-bg-tertiary rounded-sm p-0.5 transition-colors"
        >
          <span
            className="inline-block text-[10px] transition-transform duration-200"
            style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▶
          </span>
        </button>
        <div
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: folder.color || "var(--color-primary)" }}
        />
        <span className="text-sm font-medium">{folder.name}</span>
      </div>

      {isExpanded && (
        <div className="border-border-subtle mt-1 ml-6 flex flex-col gap-1 border-l pl-2">
          {/* Mock children */}
          <div className="text-text-muted px-2 py-1 text-xs">No subfolders</div>
        </div>
      )}
    </div>
  );
});
