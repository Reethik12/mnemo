import { RelationshipStatisticsComp } from "./relationship-statistics";
import { RelationshipCard } from "./relationship-card";
import { RelationshipItem } from "./relationship-item";
import { useRelationships } from "@/hooks/use-relationships";
import { useRelationshipSelection } from "@/hooks/use-relationship-selection";
import { SectionHeader } from "@/components/shared/section-header";
import { memo, useState } from "react";
import { GlassContainer } from "@/components/shared/glass-container";

export const RelationshipOverview = memo(function RelationshipOverview() {
  const { filteredRelationships, groupedRelationships } = useRelationships();
  const { selectedRelationship, setSelectedRelationship } =
    useRelationshipSelection();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="custom-scrollbar animate-in fade-in flex flex-1 flex-col gap-10 overflow-y-auto pr-4 pb-10 duration-500">
      <RelationshipStatisticsComp />

      <section>
        <div className="mb-4 flex items-end justify-between">
          <SectionHeader
            title="Relationship Engine"
            description="Explore memory connections mapped by the engine"
          />
          <div className="bg-bg-secondary border-border-subtle flex items-center gap-2 rounded-md border p-1">
            <button
              className={`rounded px-3 py-1 text-xs transition-colors ${viewMode === "grid" ? "bg-bg-tertiary text-text-primary" : "text-text-muted hover:text-text-primary"}`}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </button>
            <button
              className={`rounded px-3 py-1 text-xs transition-colors ${viewMode === "list" ? "bg-bg-tertiary text-text-primary" : "text-text-muted hover:text-text-primary"}`}
              onClick={() => setViewMode("list")}
            >
              List
            </button>
          </div>
        </div>

        {filteredRelationships.length === 0 ? (
          <GlassContainer className="flex flex-col items-center justify-center p-10 text-center">
            <span className="mb-4 text-4xl">🕸️</span>
            <h3 className="text-lg font-semibold">No relationships found</h3>
            <p className="text-text-secondary mt-2 max-w-sm">
              Adjust your filters or let the engine analyze more memories to
              discover connections.
            </p>
          </GlassContainer>
        ) : (
          <div className="mt-4 flex flex-col gap-8">
            {groupedRelationships.map((group) => (
              <div key={group.category} className="flex flex-col gap-3">
                <h3 className="text-text-secondary bg-bg-primary/80 sticky top-0 z-10 py-2 text-sm font-medium capitalize backdrop-blur-md">
                  {group.category} Connections ({group.relationships.length})
                </h3>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {group.relationships.slice(0, 6).map((rel) => (
                      <RelationshipCard
                        key={rel.id}
                        relationship={rel}
                        isSelected={selectedRelationship?.id === rel.id}
                        onClick={setSelectedRelationship}
                      />
                    ))}
                  </div>
                ) : (
                  <GlassContainer className="divide-border-subtle flex flex-col divide-y overflow-hidden p-0">
                    {group.relationships.slice(0, 10).map((rel) => (
                      <RelationshipItem
                        key={rel.id}
                        relationship={rel}
                        isSelected={selectedRelationship?.id === rel.id}
                        onClick={setSelectedRelationship}
                      />
                    ))}
                  </GlassContainer>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
});
