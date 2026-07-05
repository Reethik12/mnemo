import { cogneeFetch } from "@/lib/cognee";

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
 * Uses the official REST API `/api/v1/add` followed by `/api/v1/cognify`.
 */
export async function rememberMemory(
  input: MemoryInput,
  datasetName: string = "mnemo_fabric",
) {
  const formattedText = `
Title: ${input.title}
Category: ${input.category}
Tags: ${input.tags.join(", ")}
Source: ${input.source || "Manual Entry"}

Content:
${input.content}
  `.trim();

  // 1. Add data to dataset
  await cogneeFetch("/api/v1/add", {
    method: "POST",
    body: JSON.stringify({
      data: [{ type: "text", text: formattedText }],
      dataset_name: datasetName,
    }),
  });

  // 2. Cognify the dataset
  return await cogneeFetch("/api/v1/cognify", {
    method: "POST",
    body: JSON.stringify({
      datasets: [datasetName],
    }),
  });
}

/**
 * Retrieve memories from Cognee Cloud using semantic search REST API.
 */
export async function searchMemory(
  query: string,
  _datasetName: string = "mnemo_fabric",
): Promise<MemorySearchResult[]> {
  const response = await cogneeFetch("/api/v1/search", {
    method: "POST",
    body: JSON.stringify({
      query_text: query,
      query_type: "SUMMARIES",
    }),
  });

  const results: MemorySearchResult[] = [];

  if (!response) return results;

  // Adapt based on standard Cognee REST responses
  // Sometimes it returns a direct array, or a wrapper object.
  const data = Array.isArray(response)
    ? response
    : response.results || response.data || [];

  for (const item of data) {
    results.push({
      id: item.id || Math.random().toString(36).substring(7),
      text:
        typeof item === "string"
          ? item
          : item.text || item.payload
            ? JSON.stringify(item.payload)
            : JSON.stringify(item),
      similarityScore: item.score ?? undefined,
    });
  }

  return results;
}

/**
 * Retrieve a broad set of recent memories from Cognee.
 * Uses `/api/v1/datasets/{datasetName}/data` endpoint.
 */
export async function recallAllMemories(
  _datasetName: string = "mnemo_fabric",
): Promise<MemorySearchResult[]> {
  try {
    const dataItems = await cogneeFetch(
      `/api/v1/datasets/${_datasetName}/data`,
      {
        method: "GET",
      },
    );

    const items = Array.isArray(dataItems) ? dataItems : dataItems.data || [];

    return items.map((item: Record<string, unknown>) => ({
      id: item.id || Math.random().toString(36).substring(7),
      text: item.name || item.text || JSON.stringify(item),
    }));
  } catch (err) {
    console.error("Failed to list dataset data in Cognee via HTTP:", err);
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
