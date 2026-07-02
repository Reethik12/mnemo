"use client";

import { useState, useEffect } from "react";

export function useFocusMode() {
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F11" || (e.metaKey && e.shiftKey && e.key === "f")) {
        e.preventDefault();
        setIsFocusMode((prev) => !prev);
      }
      if (e.key === "Escape" && isFocusMode) {
        setIsFocusMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocusMode]);

  return { isFocusMode, setIsFocusMode };
}
