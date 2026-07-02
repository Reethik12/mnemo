"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";

interface ParticlesProps {
  className?: string;
  count?: number;
}

// Seeded pseudo-random for SSR consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

interface ParticleData {
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: string;
  delay: string;
}

export function Particles({ className, count = 15 }: ParticlesProps) {
  const particles: ParticleData[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      left: `${seededRandom(i * 3 + 1) * 100}%`,
      top: `${seededRandom(i * 3 + 2) * 100}%`,
      size: 1 + seededRandom(i * 3 + 3) * 2,
      opacity: 0.1 + seededRandom(i * 3 + 4) * 0.3,
      duration: `${15 + seededRandom(i * 3 + 5) * 25}s`,
      delay: `${seededRandom(i * 3 + 6) * -20}s`,
    }));
  }, [count]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="animate-particle-float absolute rounded-full bg-white"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
