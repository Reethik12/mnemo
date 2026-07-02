"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
  /** Alignment relative to trigger */
  align?: "left" | "right";
}

// ─── Component ───────────────────────────────────────

export function Dropdown({
  trigger,
  items,
  className,
  align = "left",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(true);
          setActiveIndex(0);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev + 1 >= items.length ? 0 : prev + 1;
            itemRefs.current[next]?.focus();
            return next;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev - 1 < 0 ? items.length - 1 : prev - 1;
            itemRefs.current[next]?.focus();
            return next;
          });
          break;
        case "Escape":
          setIsOpen(false);
          setActiveIndex(-1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (activeIndex >= 0 && !items[activeIndex].disabled) {
            items[activeIndex].onClick?.();
            setIsOpen(false);
          }
          break;
      }
    },
    [isOpen, items, activeIndex],
  );

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onKeyDown={handleKeyDown}
    >
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
          setActiveIndex(-1);
        }}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            aria-orientation="vertical"
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ type: "tween", duration: 0.15 }}
            className={cn(
              "absolute top-full z-[var(--z-dropdown)] mt-2",
              "glass-strong min-w-[180px] rounded-xl p-1.5",
              "shadow-card",
              align === "right" ? "right-0" : "left-0",
              className,
            )}
          >
            {items.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                role="menuitem"
                disabled={item.disabled}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm",
                  "transition-colors duration-[var(--duration-fast)]",
                  "text-text-secondary hover:text-text-primary hover:bg-white/5",
                  "focus:text-text-primary focus:bg-white/5 focus:outline-none",
                  item.disabled && "cursor-not-allowed opacity-40",
                )}
              >
                {item.icon && (
                  <span
                    className="text-text-tertiary shrink-0"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
