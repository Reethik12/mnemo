import {
  MemoryNode,
  MemoryEdge,
  MemoryCluster,
  FabricSnapshot,
  FabricStatistics,
  RelationshipType,
  RelationshipStrength,
} from "@/types/fabric";

// Helper to generate a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Mock Data Generators ────────────────────────────────────────────────

const MOCK_CLUSTERS: MemoryCluster[] = [
  {
    id: "c-1",
    name: "Learning",
    description: "Topics related to acquiring new knowledge",
    nodeCount: 15,
    color: "var(--color-primary)",
  },
  {
    id: "c-2",
    name: "Programming",
    description: "Software development and engineering",
    nodeCount: 20,
    color: "var(--color-secondary)",
  },
  {
    id: "c-3",
    name: "Music",
    description: "Musical ideas, theory, and artists",
    nodeCount: 5,
    color: "var(--color-accent-1)",
  },
  {
    id: "c-4",
    name: "Research",
    description: "Deep dives into various subjects",
    nodeCount: 12,
    color: "var(--color-accent-2)",
  },
  {
    id: "c-5",
    name: "Health",
    description: "Fitness, nutrition, and well-being",
    nodeCount: 8,
    color: "var(--color-success)",
  },
  {
    id: "c-6",
    name: "Travel",
    description: "Places, itineraries, and experiences",
    nodeCount: 6,
    color: "var(--color-warning)",
  },
  {
    id: "c-7",
    name: "Projects",
    description: "Active and past endeavors",
    nodeCount: 10,
    color: "var(--color-primary)",
  },
  {
    id: "c-8",
    name: "Ideas",
    description: "Spontaneous thoughts and concepts",
    nodeCount: 18,
    color: "var(--color-secondary)",
  },
  {
    id: "c-9",
    name: "Books",
    description: "Reading lists and summaries",
    nodeCount: 14,
    color: "var(--color-accent-1)",
  },
  {
    id: "c-10",
    name: "Journal",
    description: "Personal reflections and daily logs",
    nodeCount: 25,
    color: "var(--color-accent-2)",
  },
  {
    id: "c-11",
    name: "Meetings",
    description: "Notes from professional and personal meetups",
    nodeCount: 7,
    color: "var(--color-primary)",
  },
];

const generateMockNodes = (count: number): MemoryNode[] => {
  return Array.from({ length: count }, (_, i) => {
    const cluster = MOCK_CLUSTERS[i % MOCK_CLUSTERS.length];
    return {
      id: `node-${i + 1}`,
      title: `Mock Memory ${i + 1} - ${cluster.name}`,
      excerpt: `This is a mock excerpt for memory ${i + 1}. It contains some placeholder text to simulate a real memory entry.`,
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000,
      ).toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [cluster.name.toLowerCase(), "mock", `tag-${i % 5}`],
      context: {
        keywords: ["mock", "test", cluster.name.toLowerCase()],
        relevanceScore: Math.random() * 100,
      },
      clusterId: cluster.id,
      healthScore: Math.floor(Math.random() * 100),
    };
  });
};

const generateMockEdges = (
  nodes: MemoryNode[],
  count: number,
): MemoryEdge[] => {
  const types: RelationshipType[] = [
    "reference",
    "parent",
    "child",
    "related",
    "inspired_by",
    "duplicate",
    "continuation",
  ];
  const strengths: RelationshipStrength[] = ["strong", "medium", "weak"];

  return Array.from({ length: count }, (_, i) => {
    const source = nodes[Math.floor(Math.random() * nodes.length)];
    const target = nodes[Math.floor(Math.random() * nodes.length)];
    return {
      id: `edge-${i + 1}`,
      sourceId: source.id,
      targetId: target.id,
      type: types[i % types.length],
      strength: strengths[i % strengths.length],
      createdAt: new Date().toISOString(),
    };
  });
};

const generateMockSnapshots = (): FabricSnapshot[] => {
  return [
    {
      id: "snap-today",
      date: "Today",
      totalNodes: 55,
      totalEdges: 80,
      activeClusters: 11,
      growthRate: 5,
    },
    {
      id: "snap-yesterday",
      date: "Yesterday",
      totalNodes: 52,
      totalEdges: 75,
      activeClusters: 11,
      growthRate: 2,
    },
    {
      id: "snap-last-week",
      date: "Last Week",
      totalNodes: 45,
      totalEdges: 60,
      activeClusters: 9,
      growthRate: 15,
    },
  ];
};

// Singleton data
const mockNodes = generateMockNodes(55);
const mockEdges = generateMockEdges(mockNodes, 80);
const mockSnapshots = generateMockSnapshots();

// ─── Service Methods ──────────────────────────────────────────────────────

export class FabricService {
  static async buildFabric(): Promise<void> {
    await delay(500);
    // In a real app, this might initialize the local DB or sync remote data.
  }

  static async getNodes(): Promise<MemoryNode[]> {
    await delay(500);
    return [...mockNodes];
  }

  static async getEdges(): Promise<MemoryEdge[]> {
    await delay(500);
    return [...mockEdges];
  }

  static async getClusters(): Promise<MemoryCluster[]> {
    await delay(500);
    return [...MOCK_CLUSTERS];
  }

  static async calculateStatistics(): Promise<FabricStatistics> {
    await delay(500);
    return {
      totalMemories: mockNodes.length,
      totalConnections: mockEdges.length,
      averageHealthScore: 85,
      clusterCount: MOCK_CLUSTERS.length,
      growthThisWeek: 15,
      healthStatus: "Excellent",
    };
  }

  static async refreshFabric(): Promise<void> {
    await delay(500);
    // Simulates a refresh
  }

  static async getSnapshots(): Promise<FabricSnapshot[]> {
    await delay(500);
    return [...mockSnapshots];
  }
}
