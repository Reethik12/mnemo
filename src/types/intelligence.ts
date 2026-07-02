export interface SemanticSearchResult {
  id: string;
  memoryId: string;
  title: string;
  excerpt: string;
  relevanceScore: number; // 0.0 to 1.0
  matchReason: string;
  type: string;
  tags: string[];
}

export interface SemanticCluster {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  memoryCount: number;
  relevanceScore: number;
}

export interface IntelligenceInsight {
  id: string;
  title: string;
  description: string;
  type: "trend" | "gap" | "connection" | "anomaly";
  confidenceScore: number;
  relatedMemoryIds: string[];
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  resultCount: number;
}

export interface SearchSession {
  id: string;
  startTime: string;
  endTime?: string;
  queries: SearchHistoryItem[];
}

export interface IntelligenceStatistics {
  totalSearches: number;
  averageRelevance: number;
  activeClusters: number;
  insightsGenerated: number;
  trendingTopics: string[];
  healthStatus: "Optimal" | "Learning" | "Processing" | "Degraded";
}

export interface IntelligenceContext {
  searchQuery: string;
  isSearching: boolean;
  searchResults: SemanticSearchResult[];
  recentSearches: SearchHistoryItem[];
  suggestedSearches: string[];
  clusters: SemanticCluster[];
  insights: IntelligenceInsight[];
  statistics: IntelligenceStatistics | null;
}
