import {
  Relationship,
  RelationshipNode,
  RelationshipEdge,
  RelationshipCluster,
  RelationshipGroup,
  RelationshipStatistics,
  RelationshipFilter,
  RelationshipCategory,
  RelationshipStrength,
  RelationshipDirection,
  RelationshipSnapshot,
} from "@/types/relationship";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock memory nodes for relationships
const mockNodes: RelationshipNode[] = Array.from({ length: 150 }, (_, i) => ({
  id: `node-${i + 1}`,
  title: `Memory Concept ${i + 1}`,
  excerpt: `A short summary of memory concept ${i + 1}.`,
  type: ["Idea", "Event", "Journal", "Book", "Project"][i % 5],
}));

const categories: RelationshipCategory[] = [
  "parent",
  "child",
  "reference",
  "similar",
  "related",
  "dependency",
];
const strengths: RelationshipStrength[] = ["strong", "medium", "weak"];
const directions: RelationshipDirection[] = ["bidirectional", "unidirectional"];

const generateMockRelationships = (count: number): Relationship[] => {
  return Array.from({ length: count }, (_, i) => {
    const source = mockNodes[Math.floor(Math.random() * mockNodes.length)];
    const target = mockNodes[Math.floor(Math.random() * mockNodes.length)];
    return {
      id: `rel-${i + 1}`,
      sourceId: source.id,
      targetId: target.id,
      category: categories[i % categories.length],
      strength: strengths[i % strengths.length],
      direction: directions[i % directions.length],
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000,
      ).toISOString(),
      updatedAt: new Date().toISOString(),
      notes: i % 4 === 0 ? "Manually verified relationship." : undefined,
    };
  });
};

const mockRelationships = generateMockRelationships(260);

const MOCK_CLUSTERS: RelationshipCluster[] = [
  {
    id: "rc-1",
    name: "Core Knowledge",
    relationshipIds: mockRelationships.slice(0, 30).map((r) => r.id),
  },
  {
    id: "rc-2",
    name: "Project Dependencies",
    relationshipIds: mockRelationships.slice(30, 80).map((r) => r.id),
  },
  {
    id: "rc-3",
    name: "Journal Links",
    relationshipIds: mockRelationships.slice(80, 110).map((r) => r.id),
  },
];

const mockSnapshots: RelationshipSnapshot[] = [
  {
    id: "rs-1",
    timestamp: new Date().toISOString(),
    label: "Today's Relationships",
    totalRelationships: 260,
    growth: 2.5,
  },
  {
    id: "rs-2",
    timestamp: new Date(Date.now() - 7 * 86400000).toISOString(),
    label: "This Week",
    totalRelationships: 245,
    growth: 12.0,
  },
  {
    id: "rs-3",
    timestamp: new Date(Date.now() - 30 * 86400000).toISOString(),
    label: "This Month",
    totalRelationships: 190,
    growth: 36.8,
  },
];

// Combine relations with nodes to form edges
const getEnrichedRelationships = (): RelationshipEdge[] => {
  return mockRelationships.map((rel) => ({
    ...rel,
    sourceNode: mockNodes.find((n) => n.id === rel.sourceId),
    targetNode: mockNodes.find((n) => n.id === rel.targetId),
  }));
};

export class RelationshipService {
  static async getRelationships(): Promise<RelationshipEdge[]> {
    await delay(500);
    return getEnrichedRelationships();
  }

  static async getRelationship(id: string): Promise<RelationshipEdge | null> {
    await delay(500);
    return getEnrichedRelationships().find((r) => r.id === id) || null;
  }

  static async getClusters(): Promise<RelationshipCluster[]> {
    await delay(500);
    return [...MOCK_CLUSTERS];
  }

  static async getSnapshots(): Promise<RelationshipSnapshot[]> {
    await delay(500);
    return [...mockSnapshots];
  }

  static async createRelationship(
    data: Omit<Relationship, "id" | "createdAt" | "updatedAt">,
  ): Promise<RelationshipEdge> {
    await delay(500);
    const newRel: Relationship = {
      ...data,
      id: `rel-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockRelationships.push(newRel);
    return {
      ...newRel,
      sourceNode: mockNodes.find((n) => n.id === newRel.sourceId),
      targetNode: mockNodes.find((n) => n.id === newRel.targetId),
    };
  }

  static async deleteRelationship(id: string): Promise<void> {
    await delay(500);
    const idx = mockRelationships.findIndex((r) => r.id === id);
    if (idx > -1) {
      mockRelationships.splice(idx, 1);
    }
  }

  static async groupRelationships(
    relationships: RelationshipEdge[],
  ): Promise<RelationshipGroup[]> {
    await delay(200);
    const groups: Record<string, RelationshipEdge[]> = {};
    for (const rel of relationships) {
      if (!groups[rel.category]) groups[rel.category] = [];
      groups[rel.category].push(rel);
    }
    return Object.keys(groups).map((category) => ({
      category: category as RelationshipCategory,
      relationships: groups[category],
    }));
  }

  static async filterRelationships(
    relationships: RelationshipEdge[],
    filter: RelationshipFilter,
  ): Promise<RelationshipEdge[]> {
    await delay(300);
    return relationships.filter((rel) => {
      if (
        filter.strengths &&
        filter.strengths.length > 0 &&
        !filter.strengths.includes(rel.strength)
      )
        return false;
      if (
        filter.categories &&
        filter.categories.length > 0 &&
        !filter.categories.includes(rel.category)
      )
        return false;
      if (
        filter.directions &&
        filter.directions.length > 0 &&
        !filter.directions.includes(rel.direction)
      )
        return false;
      return true;
    });
  }

  static async calculateStatistics(): Promise<RelationshipStatistics> {
    await delay(500);
    const connectedMemoryIds = new Set(
      mockRelationships.flatMap((r) => [r.sourceId, r.targetId]),
    );
    return {
      totalRelationships: mockRelationships.length,
      connectedMemories: connectedMemoryIds.size,
      averageStrength: "Medium",
      largestClusterId: "rc-2",
      recentlyUpdatedCount: 45,
      healthStatus: "Healthy",
    };
  }

  static async refreshRelationships(): Promise<void> {
    await delay(500);
  }
}
