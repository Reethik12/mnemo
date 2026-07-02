import {
  SemanticSearchResult,
  SemanticCluster,
  IntelligenceInsight,
  SearchHistoryItem,
  IntelligenceStatistics,
} from "@/types/intelligence";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_SUGGESTED_SEARCHES = [
  "React performance optimization",
  "Machine learning models 2026",
  "TypeScript advanced types",
  "Design system best practices",
  "Knowledge graph architectures",
];

const MOCK_RECENT_SEARCHES: SearchHistoryItem[] = [
  {
    id: "sh-1",
    query: "semantic search implementation",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    resultCount: 12,
  },
  {
    id: "sh-2",
    query: "local LLMs",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    resultCount: 45,
  },
  {
    id: "sh-3",
    query: "vector databases",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    resultCount: 8,
  },
];

const MOCK_CLUSTERS: SemanticCluster[] = [
  {
    id: "sc-1",
    name: "Frontend Architecture",
    description: "Patterns for large scale web apps",
    keywords: ["react", "state", "components"],
    memoryCount: 156,
    relevanceScore: 0.92,
  },
  {
    id: "sc-2",
    name: "AI Integration",
    description: "Adding intelligence to applications",
    keywords: ["llm", "embeddings", "rag"],
    memoryCount: 84,
    relevanceScore: 0.88,
  },
  {
    id: "sc-3",
    name: "System Design",
    description: "Backend and infrastructure",
    keywords: ["database", "api", "scaling"],
    memoryCount: 112,
    relevanceScore: 0.75,
  },
];

const MOCK_INSIGHTS: IntelligenceInsight[] = [
  {
    id: "ii-1",
    title: "Emerging Trend: Edge AI",
    description:
      "You've saved 5 memories about Edge AI this week, indicating a growing interest.",
    type: "trend",
    confidenceScore: 0.89,
    relatedMemoryIds: ["m1", "m2"],
  },
  {
    id: "ii-2",
    title: "Knowledge Gap: Testing",
    description:
      "Your frontend architecture cluster lacks memories regarding end-to-end testing.",
    type: "gap",
    confidenceScore: 0.76,
    relatedMemoryIds: [],
  },
  {
    id: "ii-3",
    title: "Hidden Connection",
    description:
      "Your notes on 'Local LLMs' strongly relate to 'Privacy-First Architecture'.",
    type: "connection",
    confidenceScore: 0.94,
    relatedMemoryIds: ["m3", "m4"],
  },
];

const generateMockResults = (query: string): SemanticSearchResult[] => {
  if (!query) return [];
  const count = Math.floor(Math.random() * 8) + 2; // 2 to 9 results
  return Array.from({ length: count }, (_, i) => ({
    id: `sr-${Date.now()}-${i}`,
    memoryId: `mem-${Math.floor(Math.random() * 1000)}`,
    title: `Result ${i + 1} for "${query}"`,
    excerpt: `This is a semantically matched excerpt from a memory that closely aligns with the query "${query}". It demonstrates contextual understanding.`,
    relevanceScore: 0.98 - i * 0.05,
    matchReason: i === 0 ? "Exact semantic match" : "Related concept",
    type: ["Concept", "Journal", "Code Snippet", "Article"][i % 4],
    tags: ["AI", "Architecture", "Learning"].slice(0, (i % 3) + 1),
  }));
};

export class IntelligenceService {
  static async search(query: string): Promise<SemanticSearchResult[]> {
    await delay(800); // Simulate network/processing delay for semantic search
    return generateMockResults(query);
  }

  static async getRecentSearches(): Promise<SearchHistoryItem[]> {
    await delay(300);
    return [...MOCK_RECENT_SEARCHES];
  }

  static async getSuggestedSearches(): Promise<string[]> {
    await delay(300);
    return [...MOCK_SUGGESTED_SEARCHES];
  }

  static async getClusters(): Promise<SemanticCluster[]> {
    await delay(400);
    return [...MOCK_CLUSTERS];
  }

  static async getInsights(): Promise<IntelligenceInsight[]> {
    await delay(500);
    return [...MOCK_INSIGHTS];
  }

  static async getStatistics(): Promise<IntelligenceStatistics> {
    await delay(300);
    return {
      totalSearches: 1245,
      averageRelevance: 0.86,
      activeClusters: MOCK_CLUSTERS.length,
      insightsGenerated: MOCK_INSIGHTS.length * 15, // fake historical data
      trendingTopics: ["Local AI", "Vector Search", "Memory Fabric"],
      healthStatus: "Optimal",
    };
  }

  static async addSearchToHistory(
    query: string,
    resultCount: number,
  ): Promise<void> {
    const newItem: SearchHistoryItem = {
      id: `sh-${Date.now()}`,
      query,
      timestamp: new Date().toISOString(),
      resultCount,
    };
    MOCK_RECENT_SEARCHES.unshift(newItem);
    if (MOCK_RECENT_SEARCHES.length > 10) MOCK_RECENT_SEARCHES.pop();
  }
}
