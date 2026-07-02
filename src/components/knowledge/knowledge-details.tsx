import { GlassContainer } from "@/components/shared/glass-container";
import { KnowledgeNode, KnowledgeEdge } from "@/types/knowledge";
import { SectionHeader } from "@/components/shared/section-header";
import { useKnowledgeNode } from "@/hooks/use-knowledge-node";

interface KnowledgeDetailsProps {
  node?: KnowledgeNode;
  edge?: KnowledgeEdge;
}

export function KnowledgeDetails({ node, edge }: KnowledgeDetailsProps) {
  // Always call hooks unconditionally
  const { connectedEdges, connectedNodes } = useKnowledgeNode(node?.id);

  if (!node && !edge) return null;

  if (node) {
    return (
      <GlassContainer className="custom-scrollbar animate-in slide-in-from-right-4 flex h-full flex-col gap-6 overflow-y-auto duration-300">
        <SectionHeader
          title="Entity Details"
          description="Inspect knowledge entity properties"
        />

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-text-primary text-lg font-semibold">
              {node.label}
            </h3>
            <span className="bg-primary/10 border-primary/20 text-primary mt-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
              {node.type}
            </span>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-muted mb-1 block text-xs">
                Created
              </span>
              <p className="text-text-primary">
                {new Date(node.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-text-muted mb-1 block text-xs">
                Updated
              </span>
              <p className="text-text-primary">
                {new Date(node.updatedAt).toLocaleDateString()}
              </p>
            </div>
            {node.memoryId && (
              <div className="col-span-2">
                <span className="text-text-muted mb-1 block text-xs">
                  Source Memory
                </span>
                <p className="text-secondary cursor-pointer hover:underline">
                  {node.memoryId}
                </p>
              </div>
            )}
          </div>

          <div className="mt-2">
            <span className="text-text-muted mb-2 block text-sm">
              Attributes
            </span>
            <div className="bg-bg-secondary border-border-subtle flex flex-col gap-2 rounded-lg border p-3">
              {Object.entries(node.attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-text-secondary capitalize">{key}:</span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-border-subtle mt-2 border-t pt-4">
          <h4 className="text-text-primary mb-3 text-sm font-medium">
            Connections ({connectedNodes.length})
          </h4>
          <div className="flex flex-col gap-2">
            {connectedNodes.length === 0 ? (
              <p className="text-text-muted text-sm">No connections found.</p>
            ) : (
              connectedNodes.map((relatedNode) => {
                const connEdge = connectedEdges.find(
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
                      {relatedNode.label}
                    </span>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-text-muted text-xs capitalize">
                        {connEdge?.relationship.replace("_", " ")}
                      </span>
                      <span className="border-border text-text-tertiary inline-flex items-center rounded-full border bg-white/5 px-1.5 py-0 text-[10px] capitalize">
                        {connEdge?.strength}
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

  if (edge) {
    return (
      <GlassContainer className="custom-scrollbar animate-in slide-in-from-right-4 flex h-full flex-col gap-6 overflow-y-auto duration-300">
        <SectionHeader
          title="Relationship Details"
          description="Inspect connection properties"
        />

        <div className="flex flex-col gap-4">
          <div className="bg-bg-secondary flex flex-col items-center gap-3 rounded-lg p-4">
            <span className="font-medium">{edge.sourceId}</span>
            <span className="text-text-muted text-xs tracking-wider uppercase">
              {edge.relationship.replace("_", " ")}
            </span>
            <span className="font-medium">{edge.targetId}</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-muted mb-1 block text-xs">
                Strength
              </span>
              <span className="capitalize">{edge.strength}</span>
            </div>
            <div>
              <span className="text-text-muted mb-1 block text-xs">Weight</span>
              <span>{edge.weight.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </GlassContainer>
    );
  }

  return null;
}
