export type RelationshipStrength = "strong" | "medium" | "weak";
export type RelationshipDirection = "bidirectional" | "unidirectional";
export type RelationshipCategory =
  "parent" | "child" | "reference" | "similar" | "related" | "dependency";

export interface RelationshipNode {
  id: string;
  title: string;
  excerpt: string;
  type: string;
}

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  strength: RelationshipStrength;
  direction: RelationshipDirection;
  category: RelationshipCategory;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RelationshipEdge extends Relationship {
  sourceNode?: RelationshipNode;
  targetNode?: RelationshipNode;
}

export interface RelationshipCluster {
  id: string;
  name: string;
  relationshipIds: string[];
}

export interface RelationshipGroup {
  category: RelationshipCategory;
  relationships: RelationshipEdge[];
}

export interface RelationshipStatistics {
  totalRelationships: number;
  connectedMemories: number;
  averageStrength: string;
  largestClusterId?: string;
  recentlyUpdatedCount: number;
  healthStatus:
    "Excellent" | "Healthy" | "Growing" | "Needs Review" | "Critical";
}

export interface RelationshipFilter {
  strengths?: RelationshipStrength[];
  categories?: RelationshipCategory[];
  directions?: RelationshipDirection[];
  recentlyUpdated?: boolean;
  recentlyCreated?: boolean;
}

export interface RelationshipSnapshot {
  id: string;
  timestamp: string;
  label: string; // e.g. "Today's Relationships", "This Week", "This Month"
  totalRelationships: number;
  growth: number; // percentage
}
