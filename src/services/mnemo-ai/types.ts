export interface MnemoChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
  isTyping?: boolean;
}

export interface SearchResult {
  id: string;
  module: "fabric" | "intelligence" | "exchange" | "timeline" | "permissions";
  title: string;
  snippet: string;
  url: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type:
    | "access_request"
    | "permission_approved"
    | "memory_improved"
    | "timeline_updated"
    | "system";
  isRead: boolean;
  timestamp: string;
}
