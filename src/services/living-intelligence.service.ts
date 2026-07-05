import { cogneeFetch } from "@/lib/cognee";
import { recallAllMemories } from "@/services/memory.service";
import type { IntelligenceData } from "./living-intelligence/types";
import {
  extractPatterns,
  getMockPatterns,
} from "./living-intelligence/pattern.service";
import {
  extractInsights,
  extractTrendingTopics,
  extractRelationships,
  getMockInsights,
  getMockTrendingTopics,
  getMockRelationships,
} from "./living-intelligence/insight.service";
import {
  generateRecommendations,
  getMockRecommendations,
} from "./living-intelligence/recommendation.service";
import {
  calculateStatistics,
  getMockStatistics,
} from "./living-intelligence/statistics.service";

/**
 * Trigger Cognee to improve the graph based on stored memories.
 * We gracefully handle errors and fail silently to not block the UI.
 */
export async function triggerImprovement(
  datasetName: string = "mnemo",
): Promise<void> {
  try {
    console.log(
      `[LIVING INTELLIGENCE] Triggering graph improvement for dataset: ${datasetName}`,
    );
    // Cognee SDK uses POST for operations.
    await cogneeFetch("/api/v1/improve", {
      method: "POST",
      body: JSON.stringify({ dataset: datasetName }),
    });
  } catch (err) {
    console.warn(
      "[LIVING INTELLIGENCE] Failed to trigger improve() via HTTP. It may not be supported or available.",
      err,
    );
  }
}

/**
 * Orchestrates the full generation of Living Intelligence data.
 * Tries to fetch data from Cognee Cloud using recallAllMemories().
 * If none exist or Cognee fails, switches to mock data instantly.
 */
export async function getLivingIntelligenceData(): Promise<IntelligenceData> {
  try {
    const memories = await recallAllMemories();

    // If no memories were returned (e.g., failed to connect or empty dataset), fallback to mock mode immediately.
    if (!memories || memories.length === 0) {
      console.log(
        "[LIVING INTELLIGENCE] No memories returned or Cognee unavailable. Falling back to Mock Mode.",
      );
      return getMockIntelligenceData();
    }

    console.log(
      `[LIVING INTELLIGENCE] Successfully recalled ${memories.length} memories. Generating insights.`,
    );

    const { score, growth } = calculateStatistics(memories);

    return {
      score,
      growth,
      patterns: extractPatterns(memories),
      insights: extractInsights(memories),
      trendingTopics: extractTrendingTopics(memories),
      relationships: extractRelationships(memories),
      recommendations: generateRecommendations(memories),
    };
  } catch (error) {
    console.error(
      "[LIVING INTELLIGENCE] Error generating intelligence. Falling back to Mock Mode.",
      error,
    );
    return getMockIntelligenceData();
  }
}

/**
 * Complete set of realistic fallback mock data explicitly requested for the Hackathon.
 */
function getMockIntelligenceData(): IntelligenceData {
  const { score, growth } = getMockStatistics();
  return {
    score,
    growth,
    patterns: getMockPatterns(),
    insights: getMockInsights(),
    trendingTopics: getMockTrendingTopics(),
    relationships: getMockRelationships(),
    recommendations: getMockRecommendations(),
  };
}
