/**
 * Shared UI Components
 * Exporting all UI components for easy imports across the application.
 */

// Phase 1 Components (Base)
export { Button } from "./ui/button";
export { Card } from "./ui/card";
export { Input } from "./ui/input";
export { Modal } from "./ui/modal";
export { Dropdown } from "./ui/dropdown";
export { Tooltip } from "./ui/tooltip";
export { Skeleton } from "./ui/skeleton";
export { LoadingIndicator } from "./ui/loading-indicator";

// Phase 2 Components (Auth)
export { AuthCard } from "./auth/auth-card";
export { SocialLoginButtons } from "./auth/social-login-buttons";
export { AuthDivider } from "./auth/auth-divider";
export { PasswordInput } from "./auth/password-input";
export { PasswordStrength } from "./auth/password-strength";
export { VerificationCodeInput } from "./auth/verification-code-input";

// Phase 2 Components (Workspace)
export { Sidebar } from "./workspace/sidebar";
export { SidebarItem } from "./workspace/sidebar-item";
export { SidebarSection } from "./workspace/sidebar-section";
export { TopNav } from "./workspace/top-nav";
export { WorkspaceShell } from "./workspace/workspace-shell";
export { WorkspaceSwitcher } from "./workspace/workspace-switcher";
export { CommandCenter } from "./workspace/command-center";
export { QuickLaunch } from "./workspace/quick-launch";

// Phase 2 Components (Dashboard)
export { WelcomeBanner } from "./dashboard/welcome-banner";
export { StatsCard } from "./dashboard/stats-card";
export { ModuleCard } from "./dashboard/module-card";
export { QuickActionCard } from "./dashboard/quick-action-card";
export { RecentActivity } from "./dashboard/recent-activity";

// Phase 2 Components (Shared)
export { ProtectedRoute } from "./shared/protected-route";
export { EmptyState } from "./shared/empty-state";
export { ComingSoonBadge } from "./shared/coming-soon-badge";
export { SectionHeader } from "./shared/section-header";
export { GlassContainer } from "./shared/glass-container";
export { StatusPill } from "./shared/status-pill";
export { ContextMenu } from "./shared/context-menu";
export { LoadingOverlay } from "./shared/loading-overlay";
export { OfflineBanner } from "./shared/offline-banner";
export { ErrorScreen } from "./shared/error-screen";

// Phase 3 Components (Memory Workspace)
export { MemoryList } from "./memory/memory-list";
export { MemoryItem } from "./memory/memory-item";
export { MemoryToolbar } from "./memory/memory-toolbar";
export { MemoryEditor } from "./memory/memory-editor";
export { MemoryInspector } from "./memory/memory-inspector";
export { MemoryEmptyState } from "./memory/memory-empty-state";
export { MemoryLoading } from "./memory/memory-loading";
export { MemoryFilterDropdown } from "./memory/memory-filter";
export { MemorySortDropdown } from "./memory/memory-sort";
export { MemoryActions } from "./memory/memory-actions";
export { MemoryDeleteDialog } from "./memory/memory-delete-dialog";
export { BulkActionsBar } from "./memory/bulk-actions-bar";
export * from "./memory/view-switcher";
export { EditorTabs } from "./memory/editor-tabs";
export { EditorHeader } from "./memory/editor-header";
export { EditorStatusBar } from "./memory/editor-status-bar";
