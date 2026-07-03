import { type RealtimeEvent, type PresenceUser } from "./types";

export type BroadcasterCallback = (event: RealtimeEvent) => void;

export class RealtimeServer {
  // Map of workspaceId -> Set of broadcaster callbacks
  private static connections: Map<
    string,
    Set<{ userId: string; callback: BroadcasterCallback }>
  > = new Map();
  // Map of workspaceId -> Map of userId -> Presence Details
  private static presence: Map<string, Map<string, PresenceUser>> = new Map();

  /**
   * Register a new client SSE stream connection
   */
  static register(
    workspaceId: string,
    userId: string,
    callback: BroadcasterCallback,
  ): () => void {
    if (!this.connections.has(workspaceId)) {
      this.connections.set(workspaceId, new Set());
    }

    const connection = { userId, callback };
    this.connections.get(workspaceId)!.add(connection);

    console.log(
      `[RealtimeServer] Client connected: user ${userId} to workspace ${workspaceId}`,
    );

    // Return unregister cleanup
    return () => {
      const workspaceCons = this.connections.get(workspaceId);
      if (workspaceCons) {
        workspaceCons.delete(connection);
        if (workspaceCons.size === 0) {
          this.connections.delete(workspaceId);
        }
      }
      this.removePresence(workspaceId, userId);
      console.log(
        `[RealtimeServer] Client disconnected: user ${userId} from workspace ${workspaceId}`,
      );
    };
  }

  /**
   * Broadcast an event to all connected clients in a workspace
   */
  static broadcast(event: RealtimeEvent): void {
    const workspaceCons = this.connections.get(event.workspaceId);
    if (workspaceCons) {
      workspaceCons.forEach((con) => {
        try {
          con.callback(event);
        } catch (err) {
          console.error(
            `[RealtimeServer] Failed to broadcast event to user ${con.userId}`,
            err,
          );
        }
      });
    }
  }

  /**
   * Update presence details for a user inside a workspace
   */
  static updatePresence(workspaceId: string, presenceUser: PresenceUser): void {
    if (!this.presence.has(workspaceId)) {
      this.presence.set(workspaceId, new Map());
    }

    this.presence.get(workspaceId)!.set(presenceUser.userId, presenceUser);

    // Broadcast updated presence state
    this.broadcast({
      type: "PresenceUpdated",
      workspaceId,
      payload: {
        workspaceId,
        users: Array.from(this.presence.get(workspaceId)!.values()),
      },
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Remove presence details (e.g. on disconnect)
   */
  static removePresence(workspaceId: string, userId: string): void {
    const workspacePresence = this.presence.get(workspaceId);
    if (workspacePresence) {
      workspacePresence.delete(userId);
      if (workspacePresence.size === 0) {
        this.presence.delete(workspaceId);
      }

      // Broadcast updated presence state
      this.broadcast({
        type: "PresenceUpdated",
        workspaceId,
        payload: {
          workspaceId,
          users:
            workspacePresence.size > 0
              ? Array.from(workspacePresence.values())
              : [],
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get presence user list for a workspace
   */
  static getPresence(workspaceId: string): PresenceUser[] {
    const workspacePresence = this.presence.get(workspaceId);
    return workspacePresence ? Array.from(workspacePresence.values()) : [];
  }
}
