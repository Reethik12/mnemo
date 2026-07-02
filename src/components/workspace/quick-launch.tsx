"use client";

import { useCommandCenter } from "@/hooks";

export function QuickLaunch() {
  const { open } = useCommandCenter();

  return (
    <button
      onClick={open}
      className="group bg-surface/50 text-text-tertiary hover:border-accent-purple/30 hover:bg-accent-purple/5 hover:text-text-secondary hover:shadow-glow-sm flex h-10 w-full items-center gap-3 rounded-xl border border-white/5 px-4 text-sm transition-all"
    >
      <svg
        className="text-accent-purple h-4 w-4 opacity-70 group-hover:opacity-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <span className="flex-1 text-left">Search or run command...</span>
      <kbd className="text-text-secondary group-hover:border-accent-purple/30 hidden rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] font-semibold sm:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}
