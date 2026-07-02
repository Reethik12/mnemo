"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ─── Component ───────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error, leftIcon, rightIcon, className, id, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-text-secondary text-sm font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span
            className="text-text-tertiary absolute top-1/2 left-3 -translate-y-1/2"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "bg-surface text-text-primary w-full rounded-lg px-4 py-2.5 text-sm",
            "border-border placeholder:text-text-tertiary border",
            "transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]",
            "hover:border-border-hover",
            "focus:border-accent-purple focus:ring-accent-purple/30 focus:ring-1 focus:outline-none",
            error &&
              "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {rightIcon && (
          <span
            className="text-text-tertiary absolute top-1/2 right-3 -translate-y-1/2"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className="text-text-tertiary text-xs">
          {helperText}
        </p>
      )}
    </div>
  );
});
