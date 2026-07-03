import {
  type RealtimeEventType,
  type RealtimeEvent,
  type RealtimeCallback,
} from "./types";

export class RealtimeClient {
  private eventSource: EventSource | null = null;
  private listeners: Map<string, Set<(event: RealtimeEvent) => void>> =
    new Map();
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private reconnectInterval = 1000;

  constructor(
    private workspaceId: string,
    private userId: string,
  ) {}

  /**
   * Connect to the workspace SSE stream
   */
  connect(): void {
    if (this.eventSource) return;

    const url = `/api/realtime/connect?workspaceId=${this.workspaceId}&userId=${this.userId}`;
    this.eventSource = new EventSource(url);

    this.eventSource.onmessage = (event) => {
      try {
        const parsed: RealtimeEvent = JSON.parse(event.data);
        this.trigger(parsed);
      } catch (err) {
        console.error("[RealtimeClient] Failed to parse message", err);
      }
    };

    this.eventSource.onerror = () => {
      console.warn("[RealtimeClient] Connection error, scheduling reconnect");
      this.disconnect();
      this.scheduleReconnect();
    };
  }

  /**
   * Disconnect from SSE stream
   */
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  private scheduleReconnect(): void {
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectInterval = Math.min(this.reconnectInterval * 2, 30000); // capped backoff at 30s
      this.connect();
    }, this.reconnectInterval);
  }

  /**
   * Subscribe to specific event types
   */
  subscribe<T extends RealtimeEventType>(
    type: T,
    cb: RealtimeCallback<T>,
  ): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners
      .get(type)!
      .add(cb as unknown as (event: RealtimeEvent) => void);

    // Unsubscribe handle
    return () => {
      const list = this.listeners.get(type);
      if (list) {
        list.delete(cb as unknown as (event: RealtimeEvent) => void);
        if (list.size === 0) {
          this.listeners.delete(type);
        }
      }
    };
  }

  private trigger(event: RealtimeEvent): void {
    const list = this.listeners.get(event.type);
    if (list) {
      list.forEach((cb) => {
        try {
          cb(event);
        } catch (err) {
          console.error(
            `[RealtimeClient] Listener error on ${event.type}`,
            err,
          );
        }
      });
    }
  }

  /**
   * Publish events back to other clients (uses HTTP POST endpoint)
   */
  static async publish<T extends RealtimeEventType>(
    workspaceId: string,
    type: T,
    payload: RealtimeEvent<T>["payload"],
  ): Promise<void> {
    try {
      await fetch("/api/realtime/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId, type, payload }),
      });
    } catch (err) {
      console.error("[RealtimeClient] Publish failed", err);
    }
  }
}
