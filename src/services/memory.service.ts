import { getCognee } from "@/lib/cognee";

export interface MemoryInput {
  title: string;
  content: string;
  tags: string[];
  category: string;
  source?: string;
}

export interface MemorySearchResult {
  id: string;
  text: string;
  similarityScore?: number;
}

/**
 * Persist a new memory to Cognee Cloud.
 * Uses the official `remember()` which handles add, cognify, and memify natively.
 */
export async function rememberMemory(
  input: MemoryInput,
  datasetName: string = "mnemo_fabric",
) {
  const cognee = await getCognee();

  // Format the input into a clean string so Cognee's LLM pipeline can accurately
  // extract nodes and relationships (since it accepts text/file/url).
  const formattedText = `
Title: ${input.title}
Category: ${input.category}
Tags: ${input.tags.join(", ")}
Source: ${input.source || "Manual Entry"}

Content:
${input.content}
  `.trim();

  // `remember()` is the high-level API in Cognee for ingestion + graph generation
  return await cognee.remember(
    {
      type: "text",
      text: formattedText,
    },
    datasetName,
  );
}

/**
 * Retrieve memories from Cognee Cloud using a semantic query.
 */
export async function searchMemory(
  query: string,
  _datasetName: string = "mnemo_fabric",
): Promise<MemorySearchResult[]> {
  const cognee = await getCognee();

  // `search()` uses semantic/graph search on the given query.
  // Using SUMMARIES search type to find high-level graph summaries or chunks.
  const response = await cognee.search(query, {
    searchType: "SUMMARIES",
  });

  const results: MemorySearchResult[] = [];

  // Parse the search response safely.
  const result = response.result;
  if (!result) return results;

  if (result.kind === "Items") {
    for (const item of result.data) {
      results.push({
        id: item.id || Math.random().toString(36).substring(7),
        text: JSON.stringify(item.payload),
        similarityScore: item.score ?? undefined,
      });
    }
  } else if (result.kind === "Texts") {
    for (const msg of result.data) {
      results.push({
        id: Math.random().toString(36).substring(7),
        text: msg,
      });
    }
  } else if (result.kind === "Text") {
    results.push({
      id: Math.random().toString(36).substring(7),
      text: result.data,
    });
  }

  return results;
}

/**
 * Retrieve a broad set of recent memories from Cognee.
 * Since the SDK doesn't have a direct "list all graph nodes" function explicitly,
 * we use `datasets.listData` to show raw ingested texts if graph search isn't requested,
 * OR we can just run an empty semantic search.
 */
export async function recallAllMemories(
  _datasetName: string = "mnemo_fabric",
): Promise<MemorySearchResult[]> {
  const cognee = await getCognee();

  // For a complete list of ingested raw data items:
  try {
    const dataItems = await cognee.datasets.listData(_datasetName);
    return dataItems.map((item) => ({
      id: item.id,
      text: item.name || "Untitled Item",
    }));
  } catch (err) {
    console.error("Failed to list dataset data in Cognee:", err);
    return [];
  }
}

/**
 * Ingest mock external data into Cognee as if it were a real pipeline.
 * This guarantees the UI only shows data after Cognee has parsed it.
 */
export async function importMemory(
  mockSourceType: string,
  mockContent: string,
): Promise<void> {
  await rememberMemory({
    title: `Imported from ${mockSourceType}`,
    content: mockContent,
    tags: [mockSourceType, "imported"],
    category: "External Import",
    source: mockSourceType,
  });
}
