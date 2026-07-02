"use client";

import { KnowledgeOverview } from "@/components/knowledge/knowledge-overview";
import { KnowledgeSidebar } from "@/components/knowledge/knowledge-sidebar";
import { KnowledgeDetails } from "@/components/knowledge/knowledge-details";
import { useKnowledge } from "@/hooks/use-knowledge";
import { KnowledgeLoading } from "@/components/knowledge/knowledge-loading";

export default function KnowledgePage() {
  const { isLoading, selectedNode, selectedEdge } = useKnowledge();

  if (isLoading) {
    return <KnowledgeLoading />;
  }

  return (
    <div className="flex h-full w-full gap-6">
      <KnowledgeSidebar />
      <KnowledgeOverview />
      {(selectedNode || selectedEdge) && (
        <div className="w-80 shrink-0">
          <KnowledgeDetails
            node={selectedNode || undefined}
            edge={selectedEdge || undefined}
          />
        </div>
      )}
    </div>
  );
}
