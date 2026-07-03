export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class CacheManager {
  private static store: Map<string, CacheEntry<unknown>> = new Map();

  /**
   * Set cache value with TTL
   */
  static set<T>(
    namespace: string,
    key: string,
    value: T,
    ttlSeconds = 60,
  ): void {
    const fullKey = `${namespace}:${key}`;
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.store.set(fullKey, { value, expiresAt });
  }

  /**
   * Get cache value. Checks expiration.
   */
  static get<T>(namespace: string, key: string): T | null {
    const fullKey = `${namespace}:${key}`;
    const entry = this.store.get(fullKey);

    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(fullKey); // expired
      return null;
    }

    return entry.value as T;
  }

  /**
   * Invalidate key
   */
  static invalidate(namespace: string, key: string): void {
    const fullKey = `${namespace}:${key}`;
    this.store.delete(fullKey);
  }

  /**
   * Clear complete namespace
   */
  static clearNamespace(namespace: string): void {
    const prefix = `${namespace}:`;
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Safe fetching wrapper with automatic refresh callback
   */
  static async getOrSet<T>(
    namespace: string,
    key: string,
    ttlSeconds = 60,
    refreshFn: () => Promise<T>,
  ): Promise<T> {
    const cached = this.get<T>(namespace, key);
    if (cached !== null) return cached;

    const value = await refreshFn();
    this.set(namespace, key, value, ttlSeconds);
    return value;
  }

  /**
   * Get overall store dimensions
   */
  static getStats() {
    return {
      size: this.store.size,
      keys: Array.from(this.store.keys()),
    };
  }
}
