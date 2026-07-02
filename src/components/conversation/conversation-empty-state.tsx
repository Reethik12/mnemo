import { EmptyState } from "@/components/shared/empty-state";
import { memo } from "react";
import { useConversationContext } from "@/providers/conversation-provider";

export const ConversationEmptyState = memo(function ConversationEmptyState() {
  const { createConversation } = useConversationContext();

  return (
    <div className="animate-in fade-in flex h-full flex-col items-center justify-center duration-500">
      <EmptyState
        title="No Conversations Found"
        description="Your conversation workspace is empty or no conversations match your current filters."
        actionLabel="New Conversation"
        onAction={() => createConversation("gpt-4o")}
      />
    </div>
  );
});
