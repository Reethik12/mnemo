import { GlassContainer } from "@/components/shared/glass-container";
import { FabricStatistics as FabricStatsType } from "@/types/fabric";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";

interface FabricStatisticsProps {
  statistics: FabricStatsType;
}

export function FabricStatistics({ statistics }: FabricStatisticsProps) {
  return (
    <GlassContainer className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Fabric Overview"
        description="High-level statistics of your memory network"
      />

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="flex flex-col gap-2 p-4">
          <span className="text-text-secondary text-sm">Total Memories</span>
          <span className="text-text-primary text-3xl font-bold">
            {statistics.totalMemories}
          </span>
        </Card>

        <Card className="flex flex-col gap-2 p-4">
          <span className="text-text-secondary text-sm">Connections</span>
          <span className="text-text-primary text-3xl font-bold">
            {statistics.totalConnections}
          </span>
        </Card>

        <Card className="flex flex-col gap-2 p-4">
          <span className="text-text-secondary text-sm">Active Clusters</span>
          <span className="text-text-primary text-3xl font-bold">
            {statistics.clusterCount}
          </span>
        </Card>

        <Card className="flex flex-col gap-2 p-4">
          <span className="text-text-secondary text-sm">Growth (7d)</span>
          <span className="text-success text-3xl font-bold">
            +{statistics.growthThisWeek}%
          </span>
        </Card>
      </div>
    </GlassContainer>
  );
}
