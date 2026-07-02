"use client";

import { cn } from "@/lib/cn";

interface AnimatedGridProps {
  className?: string;
}

export function AnimatedGrid({ className }: AnimatedGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="animate-grid-fade absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Fade edges */}
      <div className="from-bg-primary to-bg-primary absolute inset-0 bg-gradient-to-b via-transparent" />
      <div className="from-bg-primary to-bg-primary absolute inset-0 bg-gradient-to-r via-transparent" />
    </div>
  );
}
