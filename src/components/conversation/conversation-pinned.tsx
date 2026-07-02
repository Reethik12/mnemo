import { memo } from "react";
import { useConversations } from "@/hooks/use-conversations";
import { ConversationItem } from "./conversation-item";

export const ConversationPinned = memo(function ConversationPinned() {
  const { conversations } = useConversations();
  const pinned = conversations.filter(
    (c) => c.isPinned && c.status !== "deleted",
  );

  if (pinned.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-primary flex items-center gap-2 px-2 text-xs font-medium tracking-wider uppercase">
        <span>📌</span> Pinned
      </h3>
      <div className="flex flex-col gap-1">
        {pinned.map((conv) => (
          <ConversationItem key={conv.id} conversation={conv} />
        ))}
      </div>
    </div>
  );
});
