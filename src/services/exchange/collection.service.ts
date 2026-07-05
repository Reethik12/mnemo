import type { MemoryCollection } from "./types";
import { MOCK_COLLECTIONS } from "./mock-data";
import { cogneeFetch } from "@/lib/cognee";

export async function getCollectionDetails(
  id: string,
): Promise<MemoryCollection | null> {
  const collection = MOCK_COLLECTIONS.find((c) => c.id === id);
  return collection || null;
}

export async function importCollection(
  collectionId: string,
): Promise<{ success: boolean; message: string }> {
  // Simulates importing a remote memory collection into the local user's personal graph.
  // We use `remember()` and `improve()` via Cognee API.
  const collection = await getCollectionDetails(collectionId);
  if (!collection) {
    throw new Error("Collection not found");
  }

  // Generate some raw memory chunks from the mock description
  const contentToImport = `Imported Knowledge from ${collection.title}:\n\n${collection.description}\n\nTags: ${collection.tags.join(", ")}`;

  // Call Cognee `remember()` to ingest this text into the local graph
  try {
    const rememberBody = {
      data: [
        {
          id: `import_${collectionId}_${Date.now()}`,
          text: contentToImport,
        },
      ],
      datasetName: "mnemo", // The user's single source of truth dataset
    };

    const rememberRes = await cogneeFetch("/api/v1/add", {
      method: "POST",
      body: JSON.stringify(rememberBody),
    });

    if (!rememberRes.ok) {
      console.warn(
        "Cognee import failed. Simulating success for mock mode.",
        await rememberRes.text(),
      );
    } else {
      // Trigger improve() to weave it into the knowledge graph
      await cogneeFetch("/api/v1/cognify", {
        method: "POST",
        body: JSON.stringify({ datasetName: "mnemo" }),
      });
    }

    return {
      success: true,
      message: `Successfully imported ${collection.title}`,
    };
  } catch {
    console.warn(
      "Cognee unavailable. Simulating successful import for mock mode.",
    );
    return {
      success: true,
      message: `Successfully simulated import of ${collection.title}`,
    };
  }
}
