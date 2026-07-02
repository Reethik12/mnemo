"use client";

import { cn } from "@/lib/cn";

interface AuroraProps {
  className?: string;
}

const blobs = [
  {
    color: "bg-accent-purple/20",
    size: "w-[600px] h-[600px]",
    position: "top-[-200px] left-[-100px]",
    delay: "0s",
  },
  {
    color: "bg-accent-cyan/15",
    size: "w-[500px] h-[500px]",
    position: "top-[100px] right-[-150px]",
    delay: "-7s",
  },
  {
    color: "bg-accent-purple-light/10",
    size: "w-[400px] h-[400px]",
    position: "bottom-[-100px] left-[30%]",
    delay: "-14s",
  },
];

export function Aurora({ className }: AuroraProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full blur-[120px] will-change-transform",
            "animate-aurora-drift",
            blob.color,
            blob.size,
            blob.position,
          )}
          style={{ animationDelay: blob.delay }}
        />
      ))}
    </div>
  );
}
