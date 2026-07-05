import { Cognee } from "@cognee/cognee-ts";

/**
 * Singleton instance of the Cognee SDK.
 * We must ensure `warm()` is called exactly once to avoid performance overhead
 * and to reuse the same engines across all modules.
 */
let cogneeInstance: Cognee | null = null;
let warmPromise: Promise<void> | null = null;

export async function getCognee(): Promise<Cognee> {
  if (!cogneeInstance) {
    // Cognee automatically picks up configuration from environment variables
    // (e.g., OPENAI_API_KEY, COGNEE_VECTOR_DB_URL, etc.)
    cogneeInstance = new Cognee();
  }

  if (!warmPromise) {
    warmPromise = cogneeInstance.warm();
  }

  await warmPromise;

  return cogneeInstance;
}
