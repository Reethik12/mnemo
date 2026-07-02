import {
  KnowledgeNode,
  KnowledgeEdge,
  KnowledgeCluster,
  KnowledgeInsight,
  KnowledgeStatistics,
  KnowledgeRelationship,
  KnowledgeStrength,
} from "@/types/knowledge";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_CLUSTERS: KnowledgeCluster[] = [
  {
    id: "kc-1",
    name: "Learning",
    description: "Acquisition of knowledge or skills",
    nodeIds: [],
    themeColor: "var(--color-primary)",
  },
  {
    id: "kc-2",
    name: "Programming",
    description: "Software development concepts",
    nodeIds: [],
    themeColor: "var(--color-secondary)",
  },
  {
    id: "kc-3",
    name: "Music",
    description: "Audio, theory, and composition",
    nodeIds: [],
    themeColor: "var(--color-accent-1)",
  },
  {
    id: "kc-4",
    name: "Research",
    description: "In-depth investigation topics",
    nodeIds: [],
    themeColor: "var(--color-accent-2)",
  },
  {
    id: "kc-5",
    name: "Projects",
    description: "Actionable long-term goals",
    nodeIds: [],
    themeColor: "var(--color-primary)",
  },
  {
    id: "kc-6",
    name: "Journal",
    description: "Personal logs and thoughts",
    nodeIds: [],
    themeColor: "var(--color-secondary)",
  },
  {
    id: "kc-7",
    name: "Books",
    description: "Reading materials and notes",
    nodeIds: [],
    themeColor: "var(--color-accent-1)",
  },
  {
    id: "kc-8",
    name: "Travel",
    description: "Locations and trips",
    nodeIds: [],
    themeColor: "var(--color-accent-2)",
  },
  {
    id: "kc-9",
    name: "Health",
    description: "Well-being and fitness",
    nodeIds: [],
    themeColor: "var(--color-success)",
  },
  {
    id: "kc-10",
    name: "Ideas",
    description: "Raw unrefined concepts",
    nodeIds: [],
    themeColor: "var(--color-warning)",
  },
  {
    id: "kc-11",
    name: "Finance",
    description: "Economics and budgets",
    nodeIds: [],
    themeColor: "var(--color-primary)",
  },
  {
    id: "kc-12",
    name: "Science",
    description: "Natural and formal sciences",
    nodeIds: [],
    themeColor: "var(--color-secondary)",
  },
  {
    id: "kc-13",
    name: "History",
    description: "Past events and analyses",
    nodeIds: [],
    themeColor: "var(--color-accent-1)",
  },
  {
    id: "kc-14",
    name: "Art",
    description: "Creative expressions",
    nodeIds: [],
    themeColor: "var(--color-accent-2)",
  },
  {
    id: "kc-15",
    name: "Technology",
    description: "Gadgets and tech trends",
    nodeIds: [],
    themeColor: "var(--color-primary)",
  },
];

const generateMockNodes = (count: number): KnowledgeNode[] => {
  return Array.from({ length: count }, (_, i) => {
    return {
      id: `kn-${i + 1}`,
      label: `Entity ${i + 1}`,
      type: ["Concept", "Person", "Event", "Location", "Object"][i % 5],
      memoryId: i % 3 === 0 ? `memory-${i}` : undefined,
      attributes: {
        importance: Math.floor(Math.random() * 10),
        verified: i % 2 === 0,
      },
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000,
      ).toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
};

const generateMockEdges = (
  nodes: KnowledgeNode[],
  count: number,
): KnowledgeEdge[] => {
  const relationships: KnowledgeRelationship[] = [
    "is_a",
    "has_a",
    "related_to",
    "part_of",
    "depends_on",
    "causes",
    "solves",
  ];
  const strengths: KnowledgeStrength[] = ["strong", "medium", "weak"];

  return Array.from({ length: count }, (_, i) => {
    const source = nodes[Math.floor(Math.random() * nodes.length)];
    const target = nodes[Math.floor(Math.random() * nodes.length)];
    return {
      id: `ke-${i + 1}`,
      sourceId: source.id,
      targetId: target.id,
      relationship: relationships[i % relationships.length],
      strength: strengths[i % strengths.length],
      weight: Math.random(),
    };
  });
};

// Singleton data
const mockNodes = generateMockNodes(110);
const mockEdges = generateMockEdges(mockNodes, 220);

// Populate clusters with random nodes
MOCK_CLUSTERS.forEach((cluster) => {
  cluster.nodeIds = mockNodes
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 15) + 5)
    .map((n) => n.id);
});

const mockInsights: KnowledgeInsight[] = [
  {
    id: "ki-1",
    title: "Most Connected Entity",
    description: "Entity 42 has the most relationships in the graph.",
    type: "connection",
    relevanceScore: 0.95,
  },
  {
    id: "ki-2",
    title: "Largest Cluster",
    description:
      "The 'Programming' cluster holds the majority of your recent knowledge.",
    type: "pattern",
    relevanceScore: 0.88,
  },
  {
    id: "ki-3",
    title: "Knowledge Gap",
    description:
      "You have several disconnected concepts in the 'Finance' area.",
    type: "gap",
    relevanceScore: 0.75,
  },
  {
    id: "ki-4",
    title: "Recent Growth",
    description: "Your 'Learning' cluster has grown by 15% this week.",
    type: "growth",
    relevanceScore: 0.82,
  },
];

export class KnowledgeService {
  static async buildGraph(): Promise<void> {
    await delay(500);
  }

  static async getNodes(): Promise<KnowledgeNode[]> {
    await delay(500);
    return [...mockNodes];
  }

  static async getEdges(): Promise<KnowledgeEdge[]> {
    await delay(500);
    return [...mockEdges];
  }

  static async getClusters(): Promise<KnowledgeCluster[]> {
    await delay(500);
    return [...MOCK_CLUSTERS];
  }

  static async getInsights(): Promise<KnowledgeInsight[]> {
    await delay(500);
    return [...mockInsights];
  }

  static async calculateStatistics(): Promise<KnowledgeStatistics> {
    await delay(500);
    const possibleEdges = (mockNodes.length * (mockNodes.length - 1)) / 2;
    const density = possibleEdges > 0 ? mockEdges.length / possibleEdges : 0;

    return {
      totalNodes: mockNodes.length,
      totalEdges: mockEdges.length,
      density,
      clusterCount: MOCK_CLUSTERS.length,
      healthStatus: "Good",
      mostConnectedNodeId: mockNodes[0].id,
      largestClusterId: MOCK_CLUSTERS[0].id,
    };
  }

  static async refreshGraph(): Promise<void> {
    await delay(500);
  }
}
