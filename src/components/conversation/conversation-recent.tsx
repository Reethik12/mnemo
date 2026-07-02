import { memo } from "react";
import { useConversationHistory } from "@/hooks/use-conversation-history";
import { ConversationItem } from "./conversation-item";

export const ConversationRecent = memo(function ConversationRecent() {
  const { recentHistory } = useConversationHistory();

  if (recentHistory.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-text-secondary px-2 text-xs font-medium tracking-wider uppercase">
        Recent Activity
      </h3>
      <div className="flex flex-col gap-1">
        {recentHistory.map((conv) => (
          <ConversationItem key={conv.id} conversation={conv} />
        ))}
      </div>
    </div>
  );
});
