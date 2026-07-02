import { GlassContainer } from "@/components/shared/glass-container";
import { MemoryNode } from "@/types/fabric";
import { SectionHeader } from "@/components/shared/section-header";
import { useFabricNode } from "@/hooks/use-fabric-node";

interface FabricDetailsProps {
  node: MemoryNode;
}

export function FabricDetails({ node }: FabricDetailsProps) {
  const { connectedEdges, connectedNodes } = useFabricNode(node.id);

  return (
    <GlassContainer className="custom-scrollbar animate-in slide-in-from-right-4 flex h-full flex-col gap-6 overflow-y-auto duration-300">
      <SectionHeader
        title="Node Details"
        description="Detailed inspection of the memory node"
      />

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-text-primary text-lg font-semibold">
            {node.title}
          </h3>
          <p className="text-text-secondary mt-1 text-sm">{node.excerpt}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-muted">Created</span>
            <p className="text-text-primary">
              {new Date(node.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="text-text-muted">Updated</span>
            <p className="text-text-primary">
              {new Date(node.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="text-text-muted">Health Score</span>
            <p className="text-text-primary">{node.healthScore}/100</p>
          </div>
          <div>
            <span className="text-text-muted">Relevance</span>
            <p className="text-text-primary">
              {node.context.relevanceScore?.toFixed(1) || 0}
            </p>
          </div>
        </div>

        <div>
          <span className="text-text-muted mb-2 block text-sm">Tags</span>
          <div className="flex flex-wrap gap-2">
            {node.tags.map((tag) => (
              <span
                key={tag}
                className="border-border text-text-tertiary inline-flex items-center rounded-full border bg-white/5 px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-text-muted mb-2 block text-sm">Keywords</span>
          <div className="flex flex-wrap gap-2">
            {node.context.keywords.map((keyword) => (
              <span
                key={keyword}
                className="bg-status-success/10 border-status-success/20 text-status-success inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-border-subtle mt-4 border-t pt-4">
        <h4 className="text-text-primary mb-3 text-sm font-medium">
          Related Nodes ({connectedNodes.length})
        </h4>
        <div className="flex flex-col gap-2">
          {connectedNodes.length === 0 ? (
            <p className="text-text-muted text-sm">No related nodes found.</p>
          ) : (
            connectedNodes.map((relatedNode) => {
              const edge = connectedEdges.find(
                (e) =>
                  e.sourceId === relatedNode.id ||
                  e.targetId === relatedNode.id,
              );
              return (
                <div
                  key={relatedNode.id}
                  className="bg-bg-secondary flex flex-col gap-1 rounded-lg p-3"
                >
                  <span className="text-sm font-medium">
                    {relatedNode.title}
                  </span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-text-muted text-xs capitalize">
                      {edge?.type}
                    </span>
                    <span className="border-border text-text-tertiary inline-flex items-center rounded-full border bg-white/5 px-1.5 py-0 text-[10px] capitalize">
                      {edge?.strength}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </GlassContainer>
  );
}
