"use client";

interface StatsProps {
  stats: {
    memoriesCount: number;
    conversationsCount: number;
    promptsCount: number;
    membersCount: number;
  };
}

export function WorkspaceStatistics({ stats }: StatsProps) {
  const cards = [
    {
      label: "Memories",
      value: stats.memoriesCount,
      color: "text-accent-purple",
    },
    {
      label: "Conversations",
      value: stats.conversationsCount,
      color: "text-blue-400",
    },
    { label: "Prompts", value: stats.promptsCount, color: "text-emerald-400" },
    {
      label: "Team Members",
      value: stats.membersCount,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-surface/20 rounded-xl border border-white/5 p-4 backdrop-blur-md"
        >
          <p className="text-text-secondary text-xs">{c.label}</p>
          <p className={`mt-2 text-2xl font-bold ${c.color}`}>{c.value}</p>
        </div>
      ))}
    </div>
  );
}
