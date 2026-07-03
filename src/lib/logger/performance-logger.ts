import { logger } from "./logger";

export class PerformanceLogger {
  /**
   * Times a given async callback and logs duration
   */
  static async time<T>(
    operationName: string,
    metadata: Record<string, unknown> = {},
    cb: () => Promise<T>,
  ): Promise<T> {
    const start = Date.now();
    try {
      const result = await cb();
      const duration = Date.now() - start;
      logger.info({
        type: "performance",
        operationName,
        durationMs: duration,
        status: "success",
        ...metadata,
      });
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      logger.error({
        type: "performance",
        operationName,
        durationMs: duration,
        status: "failure",
        error: (error as Error).message,
        ...metadata,
      });
      throw error;
    }
  }
}
