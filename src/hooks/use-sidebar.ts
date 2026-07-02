"use client";

import { useState, useCallback, useEffect } from "react";
import { useMediaQuery } from "./use-media-query";

/**
 * Sidebar state management.
 * Auto-collapses on tablet, becomes slide-over on mobile.
 */
export function useSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Auto-collapse on tablet
  useEffect(() => {
    if (isTablet && !isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsExpanded(false);
    } else if (!isTablet) {
      setIsExpanded(true);
    }
  }, [isTablet, isMobile]);

  // Close mobile menu on resize
  useEffect(() => {
    if (!isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMobileOpen(false);
    }
  }, [isMobile]);

  const toggle = useCallback(() => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsExpanded((prev) => !prev);
    }
  }, [isMobile]);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return {
    isExpanded,
    isMobileOpen,
    isMobile,
    isTablet,
    toggle,
    closeMobile,
  };
}
