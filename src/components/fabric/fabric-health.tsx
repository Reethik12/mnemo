import { GlassContainer } from "@/components/shared/glass-container";
import { FabricStatistics } from "@/types/fabric";

interface FabricHealthProps {
  statistics: FabricStatistics;
}

export function FabricHealth({ statistics }: FabricHealthProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <GlassContainer className="flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-text-secondary mb-4 text-sm font-medium">
        Fabric Health
      </h3>

      {/* Mock Progress Ring */}
      <div className="border-bg-tertiary relative flex h-32 w-32 items-center justify-center rounded-full border-4">
        <div
          className={`absolute text-4xl font-bold ${getHealthColor(statistics.averageHealthScore)}`}
        >
          {statistics.averageHealthScore}
        </div>
        <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
          <circle
            cx="60"
            cy="60"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className={getHealthColor(statistics.averageHealthScore)}
            strokeDasharray="364"
            strokeDashoffset={364 - (364 * statistics.averageHealthScore) / 100}
          />
        </svg>
      </div>

      <p className="mt-4 text-sm font-medium">
        Status: {statistics.healthStatus}
      </p>
    </GlassContainer>
  );
}
