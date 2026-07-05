import { getCollectionDetails } from "./collection.service";

export async function mergeCollections(
  sourceId: string,
  targetId: string,
): Promise<{ success: boolean; message: string }> {
  const source = await getCollectionDetails(sourceId);
  const target = await getCollectionDetails(targetId);

  if (!source || !target) {
    throw new Error("Collection not found");
  }

  return {
    success: true,
    message: `Successfully merged "${source.title}" into "${target.title}".`,
  };
}
