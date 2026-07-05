import { getCollectionDetails } from "./collection.service";

export async function forkCollection(
  collectionId: string,
): Promise<{ success: boolean; newId: string; message: string }> {
  const collection = await getCollectionDetails(collectionId);
  if (!collection) {
    throw new Error("Collection not found");
  }

  // Simulate creating a duplicate personal copy of this collection
  const newId = `col_fork_${Date.now()}`;
  return {
    success: true,
    newId,
    message: `Successfully forked "${collection.title}" to your library.`,
  };
}
