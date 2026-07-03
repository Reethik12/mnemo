export interface RuntimeExecutionConfig {
  maxIterations: number;
  timeoutMs: number;
  tokenBudget: number;
}

export class RuntimeManager {
  /**
   * Run execution step checking boundary constraints
   */
  static async executeStep<T>(
    stepFn: () => Promise<T>,
    config: RuntimeExecutionConfig,
    currentStats: { iterations: number; tokensUsed: number; elapsedMs: number },
  ): Promise<{ result: T; nextStats: typeof currentStats }> {
    const start = Date.now();

    // 1. Check Iterations Limit
    if (currentStats.iterations >= config.maxIterations) {
      throw new Error(
        `Execution halted: maximum iterations (${config.maxIterations}) exceeded.`,
      );
    }

    // 2. Check Token Budget
    if (currentStats.tokensUsed >= config.tokenBudget) {
      throw new Error(
        `Execution halted: token budget (${config.tokenBudget}) exhausted.`,
      );
    }

    // 3. Check Timeout
    if (currentStats.elapsedMs >= config.timeoutMs) {
      throw new Error(
        `Execution halted: timeout limit (${config.timeoutMs}ms) exceeded.`,
      );
    }

    // Wrap execution with timeout handler
    const executionPromise = stepFn();
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error("Execution timeout exceeded.")),
        config.timeoutMs - currentStats.elapsedMs,
      ),
    );

    const result = await Promise.race([executionPromise, timeoutPromise]);
    const duration = Date.now() - start;

    return {
      result,
      nextStats: {
        iterations: currentStats.iterations + 1,
        tokensUsed: currentStats.tokensUsed + 120, // estimate token cost per run step
        elapsedMs: currentStats.elapsedMs + duration,
      },
    };
  }
}
