import { GlassContainer } from "@/components/shared/glass-container";
import { useIntelligenceStatistics } from "@/hooks/use-intelligence-statistics";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { memo } from "react";

export const IntelligenceStatisticsComp = memo(
  function IntelligenceStatisticsComp() {
    const { statistics } = useIntelligenceStatistics();

    if (!statistics) return null;

    return (
      <GlassContainer className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader
          title="Semantic Engine Overview"
          description="Metrics of your local intelligence engine"
        />

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
            <span className="text-text-secondary text-sm">
              Historical Searches
            </span>
            <span className="text-text-primary text-3xl font-bold">
              {statistics.totalSearches.toLocaleString()}
            </span>
          </Card>

          <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
            <span className="text-text-secondary text-sm">
              Avg Relevance Score
            </span>
            <span className="text-primary text-3xl font-bold">
              {(statistics.averageRelevance * 100).toFixed(0)}%
            </span>
          </Card>

          <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
            <span className="text-text-secondary text-sm">Active Clusters</span>
            <span className="text-text-primary text-3xl font-bold">
              {statistics.activeClusters}
            </span>
          </Card>

          <Card className="hover:border-primary flex flex-col gap-2 p-4 transition-colors">
            <span className="text-text-secondary text-sm">
              Generated Insights
            </span>
            <span className="text-text-primary text-3xl font-bold">
              {statistics.insightsGenerated}
            </span>
          </Card>
        </div>
      </GlassContainer>
    );
  },
);
