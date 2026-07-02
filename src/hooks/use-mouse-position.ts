"use client";

import { useState, useEffect, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
  /** X position normalized to 0-1 range */
  normalizedX: number;
  /** Y position normalized to 0-1 range */
  normalizedY: number;
}

/**
 * Track mouse position relative to the viewport.
 * Throttled to animation frames for 60fps performance.
 * Returns both pixel and normalized (0-1) coordinates.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: e.clientX / window.innerWidth,
        normalizedY: e.clientY / window.innerHeight,
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
