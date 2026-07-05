/**
 * Get the base URL of the application.
 * Priority:
 * 1. NEXT_PUBLIC_APP_URL (from environment variables)
 * 2. VERCEL_URL (from Vercel environment)
 * 3. window.location.origin (if running in browser)
 * 4. Fallback to empty string for relative paths
 */
export function getBaseUrl(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (typeof process !== "undefined" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Fallback for SSR without VERCEL_URL or NEXT_PUBLIC_APP_URL
  return "";
}

/**
 * Generate a share URL for a specific resource path.
 * Ensures that the URL has no double slashes except for the protocol.
 */
export function getShareUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const cleanBase = baseUrl.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
}
