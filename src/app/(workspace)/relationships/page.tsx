"use client";

import { RelationshipOverview } from "@/components/relationships/relationship-overview";
import { RelationshipSidebar } from "@/components/relationships/relationship-sidebar";
import { RelationshipDetails } from "@/components/relationships/relationship-details";
import { useRelationships } from "@/hooks/use-relationships";
import { useRelationshipSelection } from "@/hooks/use-relationship-selection";
import { RelationshipLoading } from "@/components/relationships/relationship-loading";

export default function RelationshipsPage() {
  const { isLoading } = useRelationships();
  const { selectedRelationship } = useRelationshipSelection();

  if (isLoading) {
    return <RelationshipLoading />;
  }

  return (
    <div className="flex h-full w-full gap-6">
      <RelationshipSidebar />
      <RelationshipOverview />
      {selectedRelationship && (
        <div className="w-80 shrink-0">
          <RelationshipDetails relationship={selectedRelationship} />
        </div>
      )}
    </div>
  );
}
