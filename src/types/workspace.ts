/**
 * Workspace type definitions.
 */

export interface Workspace {
  id: string;
  name: string;
  plan: "free" | "pro" | "enterprise";
  memberSince: string;
}
