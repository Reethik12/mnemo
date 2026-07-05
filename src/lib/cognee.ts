import { env } from "@/lib/config";

/**
 * Helper client to communicate directly with Cognee Cloud HTTP API.
 * This completely removes the dependency on native Rust binaries (@cognee/cognee-ts)
 * avoiding Vercel GLIBC compatibility issues.
 */
export async function cogneeFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${env.COGNEE_API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (env.COGNEE_API_KEY) {
    headers["X-API-Key"] = env.COGNEE_API_KEY;
  }
  if (env.COGNEE_TENANT_ID) {
    headers["X-Tenant-ID"] = env.COGNEE_TENANT_ID;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = `Cognee API Error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.detail) {
        errorMsg += ` - ${JSON.stringify(errorData.detail)}`;
      }
    } catch {
      // Ignored
    }
    throw new Error(errorMsg);
  }

  return response.json();
}
