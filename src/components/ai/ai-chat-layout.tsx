import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { AIProviderSelector } from "./ai-provider-selector";
import { AIModelSelector } from "./ai-model-selector";
import { ChatWindow } from "./chat-window";
import { MessageInput } from "./message-input";
import { ConversationHeader } from "./conversation-header";
import { AIStatus } from "./ai-status";
import { TokenCounter } from "./token-counter";
import { useConversation } from "@/hooks/use-conversation";

export const AIChatLayout = memo(function AIChatLayout() {
  const {
    conversationList,
    activeConversation,
    loadConversation,
    createConversation,
  } = useConversation();

  return (
    <div className="animate-in fade-in flex h-full w-full gap-6 duration-500">
      {/* Sidebar */}
      <div className="flex w-64 shrink-0 flex-col gap-6">
        <GlassContainer className="flex flex-col gap-4 p-4">
          <AIProviderSelector />
          <AIModelSelector />

          <button
            onClick={createConversation}
            className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 mt-2 w-full rounded-md border py-2 text-sm font-medium transition-colors"
          >
            + New Chat
          </button>
        </GlassContainer>

        <GlassContainer className="flex flex-1 flex-col gap-2 overflow-hidden p-4">
          <h3 className="text-text-secondary mb-2 text-xs font-medium tracking-wider uppercase">
            Conversations
          </h3>
          <div className="custom-scrollbar flex flex-col gap-1 overflow-y-auto">
            {conversationList.map((conv) => (
              <button
                key={conv.id}
                onClick={() => loadConversation(conv.id)}
                className={`truncate rounded-md px-3 py-2 text-left text-sm transition-colors ${activeConversation?.id === conv.id ? "bg-bg-tertiary text-text-primary" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"}`}
              >
                {conv.isPinned ? "📌 " : ""}
                {conv.title}
              </button>
            ))}
          </div>
        </GlassContainer>
      </div>

      {/* Main Chat Area */}
      <div className="relative flex h-full flex-1 flex-col gap-4 overflow-hidden">
        <GlassContainer className="z-10 flex h-16 shrink-0 items-center justify-between p-4">
          <ConversationHeader />
          <AIStatus />
        </GlassContainer>

        <GlassContainer className="relative z-0 flex flex-1 flex-col overflow-hidden p-0">
          <ChatWindow />
          <div className="from-bg-primary via-bg-primary/95 mt-auto shrink-0 bg-gradient-to-t to-transparent p-4 pt-10">
            <MessageInput />
          </div>
        </GlassContainer>

        <div className="flex h-8 shrink-0 items-center justify-between px-4">
          <TokenCounter />
        </div>
      </div>
    </div>
  );
});
