import { getCollectionDetails } from "./collection.service";
import { getShareUrl } from "@/lib/url";

export async function shareCollection(
  collectionId: string,
  type: "public" | "private" | "organization",
): Promise<{ success: boolean; link: string; message: string }> {
  const collection = await getCollectionDetails(collectionId);
  if (!collection) {
    throw new Error("Collection not found");
  }

  const link = getShareUrl(`exchange/c/${collectionId}`);

  return {
    success: true,
    link,
    message: `Share link generated for "${collection.title}". Access level: ${type}`,
  };
}
