"use client";

import { Dropdown } from "@/components/ui/dropdown";
import { ReactNode } from "react";

export type ViewMode = "List" | "Compact" | "Comfortable";

interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  const views: { id: ViewMode; icon: ReactNode }[] = [
    { id: "List", icon: <ListIcon /> },
    { id: "Compact", icon: <CompactIcon /> },
    { id: "Comfortable", icon: <ComfortableIcon /> },
  ];

  const currentIcon = views.find((v) => v.id === currentView)?.icon || (
    <ListIcon />
  );

  return (
    <Dropdown
      trigger={
        <button
          className="text-text-secondary hover:text-text-primary flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-white/5"
          title="Change View"
        >
          {currentIcon}
        </button>
      }
      items={views.map((v) => ({
        id: v.id,
        label: v.id,
        icon:
          v.id === currentView ? <CheckIcon /> : <span className="h-4 w-4" />,
        onClick: () => onViewChange(v.id),
      }))}
      align="right"
    />
  );
}

function ListIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CompactIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
    </svg>
  );
}

function ComfortableIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 10a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="text-accent-purple h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
