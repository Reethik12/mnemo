"use client";

import { cn } from "@/lib/cn";

interface GradientMeshProps {
  className?: string;
}

export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="animate-gradient-shift absolute inset-0 opacity-30"
        style={{
          backgroundSize: "400% 400%",
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(109, 91, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(76, 201, 240, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(143, 125, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(109, 91, 255, 0.08) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
