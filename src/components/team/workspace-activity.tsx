"use client";

interface Activity {
  id: string;
  action: string;
  resource: string;
  resourceId: string | null;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

interface WorkspaceActivityProps {
  activities: Activity[];
}

export function WorkspaceActivity({ activities }: WorkspaceActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5">
        <p className="text-text-secondary text-sm">No recent activities.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {activities.map((act) => (
        <div
          key={act.id}
          className="flex items-start justify-between border-b border-white/5 pb-3 last:border-0"
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-white">{act.action}</p>
            <p className="text-text-secondary text-xs">
              Resource: {act.resource}{" "}
              {act.resourceId ? `(${act.resourceId.substring(0, 8)})` : ""}
            </p>
          </div>
          <span className="text-text-muted text-xs">
            {new Date(act.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}
    </div>
  );
}
