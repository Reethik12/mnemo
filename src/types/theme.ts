/**
 * Theme type definitions.
 */

export type Theme = "dark" | "light" | "system";

export interface ThemeState {
  theme: Theme;
  resolvedTheme: "dark" | "light";
}
