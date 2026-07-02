"use client";

import { Dropdown } from "@/components/ui/dropdown";
import { MemoryFilter } from "@/types";
import { useMemo } from "react";

interface MemoryFilterDropdownProps {
  currentFilter: MemoryFilter;
  onFilterChange: (filter: MemoryFilter) => void;
}

export function MemoryFilterDropdown({
  currentFilter,
  onFilterChange,
}: MemoryFilterDropdownProps) {
  const filterOptions = useMemo(
    () => [
      { id: "All", label: "All Memories", icon: <FilterIcon /> },
      { id: "Favorites", label: "Favorites", icon: <FavoriteIcon /> },
      { id: "Pinned", label: "Pinned", icon: <PinIcon /> },
      { id: "Recent", label: "Recent", icon: <RecentIcon /> },
      { id: "Archived", label: "Archived", icon: <ArchiveIcon /> },
    ],
    [],
  );

  const selectedOption =
    filterOptions.find((o) => o.id === currentFilter) || filterOptions[0];

  return (
    <Dropdown
      trigger={
        <button
          className="text-text-secondary flex items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors hover:bg-white/5"
          title="Filter Memories"
        >
          {selectedOption.icon}
          <span className="hidden sm:inline-block">{selectedOption.label}</span>
        </button>
      }
      items={filterOptions.map((opt) => ({
        id: opt.id,
        label: opt.label,
        icon: opt.icon,
        onClick: () => onFilterChange(opt.id as MemoryFilter),
      }))}
      align="left"
    />
  );
}

function FilterIcon() {
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
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );
}

function FavoriteIcon() {
  return (
    <svg
      className="h-4 w-4 text-yellow-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      className="text-accent-purple h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function RecentIcon() {
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
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ArchiveIcon() {
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
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  );
}
