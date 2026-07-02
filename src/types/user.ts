/**
 * User type definitions.
 */

import type { Workspace } from "./workspace";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  workspace: Workspace;
  plan: "free" | "pro" | "enterprise";
  createdAt: string;
}
