import { ChatMessage } from "./ai";

export type ConversationStatus = "active" | "archived" | "deleted";
export type ConversationVisibility = "private" | "workspace" | "shared";
export type ConversationSort =
  | "updatedDesc"
  | "updatedAsc"
  | "createdDesc"
  | "createdAsc"
  | "titleAsc"
  | "titleDesc";

export interface ConversationFolder {
  readonly id: string;
  readonly name: string;
  readonly color?: string;
  readonly parentId?: string;
  readonly order: number;
}

export interface ConversationCategory {
  readonly id: string;
  readonly name: string;
  readonly icon?: string;
}

export interface ConversationSummary {
  readonly id: string;
  readonly title: string;
  readonly updatedAt: string;
  readonly folderId?: string;
  readonly categoryId?: string;
  readonly isPinned: boolean;
  readonly isFavorite: boolean;
  readonly status: ConversationStatus;
  readonly modelId: string;
  readonly messageCount?: number;
}

export interface Conversation extends ConversationSummary {
  readonly messages: readonly ChatMessage[];
  readonly createdAt: string;
  readonly visibility: ConversationVisibility;
  readonly systemPrompt?: string;
  readonly metadata?: Record<string, unknown>;
}

export interface ConversationWorkspace {
  readonly activeFolderId?: string;
  readonly viewMode: "list" | "grid" | "compact";
}

export interface ConversationStatistics {
  readonly totalConversations: number;
  readonly archivedConversations: number;
  readonly pinnedConversations: number;
  readonly favoriteConversations: number;
  readonly recentConversations: number;
  readonly averageLength: number;
  readonly averageMessages: number;
}

export interface ConversationSearch {
  readonly query: string;
  readonly results: readonly ConversationSummary[];
  readonly isSearching: boolean;
}

export interface ConversationFilter {
  readonly isPinned?: boolean;
  readonly isFavorite?: boolean;
  readonly status?: ConversationStatus;
  readonly folderId?: string;
  readonly categoryId?: string;
  readonly dateRange?: "today" | "this-week" | "this-month" | "all";
}

export interface ConversationFavorite {
  readonly conversationId: string;
  readonly addedAt: string;
}

export interface ConversationPinned {
  readonly conversationId: string;
  readonly pinnedAt: string;
}

export interface ConversationArchive {
  readonly conversationId: string;
  readonly archivedAt: string;
}

export interface ConversationHistory {
  readonly items: readonly ConversationSummary[];
  readonly lastOpenedId?: string;
}

export interface ConversationSelection {
  readonly selectedIds: readonly string[];
  readonly isMultiSelect: boolean;
}
