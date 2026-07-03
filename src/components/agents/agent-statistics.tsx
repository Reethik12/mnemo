"use client";

import { useAgentStatistics } from "@/hooks/use-agent";

interface AgentStatisticsProps {
  agentId: string;
}

export function AgentStatistics({ agentId }: AgentStatisticsProps) {
  const { stats } = useAgentStatistics(agentId);

  const data = [
    { label: "Executions Count", value: stats.runsCount, color: "text-white" },
    {
      label: "Tokens Consumed",
      value: stats.tokensUsed.toLocaleString(),
      color: "text-accent-purple",
    },
    {
      label: "Success Ratio",
      value: `${stats.successRate}%`,
      color: "text-emerald-400",
    },
    {
      label: "Avg Execution Time",
      value: `${stats.averageExecutionTimeMs}ms`,
      color: "text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((d) => (
        <div
          key={d.label}
          className="rounded-xl border border-white/5 bg-white/5 p-4"
        >
          <p className="text-text-secondary text-[10px] font-semibold tracking-wider uppercase">
            {d.label}
          </p>
          <p className={`mt-1 text-xl font-bold ${d.color}`}>{d.value}</p>
        </div>
      ))}
    </div>
  );
}
