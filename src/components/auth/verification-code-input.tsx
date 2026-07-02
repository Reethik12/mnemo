"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

interface VerificationCodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
  error?: string;
  className?: string;
}

// ─── Component ───────────────────────────────────────

export function VerificationCodeInput({
  length = 6,
  onComplete,
  error,
  className,
}: VerificationCodeInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;

      const newValues = [...values];
      newValues[index] = value.slice(-1);
      setValues(newValues);

      // Auto-focus next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if complete
      const code = newValues.join("");
      if (code.length === length && newValues.every((v) => v !== "")) {
        onComplete(code);
      }
    },
    [values, length, onComplete],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !values[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [values],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
      const newValues = [...values];
      for (let i = 0; i < Math.min(pasted.length, length); i++) {
        newValues[i] = pasted[i];
      }
      setValues(newValues);
      const code = newValues.join("");
      if (code.length === length) {
        onComplete(code);
      }
    },
    [values, length, onComplete],
  );

  return (
    <div className={className}>
      <div
        className="flex justify-center gap-2"
        role="group"
        aria-label="Verification code"
      >
        {values.map((value, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "h-12 w-12 rounded-lg text-center text-lg font-semibold",
              "bg-surface border-border text-text-primary border",
              "transition-all duration-[var(--duration-normal)]",
              "focus:border-accent-purple focus:ring-accent-purple/30 focus:ring-1 focus:outline-none",
              error && "border-red-500/50",
            )}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-center text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
