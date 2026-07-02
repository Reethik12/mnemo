"use client";

import { useRef, useState, useEffect } from "react";

interface UseIntersectionOptions {
  /** Threshold for intersection (0-1) */
  threshold?: number;
  /** Root margin for early/late triggering */
  rootMargin?: string;
  /** Only trigger once */
  once?: boolean;
}

/**
 * IntersectionObserver hook for scroll-triggered animations.
 * Returns a ref to attach to the target element and a boolean for visibility.
 */
export function useIntersection<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "-100px",
  once = true,
}: UseIntersectionOptions = {}): {
  ref: React.RefObject<T | null>;
  isInView: boolean;
} {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
