import { KnowledgeStatistics as KnowledgeStatsComp } from "./knowledge-statistics";
import { KnowledgeClusterCard } from "./knowledge-cluster-card";
import { KnowledgeNodeCard } from "./knowledge-node-card";
import { KnowledgeEdgeCard } from "./knowledge-edge-card";
import { useKnowledge } from "@/hooks/use-knowledge";
import { useKnowledgeClusters } from "@/hooks/use-knowledge-clusters";
import { SectionHeader } from "@/components/shared/section-header";
import { memo } from "react";
import { Card } from "@/components/ui/card";

export const KnowledgeOverview = memo(function KnowledgeOverview() {
  const {
    nodes,
    edges,
    insights,
    statistics,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
  } = useKnowledge();
  const { clusters } = useKnowledgeClusters();

  return (
    <div className="custom-scrollbar animate-in fade-in flex flex-1 flex-col gap-10 overflow-y-auto pr-4 pb-10 duration-500">
      {statistics && <KnowledgeStatsComp statistics={statistics} />}

      <section>
        <SectionHeader
          title="Knowledge Insights"
          description="AI-driven observations from your knowledge graph"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight) => (
            <Card
              key={insight.id}
              className="flex flex-col gap-2 p-4 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-text-primary text-sm font-semibold">
                  {insight.title}
                </h4>
                <span className="bg-accent-purple/10 border-accent-purple/20 text-accent-purple inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px]">
                  {insight.type}
                </span>
              </div>
              <p className="text-text-secondary mt-1 text-sm">
                {insight.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Top Knowledge Clusters"
          description="Largest domains in your personal knowledge base"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clusters.slice(0, 6).map((cluster) => (
            <KnowledgeClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <SectionHeader
            title="Recent Entities"
            description="Newly verified knowledge nodes"
          />
          <div className="mt-4 flex flex-col gap-3">
            {nodes.slice(0, 5).map((node) => (
              <KnowledgeNodeCard
                key={node.id}
                node={node}
                isSelected={selectedNode?.id === node.id}
                onClick={(n) => {
                  setSelectedNode(n);
                  setSelectedEdge(null);
                }}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="Recent Relationships"
            description="Newly formed connections between entities"
          />
          <div className="mt-4 flex flex-col gap-3">
            {edges.slice(0, 5).map((edge) => (
              <KnowledgeEdgeCard
                key={edge.id}
                edge={edge}
                isSelected={selectedEdge?.id === edge.id}
                onClick={(e) => {
                  setSelectedEdge(e);
                  setSelectedNode(null);
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});
