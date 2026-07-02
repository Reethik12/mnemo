import { memo } from "react";
import { ConversationSearch } from "./conversation-search";
import { ConversationFilter } from "./conversation-filter";
import { GlassContainer } from "@/components/shared/glass-container";
import { SectionHeader } from "@/components/shared/section-header";

export const ConversationHeader = memo(function ConversationHeader() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Conversation Workspace" />
      <GlassContainer className="flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
        <ConversationSearch />
        <ConversationFilter />
      </GlassContainer>
    </div>
  );
});
