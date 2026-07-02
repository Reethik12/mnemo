import { cn } from "@/lib/cn";

interface NoiseTextureProps {
  className?: string;
  opacity?: number;
}

export function NoiseTexture({ className, opacity = 0.03 }: NoiseTextureProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="mnemo-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#mnemo-noise)" />
      </svg>
    </div>
  );
}
