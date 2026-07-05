import type { MemoryCollection } from "./types";
import { MOCK_COLLECTIONS } from "./mock-data";

/**
 * Retrieves the main feed of collections for the Memory Exchange.
 */
export async function getExchangeFeed(): Promise<{
  trending: MemoryCollection[];
  featured: MemoryCollection[];
  recent: MemoryCollection[];
}> {
  // In a real scenario, this would query a central database of published datasets.
  // For the hackathon, we simulate the community library via robust mock data.

  const trending = MOCK_COLLECTIONS.filter((c) => c.isTrending).sort(
    (a, b) => b.views - a.views,
  );
  const featured = MOCK_COLLECTIONS.filter((c) => c.isFeatured);
  const recent = [...MOCK_COLLECTIONS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return {
    trending,
    featured,
    recent,
  };
}
