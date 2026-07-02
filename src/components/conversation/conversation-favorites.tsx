import { memo } from "react";
import { useConversations } from "@/hooks/use-conversations";
import { ConversationItem } from "./conversation-item";

export const ConversationFavorites = memo(function ConversationFavorites() {
  const { conversations } = useConversations();
  const favorites = conversations.filter(
    (c) => c.isFavorite && c.status !== "deleted",
  );

  if (favorites.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-warning flex items-center gap-2 px-2 text-xs font-medium tracking-wider uppercase">
        <span>⭐</span> Favorites
      </h3>
      <div className="flex flex-col gap-1">
        {favorites.map((conv) => (
          <ConversationItem key={conv.id} conversation={conv} />
        ))}
      </div>
    </div>
  );
});
