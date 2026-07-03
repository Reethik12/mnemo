/**
 * Shared TypeScript type definitions for the Mnemo application.
 */

// ─── User & Workspace ──────────────────────────────
export type { User } from "./user";
export type { Workspace } from "./workspace";

// ─── Authentication ─────────────────────────────────
export type {
  AuthState,
  LoginCredentials,
  RegisterData,
  AuthProviderType,
} from "./auth";

// ─── Notifications ──────────────────────────────────
export type { Notification, NotificationType } from "./notification";

// ─── Navigation ─────────────────────────────────────
export type { SidebarItem, SidebarSection, BreadcrumbItem } from "./navigation";

// ─── Theme ──────────────────────────────────────────
export type { Theme, ThemeState } from "./theme";

// ─── Memory ─────────────────────────────────────────
export type {
  Memory,
  MemoryCategory,
  MemoryStatus,
  MemoryFilter,
  MemorySort,
} from "./memory";

// ─── System ─────────────────────────────────────────
export * from "./system";
export * from "./agent";
export * from "./planner";
export * from "./orchestrator";
export * from "./decision";
export * from "./platform";
