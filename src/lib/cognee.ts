import { env } from "@/lib/config";

/**
 * Helper client to communicate directly with Cognee Cloud HTTP API.
 * This completely removes the dependency on native Rust binaries (@cognee/cognee-ts)
 * avoiding Vercel GLIBC compatibility issues.
 */
export async function cogneeFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${env.COGNEE_API_URL}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  // Only set application/json if body is string (JSON) and no Content-Type is provided
  if (typeof options.body === "string" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (env.COGNEE_API_KEY) {
    headers["X-API-Key"] = env.COGNEE_API_KEY;
  }

  if (env.COGNEE_TENANT_ID) {
    headers["X-Tenant-ID"] = env.COGNEE_TENANT_ID;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    cache: "no-store", // Disable Next.js caching
  });

  if (!response.ok) {
    let body = "";

    try {
      body = await response.text();
    } catch {
      body = "<Unable to read response body>";
    }

    console.error("========== COGNEE ERROR ==========");
    console.error("URL:", url);
    console.error("METHOD:", options.method ?? "GET");
    console.error("STATUS:", response.status);
    console.error("STATUS TEXT:", response.statusText);
    console.error("REQUEST BODY:", options.body ?? "<empty>");
    console.error("RESPONSE BODY:", body);
    console.error("==================================");

    throw new Error(
      `Cognee API Error: ${response.status} ${response.statusText}\n${body}`,
    );
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}
