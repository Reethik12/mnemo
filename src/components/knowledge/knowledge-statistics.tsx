import { GlassContainer } from "@/components/shared/glass-container";
import { KnowledgeStatistics as StatsType } from "@/types/knowledge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";

interface KnowledgeStatisticsProps {
  statistics: StatsType;
}

export function KnowledgeStatistics({ statistics }: KnowledgeStatisticsProps) {
  return (
    <GlassContainer className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Graph Overview"
        description="Topological metrics of your knowledge base"
      />

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
          <span className="text-text-secondary text-sm">Entities</span>
          <span className="text-text-primary text-3xl font-bold">
            {statistics.totalNodes}
          </span>
        </Card>

        <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
          <span className="text-text-secondary text-sm">Relationships</span>
          <span className="text-text-primary text-3xl font-bold">
            {statistics.totalEdges}
          </span>
        </Card>

        <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
          <span className="text-text-secondary text-sm">Density</span>
          <span className="text-primary text-3xl font-bold">
            {(statistics.density * 100).toFixed(2)}%
          </span>
        </Card>

        <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
          <span className="text-text-secondary text-sm">Clusters</span>
          <span className="text-text-primary text-3xl font-bold">
            {statistics.clusterCount}
          </span>
        </Card>
      </div>
    </GlassContainer>
  );
}
