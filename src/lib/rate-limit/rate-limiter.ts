export interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

export class RateLimiter {
  private static store: Map<string, TokenBucket> = new Map();

  /**
   * Evaluates if a request violates key threshold parameters (Token Bucket model)
   */
  static isRateLimited(
    key: string,
    limit = 60,
    windowSeconds = 60,
  ): { limited: boolean; remaining: number; reset: number } {
    const now = Date.now();
    const refillRate = limit / windowSeconds; // tokens per second

    let bucket = this.store.get(key);

    if (!bucket) {
      bucket = { tokens: limit, lastRefill: now };
    } else {
      // Calculate token refills since last request
      const deltaSeconds = (now - bucket.lastRefill) / 1000;
      const refilledTokens = deltaSeconds * refillRate;

      bucket.tokens = Math.min(limit, bucket.tokens + refilledTokens);
      bucket.lastRefill = now;
    }

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      this.store.set(key, bucket);

      return {
        limited: false,
        remaining: Math.floor(bucket.tokens),
        reset: Math.ceil((limit - bucket.tokens) / refillRate),
      };
    }

    // Limit exceeded
    return {
      limited: true,
      remaining: 0,
      reset: Math.ceil((limit - bucket.tokens) / refillRate),
    };
  }
}
