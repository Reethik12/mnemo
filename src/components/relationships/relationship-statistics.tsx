import { GlassContainer } from "@/components/shared/glass-container";
import { useRelationshipStatistics } from "@/hooks/use-relationship-statistics";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { memo } from "react";

export const RelationshipStatisticsComp = memo(
  function RelationshipStatisticsComp() {
    const { statistics } = useRelationshipStatistics();

    if (!statistics) return null;

    return (
      <GlassContainer className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader
          title="Engine Overview"
          description="Metrics of the Relationship Engine"
        />

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
            <span className="text-text-secondary text-sm">Total Edges</span>
            <span className="text-text-primary text-3xl font-bold">
              {statistics.totalRelationships}
            </span>
          </Card>

          <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
            <span className="text-text-secondary text-sm">
              Connected Memories
            </span>
            <span className="text-text-primary text-3xl font-bold">
              {statistics.connectedMemories}
            </span>
          </Card>

          <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
            <span className="text-text-secondary text-sm">Avg Strength</span>
            <span className="text-primary text-3xl font-bold capitalize">
              {statistics.averageStrength}
            </span>
          </Card>

          <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
            <span className="text-text-secondary text-sm">
              Updated This Week
            </span>
            <span className="text-text-primary text-3xl font-bold">
              {statistics.recentlyUpdatedCount}
            </span>
          </Card>
        </div>
      </GlassContainer>
    );
  },
);
