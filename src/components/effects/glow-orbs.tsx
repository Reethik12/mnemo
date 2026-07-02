"use client";

import { cn } from "@/lib/cn";

interface GlowOrbsProps {
  className?: string;
}

const orbs = [
  {
    gradient:
      "radial-gradient(circle, rgba(109, 91, 255, 0.12) 0%, transparent 70%)",
    size: "w-[500px] h-[500px]",
    position: "top-[10%] left-[10%]",
    animation: "animate-float",
    delay: "0s",
  },
  {
    gradient:
      "radial-gradient(circle, rgba(76, 201, 240, 0.08) 0%, transparent 70%)",
    size: "w-[400px] h-[400px]",
    position: "bottom-[20%] right-[10%]",
    animation: "animate-float",
    delay: "-3s",
  },
  {
    gradient:
      "radial-gradient(circle, rgba(143, 125, 255, 0.06) 0%, transparent 70%)",
    size: "w-[350px] h-[350px]",
    position: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
    animation: "animate-float",
    delay: "-5s",
  },
];

export function GlowOrbs({ className }: GlowOrbsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={cn(
            "absolute will-change-transform",
            orb.size,
            orb.position,
            orb.animation,
          )}
          style={{
            background: orb.gradient,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
