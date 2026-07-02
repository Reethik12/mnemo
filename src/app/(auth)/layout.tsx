"use client";

import { Aurora } from "@/components/effects/aurora";
import { NoiseTexture } from "@/components/effects/noise-texture";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg-primary relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Background effects */}
      <Aurora />
      <NoiseTexture />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
