import {
  TimelineEvent,
  MemoryReplay,
  EvolutionDataPoint,
  TimelineStats,
} from "./types";

const now = Date.now();
const oneDay = 86400000;

export const MOCK_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "evt_1",
    memoryId: "mem_1",
    title: "Understanding Transformer Architecture",
    date: new Date(now - oneDay * 0.5).toISOString(),
    tags: ["AI", "Machine Learning", "Neural Networks"],
    source: "arXiv Paper",
    summary:
      "Self-attention mechanisms allow Transformers to process entire sequences in parallel, dramatically improving training efficiency over RNNs.",
    relationshipCount: 12,
    confidence: 94,
    type: "improved",
  },
  {
    id: "evt_2",
    memoryId: "mem_2",
    title: "React Server Components",
    date: new Date(now - oneDay * 2).toISOString(),
    tags: ["React", "Next.js", "Web"],
    source: "Next.js Docs",
    summary:
      "Server components execute exclusively on the server, reducing the client-side JavaScript bundle and enabling direct database queries.",
    relationshipCount: 8,
    confidence: 88,
    type: "created",
  },
  {
    id: "evt_3",
    memoryId: "mem_3",
    title: "System Design: Load Balancing",
    date: new Date(now - oneDay * 5).toISOString(),
    tags: ["System Design", "Architecture", "Backend"],
    source: "Engineering Blog",
    summary:
      "Distributes incoming network traffic across multiple servers to ensure no single server bears too much demand.",
    relationshipCount: 5,
    confidence: 82,
    type: "created",
  },
  {
    id: "evt_4",
    memoryId: "mem_1",
    title: "Understanding Transformer Architecture (Initial)",
    date: new Date(now - oneDay * 12).toISOString(),
    tags: ["AI"],
    source: "Blog Post",
    summary:
      "Transformers are a type of neural network used for NLP tasks like translation.",
    relationshipCount: 2,
    confidence: 45,
    type: "created",
  },
  {
    id: "evt_5",
    memoryId: "mem_4",
    title: "Docker Containerization",
    date: new Date(now - oneDay * 18).toISOString(),
    tags: ["DevOps", "Docker"],
    source: "Tutorial",
    summary:
      "Containers package code and dependencies together so the application runs quickly and reliably from one computing environment to another.",
    relationshipCount: 15,
    confidence: 91,
    type: "improved",
  },
];

export const MOCK_REPLAYS: Record<string, MemoryReplay> = {
  mem_1: {
    memoryId: "mem_1",
    title: "Understanding Transformer Architecture",
    currentVersion: 3,
    versions: [
      {
        versionId: "v1",
        versionNumber: 1,
        date: new Date(now - oneDay * 12).toISOString(),
        summary:
          "Transformers are a type of neural network used for NLP tasks like translation.",
        relationships: [{ id: "r1", target: "NLP", type: "used_for" }],
        newConceptsLearned: ["Neural Networks", "NLP"],
        confidenceScore: 45,
      },
      {
        versionId: "v2",
        versionNumber: 2,
        date: new Date(now - oneDay * 6).toISOString(),
        summary:
          "Transformers use attention mechanisms to weigh the importance of different parts of the input. This replaces recurrence.",
        relationships: [
          { id: "r1", target: "NLP", type: "used_for" },
          { id: "r2", target: "Attention Mechanism", type: "uses" },
          { id: "r3", target: "RNN", type: "replaces" },
        ],
        newConceptsLearned: ["Attention Mechanism", "Recurrence"],
        confidenceScore: 72,
      },
      {
        versionId: "v3",
        versionNumber: 3,
        date: new Date(now - oneDay * 0.5).toISOString(),
        summary:
          "Self-attention mechanisms allow Transformers to process entire sequences in parallel, dramatically improving training efficiency over RNNs.",
        relationships: [
          { id: "r1", target: "NLP", type: "used_for" },
          { id: "r2", target: "Attention Mechanism", type: "uses" },
          { id: "r3", target: "RNN", type: "replaces" },
          { id: "r4", target: "Parallelization", type: "enables" },
          { id: "r5", target: "Training Efficiency", type: "improves" },
        ],
        newConceptsLearned: [
          "Self-Attention",
          "Parallelization",
          "Training Efficiency",
        ],
        confidenceScore: 94,
      },
    ],
  },
};

export const MOCK_EVOLUTION_DATA: EvolutionDataPoint[] = Array.from({
  length: 30,
}).map((_, i) => {
  const daysAgo = 30 - i;
  return {
    date: new Date(now - oneDay * daysAgo).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    memoryCount: 10 + i * 4 + Math.floor(Math.random() * 5),
    relationshipCount: 15 + i * 8 + Math.floor(Math.random() * 10),
    aiConfidence: Math.min(100, 40 + i * 1.8 + Math.floor(Math.random() * 5)),
    knowledgeGrowthPercentage: 2 + i * 0.5,
  };
});

export const MOCK_STATS: TimelineStats = {
  totalMemories: 145,
  timelineEvents: 342,
  evolutionCount: 89,
  averageConfidence: 87.4,
  restoredVersions: 12,
  forgottenMemories: 4,
};
