import { memo } from "react";
import { useConversationFilter } from "@/hooks/use-conversation-filter";
import { useConversationSearch } from "@/hooks/use-conversation-search";
import { ConversationCard } from "./conversation-card";
import { ConversationItem } from "./conversation-item";

interface ConversationListProps {
  viewMode?: "list" | "grid";
}

export const ConversationList = memo(function ConversationList({
  viewMode = "grid",
}: ConversationListProps) {
  const { filteredConversations } = useConversationFilter();
  const { results, isSearching } = useConversationSearch();

  const displayList = isSearching ? results : filteredConversations;

  if (displayList.length === 0) {
    return (
      <div className="text-text-muted flex flex-1 items-center justify-center text-sm">
        No conversations found.
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="custom-scrollbar flex flex-col gap-1 overflow-y-auto p-1">
        {displayList.map((conv) => (
          <ConversationItem key={conv.id} conversation={conv} />
        ))}
      </div>
    );
  }

  return (
    <div className="custom-scrollbar grid grid-cols-1 gap-4 overflow-y-auto p-1 md:grid-cols-2 lg:grid-cols-3">
      {displayList.map((conv) => (
        <ConversationCard key={conv.id} conversation={conv} />
      ))}
    </div>
  );
});
