import { GlassContainer } from "@/components/shared/glass-container";
import { KnowledgeStatistics } from "@/types/knowledge";

interface KnowledgeHealthProps {
  statistics: KnowledgeStatistics;
}

export function KnowledgeHealth({ statistics }: KnowledgeHealthProps) {
  const isExcellent = statistics.healthStatus === "Excellent";
  const isGood = statistics.healthStatus === "Good";
  const color = isExcellent
    ? "text-success"
    : isGood
      ? "text-primary"
      : "text-warning";
  const ringColor = isExcellent
    ? "text-success"
    : isGood
      ? "text-primary"
      : "text-warning";

  return (
    <GlassContainer className="animate-in fade-in flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-text-secondary mb-4 text-sm font-medium">
        Graph Health
      </h3>

      <div className="border-bg-tertiary relative flex h-32 w-32 items-center justify-center rounded-full border-4">
        <div className={`absolute text-2xl font-bold ${color}`}>
          {statistics.healthStatus}
        </div>
        <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
          <circle
            cx="60"
            cy="60"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className={ringColor}
            strokeDasharray="364"
            strokeDashoffset={isExcellent ? 36 : isGood ? 91 : 182}
          />
        </svg>
      </div>

      <p className="text-text-muted mt-4 text-xs font-medium">
        Density: {(statistics.density * 100).toFixed(2)}%
      </p>
    </GlassContainer>
  );
}
