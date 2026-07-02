import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Combines clsx for conditional classes with tailwind-merge
 * to intelligently resolve conflicting utility classes.
 *
 * @example
 * cn("px-4 py-2", isLarge && "px-8 py-4", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
