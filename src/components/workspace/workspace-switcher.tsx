"use client";

import { useWorkspace } from "@/hooks";
import { Dropdown } from "@/components/ui/dropdown";
import { cn } from "@/lib/cn";

export function WorkspaceSwitcher({ isExpanded }: { isExpanded: boolean }) {
  const { workspaces, activeWorkspace, switchWorkspace, createWorkspace } =
    useWorkspace();

  return (
    <div className="px-4 py-2">
      <Dropdown
        trigger={
          <button
            className={cn(
              "border-border bg-surface/50 flex w-full items-center justify-between rounded-lg border p-2 text-sm transition-colors hover:bg-white/5",
              !isExpanded && "justify-center p-2",
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white",
                  activeWorkspace?.color || "bg-accent-purple",
                )}
              >
                {activeWorkspace?.name
                  ? activeWorkspace.name.charAt(0).toUpperCase()
                  : "P"}
              </div>
              {isExpanded && (
                <span className="text-text-primary max-w-[120px] truncate font-semibold">
                  {activeWorkspace?.name || "Personal Hub"}
                </span>
              )}
            </div>
            {isExpanded && (
              <svg
                className="text-text-tertiary h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            )}
          </button>
        }
        items={[
          ...workspaces.map((ws) => ({
            id: ws.id,
            label: ws.name,
            icon: (
              <div
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm text-[8px] font-bold text-white",
                  ws.color,
                )}
              >
                {ws.name.charAt(0).toUpperCase()}
              </div>
            ),
            onClick: () => switchWorkspace(ws.id),
          })),
          {
            id: "create_new_workspace",
            label: "+ Create Workspace",
            onClick: () => {
              const name = prompt("Enter new workspace name:");
              if (name && name.trim()) {
                createWorkspace(name);
              }
            },
          },
        ]}
        align="left"
      />
    </div>
  );
}
