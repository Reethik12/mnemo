"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollState {
  /** Current scroll Y position in pixels */
  scrollY: number;
  /** Scroll direction: "up" | "down" | null */
  direction: "up" | "down" | null;
  /** Whether the page has been scrolled past the threshold */
  isScrolled: boolean;
}

/**
 * Track scroll position and direction with configurable threshold.
 * Used primarily for navbar glass transition effect.
 *
 * @param threshold - Pixel threshold for `isScrolled` (default: 50)
 */
export function useScroll(threshold = 50): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    direction: null,
    isScrolled: false,
  });
  const previousY = useRef(0);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const direction = currentY > previousY.current ? "down" : "up";
      previousY.current = currentY;

      setState({
        scrollY: currentY,
        direction,
        isScrolled: currentY > threshold,
      });
    });
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return state;
}
