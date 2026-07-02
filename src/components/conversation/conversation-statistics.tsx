import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useConversationContext } from "@/providers/conversation-provider";
import { SectionHeader } from "@/components/shared/section-header";

export const ConversationStatistics = memo(function ConversationStatistics() {
  const { statistics } = useConversationContext();

  if (!statistics) return null;

  const stats = [
    { label: "Total", value: statistics.totalConversations, icon: "💬" },
    { label: "Recent", value: statistics.recentConversations, icon: "🕒" },
    { label: "Favorites", value: statistics.favoriteConversations, icon: "⭐" },
    { label: "Pinned", value: statistics.pinnedConversations, icon: "📌" },
    { label: "Archived", value: statistics.archivedConversations, icon: "📦" },
    { label: "Avg Msg", value: statistics.averageMessages, icon: "📊" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Workspace Overview" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, idx) => (
          <GlassContainer
            key={idx}
            className="hover:bg-bg-secondary flex flex-col items-center justify-center p-4 text-center transition-colors"
          >
            <span className="mb-2 text-2xl">{stat.icon}</span>
            <span className="text-text-primary mb-1 text-xl font-bold">
              {stat.value}
            </span>
            <span className="text-text-muted text-[10px] tracking-wider uppercase">
              {stat.label}
            </span>
          </GlassContainer>
        ))}
      </div>
    </div>
  );
});
