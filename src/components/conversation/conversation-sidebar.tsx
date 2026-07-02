import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useConversations } from "@/hooks/use-conversations";
import { ConversationPinned } from "./conversation-pinned";
import { ConversationFavorites } from "./conversation-favorites";
import { ConversationRecent } from "./conversation-recent";
import { ConversationFolder } from "./conversation-folder";

export const ConversationSidebar = memo(function ConversationSidebar() {
  const { folders, createConversation } = useConversations();

  return (
    <div className="flex h-full w-64 shrink-0 flex-col gap-6">
      <GlassContainer className="flex flex-col gap-4 p-4">
        <button
          onClick={() => createConversation("gpt-4o")}
          className="bg-primary hover:bg-primary-hover w-full rounded-md py-2 text-sm font-medium text-white shadow-sm transition-colors"
        >
          New Conversation
        </button>
      </GlassContainer>

      <GlassContainer className="custom-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto p-4">
        <ConversationPinned />
        <ConversationFavorites />
        <ConversationRecent />

        <div className="flex flex-col gap-2">
          <h3 className="text-text-secondary mt-4 px-2 text-xs font-medium tracking-wider uppercase">
            Folders
          </h3>
          <div className="flex flex-col gap-1">
            {folders.map((folder) => (
              <ConversationFolder key={folder.id} folder={folder} />
            ))}
          </div>
        </div>
      </GlassContainer>
    </div>
  );
});
