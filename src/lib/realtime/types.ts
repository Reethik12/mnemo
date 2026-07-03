export type RealtimeEventType =
  | "MemoryCreated"
  | "MemoryUpdated"
  | "MemoryDeleted"
  | "ConversationCreated"
  | "ConversationUpdated"
  | "PromptUpdated"
  | "ProviderChanged"
  | "WorkspaceUpdated"
  | "NotificationCreated"
  | "UserJoined"
  | "UserLeft"
  | "PresenceUpdated";

export interface RealtimeEventPayloads {
  MemoryCreated: { id: string; workspaceId: string; title: string };
  MemoryUpdated: { id: string; workspaceId: string; title: string };
  MemoryDeleted: { id: string; workspaceId: string };
  ConversationCreated: { id: string; workspaceId: string; title: string };
  ConversationUpdated: { id: string; workspaceId: string; title: string };
  PromptUpdated: { id: string; workspaceId: string; title: string };
  ProviderChanged: { id: string };
  WorkspaceUpdated: { id: string; name: string };
  NotificationCreated: { id: string; userId: string; title: string };
  UserJoined: { userId: string; name: string; workspaceId: string };
  UserLeft: { userId: string; workspaceId: string };
  PresenceUpdated: { workspaceId: string; users: PresenceUser[] };
}

export interface PresenceUser {
  userId: string;
  name: string;
  avatar?: string | null;
  currentPage: string;
  editingStatus: "idle" | "editing" | "viewing";
  lastActive: string;
  isIdle: boolean;
}

export interface RealtimeEvent<
  T extends RealtimeEventType = RealtimeEventType,
> {
  type: T;
  workspaceId: string;
  payload: RealtimeEventPayloads[T];
  timestamp: string;
}

export type RealtimeCallback<T extends RealtimeEventType> = (
  event: RealtimeEvent<T>,
) => void;
