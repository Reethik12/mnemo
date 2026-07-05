import { getCollectionDetails } from "./collection.service";

export async function shareCollection(
  collectionId: string,
  type: "public" | "private" | "organization",
): Promise<{ success: boolean; link: string; message: string }> {
  const collection = await getCollectionDetails(collectionId);
  if (!collection) {
    throw new Error("Collection not found");
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mnemo.app";
  const link = `${baseUrl}/exchange/c/${collectionId}`;

  return {
    success: true,
    link,
    message: `Share link generated for "${collection.title}". Access level: ${type}`,
  };
}
