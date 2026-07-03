export type APIKeyScope = "READ_ONLY" | "FULL_ACCESS";

export interface APIKey {
  id: string;
  workspaceId: string;
  key: string;
  name: string;
  scope: APIKeyScope;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformPlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  billingPlan: "FREE" | "PRO" | "ENTERPRISE";
  createdAt: string;
  updatedAt: string;
}
