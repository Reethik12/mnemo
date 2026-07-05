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
 * Ensures the target dataset exists in Cognee Cloud and returns its dataset_id.
 */
async function getOrCreateDataset(datasetName: string): Promise<string> {
  console.log(`[SERVICE] getOrCreateDataset called for: ${datasetName}`);
  const response = await cogneeFetch("/api/v1/datasets/", {
    method: "POST",
    body: JSON.stringify({ name: datasetName }),
  });
  console.log(`[SERVICE] getOrCreateDataset returned ID: ${response.id}`);
  return response.id;
}

/**
 * Persist a new memory to Cognee Cloud.
 * Uses the official REST API `/api/v1/add` (FormData) followed by `/api/v1/cognify`.
 */
export async function rememberMemory(
  input: MemoryInput,
  datasetName: string = "mnemo",
) {
  const formattedText = `
Title: ${input.title}
Category: ${input.category}
Tags: ${input.tags.join(", ")}
Source: ${input.source || "Manual Entry"}

Content:
${input.content}
  `.trim();

  console.log(`[SERVICE] rememberMemory called for title: ${input.title}`);

  // 1. Resolve datasetId
  const datasetId = await getOrCreateDataset(datasetName);

  // 2. Add data to dataset via FormData (UploadFile)
  const formData = new FormData();

  // We use a Blob to simulate a text file upload
  const blob = new Blob([formattedText], { type: "text/plain" });
  formData.append(
    "data",
    blob,
    `${input.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "memory"}.txt`,
  );

  // As per official specification, datasetId goes into the FormData payload
  formData.append("datasetId", datasetId);

  console.log(`[SERVICE] Sending FormData to /api/v1/add`);
  await cogneeFetch("/api/v1/add", {
    method: "POST",
    body: formData as unknown as BodyInit,
  });
  console.log(`[SERVICE] /api/v1/add completed`);

  // 3. Cognify the dataset
  console.log(
    `[SERVICE] Calling /api/v1/cognify for dataset_ids: [${datasetId}]`,
  );
  const cognifyRes = await cogneeFetch("/api/v1/cognify", {
    method: "POST",
    body: JSON.stringify({
      dataset_ids: [datasetId],
    }),
  });
  console.log(`[SERVICE] /api/v1/cognify completed:`, cognifyRes);
  return cognifyRes;
}

/**
 * Retrieve memories from Cognee Cloud using semantic search REST API.
 */
export async function searchMemory(
  query: string,
  _datasetName: string = "mnemo",
): Promise<MemorySearchResult[]> {
  console.log(`[SERVICE] searchMemory called with query: "${query}"`);
  const response = await cogneeFetch("/api/v1/search", {
    method: "POST",
    body: JSON.stringify({
      query: query,
      searchType: "SUMMARIES",
      datasets: [_datasetName],
    }),
  });
  console.log(
    `[SERVICE] searchMemory response:`,
    JSON.stringify(response).slice(0, 500) + "...",
  );

  const results: MemorySearchResult[] = [];

  if (!response) return results;

  // Adapt based on standard Cognee REST responses
  const data = Array.isArray(response)
    ? response
    : response.results || response.data || [];

  for (const item of data) {
    if (item && typeof item === "object" && Array.isArray(item.search_result)) {
      for (const res of item.search_result) {
        results.push({
          id: res.id || Math.random().toString(36).substring(7),
          text: res.text || JSON.stringify(res),
          similarityScore:
            res.similarityScore || res.score || res.feedback_weight,
        });
      }
    } else {
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
  }

  return results;
}

/**
 * Retrieve a broad set of recent memories from Cognee.
 * Uses `/api/v1/datasets/{datasetName}/data` endpoint.
 */
export async function recallAllMemories(
  _datasetName: string = "mnemo",
): Promise<MemorySearchResult[]> {
  try {
    const datasetId = await getOrCreateDataset(_datasetName);
    const dataItems = await cogneeFetch(`/api/v1/datasets/${datasetId}/data`, {
      method: "GET",
    });

    const items = Array.isArray(dataItems) ? dataItems : dataItems.data || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.map((item: any) => ({
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
  console.log(`[SERVICE] importMemory called for ${mockSourceType}`);
  await rememberMemory({
    title: `Imported from ${mockSourceType}`,
    content: mockContent,
    tags: [mockSourceType, "imported"],
    category: "External Import",
    source: mockSourceType,
  });
  console.log(`[SERVICE] importMemory completed for ${mockSourceType}`);
}
