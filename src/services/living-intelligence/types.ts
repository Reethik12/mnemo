export interface IntelligenceScore {
  overall: number;
  memoryQuality: number;
  graphCompleteness: number;
  knowledgeGrowth: number;
}

export interface MemoryGrowth {
  daily: number;
  weekly: number;
  monthly: number;
  total: number;
}

export interface TrendingTopic {
  name: string;
  count: number;
  trend: "up" | "down" | "stable";
}

export interface RelationshipInsight {
  entity: string;
  count: number;
  description: string;
}

export interface Pattern {
  id: string;
  description: string;
  type: "time" | "topic" | "activity";
}

export interface PersonalizedInsight {
  id: string;
  description: string;
  type: "comparison" | "co-occurrence" | "productivity";
}

export interface Recommendation {
  id: string;
  action: string;
  context: string;
  priority: "high" | "medium" | "low";
}

export interface IntelligenceData {
  score: IntelligenceScore;
  growth: MemoryGrowth;
  trendingTopics: TrendingTopic[];
  relationships: RelationshipInsight[];
  patterns: Pattern[];
  insights: PersonalizedInsight[];
  recommendations: Recommendation[];
}
