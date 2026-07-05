"use client";

import { useCommandCenter } from "@/hooks";
import { Modal } from "@/components/ui/modal";
import { useState, useEffect } from "react";
import { CommandItem } from "@/types";
import { cn } from "@/lib/cn";
import { useMnemoAI } from "@/hooks/useMnemoAI";
import type { SearchResult } from "@/services/mnemo-ai/types";
import { useRouter } from "next/navigation";

const MOCK_COMMANDS: CommandItem[] = [
  {
    id: "create",
    title: "Create new memory",
    shortcut: ["C"],
    action: () => {},
    section: "Actions",
  },
  {
    id: "search",
    title: "Search workspace",
    shortcut: ["S"],
    action: () => {},
    section: "Actions",
  },
  {
    id: "theme",
    title: "Toggle theme",
    shortcut: ["T"],
    action: () => {},
    section: "Preferences",
  },
  {
    id: "focus",
    title: "Toggle focus mode",
    shortcut: ["F11"],
    action: () => {},
    section: "Preferences",
  },
];

export function CommandCenter() {
  const { isOpen, query, setQuery, close } = useCommandCenter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { globalSearch } = useMnemoAI();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      const timer = setTimeout(() => {
        setSearchResults([]);
      }, 0);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const res = await globalSearch(query);
      setSearchResults(res);
      setIsSearching(false);
      setActiveIndex(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, globalSearch]);

  const filteredCommands = MOCK_COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()),
  );

  const totalItems = filteredCommands.length + searchResults.length;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % totalItems);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
      } else if (e.key === "Enter" && totalItems > 0) {
        e.preventDefault();
        if (activeIndex < filteredCommands.length) {
          filteredCommands[activeIndex].action();
        } else {
          const res = searchResults[activeIndex - filteredCommands.length];
          if (res) {
            router.push(res.url);
          }
        }
        close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    filteredCommands,
    activeIndex,
    close,
    router,
    searchResults,
    totalItems,
  ]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      ariaLabel="Command Center"
      className="bg-bg-secondary/95 max-w-2xl overflow-hidden p-0 backdrop-blur-2xl"
    >
      <div className="border-border flex items-center border-b px-4 py-3">
        <svg
          className="text-accent-purple h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          placeholder="What do you want to do? (Type a command or search...)"
          className="text-text-primary placeholder:text-text-tertiary flex-1 bg-transparent px-3 text-base focus:outline-none"
          autoFocus
        />
        <div className="flex items-center gap-1">
          <kbd className="border-border bg-surface text-text-tertiary hidden rounded-md border px-2 py-0.5 text-[10px] font-medium sm:inline-block">
            esc
          </kbd>
        </div>
      </div>
      <div className="max-h-[60vh] overflow-y-auto p-2">
        {filteredCommands.length > 0
          ? filteredCommands.map((cmd, idx) => (
              <button
                key={cmd.id}
                onClick={() => {
                  cmd.action();
                  close();
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition-colors",
                  idx === activeIndex
                    ? "bg-accent-purple/10 text-accent-purple-light"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5",
                )}
              >
                <div className="flex items-center gap-3">
                  {idx === activeIndex && (
                    <span className="bg-accent-purple h-1.5 w-1.5 rounded-full" />
                  )}
                  <span
                    className={cn("text-sm", idx !== activeIndex && "ml-4")}
                  >
                    {cmd.title}
                  </span>
                </div>
                {cmd.shortcut && (
                  <div className="flex gap-1">
                    {cmd.shortcut.map((s) => (
                      <kbd
                        key={s}
                        className="border-border text-text-tertiary rounded border bg-black/20 px-1.5 py-0.5 text-[10px]"
                      >
                        {s}
                      </kbd>
                    ))}
                  </div>
                )}
              </button>
            ))
          : null}

        {searchResults.length > 0 && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <h4 className="text-text-tertiary mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
              Mnemo AI Global Search
            </h4>
            {searchResults.map((res, idx) => {
              const actualIdx = idx + filteredCommands.length;
              return (
                <button
                  key={res.id}
                  onClick={() => {
                    router.push(res.url);
                    close();
                  }}
                  className={cn(
                    "flex w-full flex-col items-start justify-center rounded-lg px-3 py-3 text-left transition-colors",
                    actualIdx === activeIndex
                      ? "bg-accent-purple/10 border-accent-purple/20 border"
                      : "border border-transparent hover:bg-white/5",
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        actualIdx === activeIndex
                          ? "text-accent-purple-light"
                          : "text-white",
                      )}
                    >
                      {res.title}
                    </span>
                    <span className="text-text-tertiary rounded-full bg-white/5 px-2 py-0.5 text-[10px] tracking-wider uppercase">
                      {res.module}
                    </span>
                  </div>
                  <span className="text-text-secondary mt-1 text-xs">
                    {res.snippet}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {totalItems === 0 && !isSearching ? (
          <div className="text-text-tertiary py-8 text-center text-sm">
            No results found for &quot;{query}&quot;
          </div>
        ) : null}

        {isSearching && (
          <div className="text-text-tertiary flex items-center justify-center gap-2 py-8 text-center text-sm">
            <span className="bg-accent-purple h-1.5 w-1.5 animate-ping rounded-full" />{" "}
            Searching Mnemo Graph...
          </div>
        )}
      </div>
    </Modal>
  );
}
