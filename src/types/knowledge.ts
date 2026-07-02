export type KnowledgeRelationship =
  | "is_a"
  | "has_a"
  | "related_to"
  | "part_of"
  | "depends_on"
  | "causes"
  | "solves";

export type KnowledgeStrength = "strong" | "medium" | "weak";

export interface KnowledgeNode {
  id: string;
  label: string;
  type: string;
  memoryId?: string; // Optional reference back to a memory
  attributes: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: KnowledgeRelationship;
  strength: KnowledgeStrength;
  weight: number; // 0 to 1
}

export interface KnowledgeCluster {
  id: string;
  name: string;
  description: string;
  nodeIds: string[];
  themeColor: string;
}

export interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  clusters: KnowledgeCluster[];
}

export interface KnowledgeInsight {
  id: string;
  title: string;
  description: string;
  type: "connection" | "gap" | "pattern" | "growth";
  relevanceScore: number;
}

export interface KnowledgeStatistics {
  totalNodes: number;
  totalEdges: number;
  density: number; // edges / possible edges
  clusterCount: number;
  healthStatus: "Excellent" | "Good" | "Needs Attention" | "Critical";
  mostConnectedNodeId?: string;
  largestClusterId?: string;
}

export interface KnowledgeSnapshot {
  id: string;
  timestamp: string;
  nodeCount: number;
  edgeCount: number;
  density: number;
}
