import type { PermissionNode } from "./types";
import { getCollectionDetails } from "./collection.service";

export async function getCollectionPermissions(
  collectionId: string,
): Promise<PermissionNode[]> {
  const collection = await getCollectionDetails(collectionId);
  if (!collection) throw new Error("Collection not found");

  // Mock returning some permissions
  return [
    { userId: collection.author, role: "owner" },
    { userId: "user_collab_1", role: "editor" },
    { userId: "user_viewer_2", role: "viewer" },
  ];
}
