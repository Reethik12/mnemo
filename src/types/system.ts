import { ReactNode } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

export interface WorkspaceState {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
}

export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string[];
  action: () => void;
  section?: string;
}

export interface OfflineState {
  isOffline: boolean;
  lastSyncAt: string | null;
  pendingChanges: number;
}

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  action: () => void;
  divider?: boolean;
}
