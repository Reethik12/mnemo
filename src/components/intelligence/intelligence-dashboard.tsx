import { IntelligenceStatisticsComp } from "./intelligence-statistics";
import { SemanticSearchComponent } from "./semantic-search";
import { SemanticClusterCard } from "./semantic-cluster-card";
import { IntelligenceInsightCard } from "./intelligence-insight-card";
import { useIntelligence } from "@/hooks/use-intelligence";
import { SectionHeader } from "@/components/shared/section-header";
import { memo } from "react";
import { MetricsDashboard } from "@/components/monitoring/metrics-dashboard";

export const IntelligenceDashboard = memo(function IntelligenceDashboard() {
  const { clusters, insights } = useIntelligence();

  return (
    <div className="custom-scrollbar flex flex-1 flex-col gap-10 overflow-y-auto pr-4 pb-10">
      <SemanticSearchComponent />

      <IntelligenceStatisticsComp />

      <section>
        <SectionHeader
          title="Generated Insights"
          description="AI-driven observations from your knowledge base"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => (
            <IntelligenceInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Semantic Clusters"
          description="Automatically categorized knowledge domains"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clusters.map((cluster) => (
            <SemanticClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </div>
      </section>

      {/* Production Infrastructure Monitor */}
      <section>
        <SectionHeader
          title="Production Intelligence Monitoring"
          description="Vector stats, retrieval latency, and structured health telemetry"
        />
        <div className="mt-4">
          <MetricsDashboard />
        </div>
      </section>
    </div>
  );
});
