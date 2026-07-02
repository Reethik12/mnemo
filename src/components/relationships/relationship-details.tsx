import { GlassContainer } from "@/components/shared/glass-container";
import { RelationshipEdge } from "@/types/relationship";
import { SectionHeader } from "@/components/shared/section-header";
import { RelationshipStrengthIndicator } from "./relationship-strength";

interface RelationshipDetailsProps {
  relationship: RelationshipEdge | null;
}

export function RelationshipDetails({
  relationship,
}: RelationshipDetailsProps) {
  if (!relationship || !relationship.sourceNode || !relationship.targetNode)
    return null;

  return (
    <GlassContainer className="custom-scrollbar animate-in slide-in-from-right-4 flex h-full flex-col gap-6 overflow-y-auto duration-300">
      <SectionHeader
        title="Edge Details"
        description="Inspect relationship metadata"
      />

      <div className="flex flex-col gap-4">
        <div className="bg-bg-secondary border-border-subtle flex flex-col gap-2 rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <span className="text-text-primary text-sm font-semibold">
              {relationship.sourceNode.title}
            </span>
            <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-0.5 text-[10px]">
              {relationship.sourceNode.type}
            </span>
          </div>
          <p className="text-text-secondary text-xs">
            {relationship.sourceNode.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-center py-2">
          <div className="flex flex-col items-center gap-1">
            <span className="text-text-muted text-[10px] tracking-widest uppercase">
              {relationship.direction === "bidirectional"
                ? "Bidirectional"
                : "Directional"}
            </span>
            <span className="text-text-muted">
              {relationship.direction === "bidirectional" ? "↑↓" : "↓"}
            </span>
            <span className="text-primary bg-primary/10 mt-1 rounded-full px-2 py-0.5 text-xs font-medium capitalize">
              {relationship.category}
            </span>
          </div>
        </div>

        <div className="bg-bg-secondary border-border-subtle flex flex-col gap-2 rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <span className="text-text-primary text-sm font-semibold">
              {relationship.targetNode.title}
            </span>
            <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-0.5 text-[10px]">
              {relationship.targetNode.type}
            </span>
          </div>
          <p className="text-text-secondary text-xs">
            {relationship.targetNode.excerpt}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-bg-secondary border-border-subtle flex flex-col gap-1 rounded-lg border p-3">
          <span className="text-text-muted text-xs">Strength</span>
          <div className="flex items-center justify-between">
            <span className="capitalize">{relationship.strength}</span>
            <RelationshipStrengthIndicator strength={relationship.strength} />
          </div>
        </div>
        <div className="bg-bg-secondary border-border-subtle flex flex-col gap-1 rounded-lg border p-3">
          <span className="text-text-muted text-xs">Created</span>
          <span>{new Date(relationship.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {relationship.notes && (
        <div className="mt-2">
          <span className="text-text-muted mb-2 block text-sm">
            System Notes
          </span>
          <div className="bg-bg-secondary border-border-subtle rounded-lg border p-3">
            <p className="text-text-secondary text-sm italic">
              {relationship.notes}
            </p>
          </div>
        </div>
      )}
    </GlassContainer>
  );
}
