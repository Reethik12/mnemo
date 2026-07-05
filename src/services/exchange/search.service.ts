import type { MemoryCollection } from "./types";
import { MOCK_COLLECTIONS } from "./mock-data";

export async function searchCollections(
  query: string,
): Promise<MemoryCollection[]> {
  const q = query.toLowerCase();

  return MOCK_COLLECTIONS.filter((c) => {
    return (
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.author.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
}
