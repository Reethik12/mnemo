"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { ContextMenuItem } from "@/types";
import { cn } from "@/lib/cn";

interface ContextMenuProps {
  items: ContextMenuItem[];
  position: { x: number; y: number } | null;
  onClose: () => void;
}

export function ContextMenu({ items, position, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (position) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [position, onClose]);

  return (
    <AnimatePresence>
      {position && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          style={{
            position: "fixed",
            left: Math.min(
              position.x,
              typeof window !== "undefined"
                ? window.innerWidth - 200
                : position.x,
            ),
            top: Math.min(
              position.y,
              typeof window !== "undefined"
                ? window.innerHeight - 200
                : position.y,
            ),
          }}
          className="border-border bg-surface/90 shadow-glow-sm z-[var(--z-toast)] min-w-[180px] overflow-hidden rounded-lg border p-1 backdrop-blur-xl"
        >
          {items.map((item, idx) => {
            if (item.divider) {
              return (
                <div
                  key={`div-${idx}`}
                  className="bg-border my-1 h-px w-full"
                />
              );
            }
            return (
              <button
                key={item.id}
                disabled={item.disabled}
                onClick={() => {
                  item.action();
                  onClose();
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs transition-colors",
                  item.disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-white/10",
                  item.danger
                    ? "text-status-error hover:bg-status-error/10 hover:text-status-error"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <kbd className="text-text-tertiary ml-auto rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
