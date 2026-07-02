export type RelationshipType =
  | "reference"
  | "parent"
  | "child"
  | "related"
  | "inspired_by"
  | "duplicate"
  | "continuation";

export type RelationshipStrength = "strong" | "medium" | "weak";

export interface MemoryContext {
  keywords: string[];
  sentiment?: string;
  source?: string;
  relevanceScore?: number;
}

export interface MemoryNode {
  id: string;
  title: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  context: MemoryContext;
  clusterId?: string;
  healthScore: number; // 0 to 100
}

export interface MemoryEdge {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  strength: RelationshipStrength;
  createdAt: string;
}

export interface MemoryCluster {
  id: string;
  name: string;
  description: string;
  nodeCount: number;
  color: string;
}

export interface FabricSnapshot {
  id: string;
  date: string;
  totalNodes: number;
  totalEdges: number;
  activeClusters: number;
  growthRate: number; // Percentage
}

export interface FabricStatistics {
  totalMemories: number;
  totalConnections: number;
  averageHealthScore: number;
  clusterCount: number;
  growthThisWeek: number;
  healthStatus: "Excellent" | "Good" | "Needs Attention" | "Critical";
}
