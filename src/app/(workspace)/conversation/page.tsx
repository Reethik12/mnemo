"use client";

import { useConversations } from "@/hooks/use-conversations";
import { ConversationLoading } from "@/components/conversation/conversation-loading";
import { ConversationSidebar } from "@/components/conversation/conversation-sidebar";
import { ConversationHeader } from "@/components/conversation/conversation-header";
import { ConversationList } from "@/components/conversation/conversation-list";
import { ConversationStatistics } from "@/components/conversation/conversation-statistics";
import { ConversationActions } from "@/components/conversation/conversation-actions";
import { useConversationShortcuts } from "@/hooks/use-conversation-shortcuts";

export default function ConversationPage() {
  const { loading, error } = useConversations();

  useConversationShortcuts();

  if (loading) {
    return <ConversationLoading />;
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex max-w-md flex-col items-center p-8 text-center">
          <span className="mb-4 text-4xl">⚠️</span>
          <h2 className="text-error mb-2 text-lg font-semibold">
            Failed to load workspace
          </h2>
          <p className="text-text-secondary text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in flex h-full w-full gap-6 overflow-hidden p-6 duration-500">
      <ConversationSidebar />
      <div className="relative flex flex-1 flex-col gap-6 overflow-hidden">
        <ConversationHeader />
        <ConversationStatistics />
        <div className="relative flex-1 overflow-hidden pt-2">
          <ConversationList viewMode="grid" />
        </div>
        <ConversationActions />
      </div>
    </div>
  );
}
