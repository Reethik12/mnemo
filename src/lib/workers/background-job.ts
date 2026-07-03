export class BackgroundJob {
  /**
   * Abstract background execution.
   * In a real app, this should push to a queue (like Inngest, SQS, QStash).
   * For this implementation, we use an asynchronous promise that resolves without blocking the HTTP request,
   * or a simple waitUntil() if available.
   */
  static async enqueue(
    jobName: string,
    payload: unknown,
    task: () => Promise<void>,
  ): Promise<void> {
    console.log(`[BackgroundJob] Enqueueing job: ${jobName}`);

    // Abstract execution away from the main thread
    Promise.resolve().then(async () => {
      try {
        console.log(`[BackgroundJob] Starting execution for: ${jobName}`);
        const start = Date.now();
        await task();
        const duration = Date.now() - start;
        console.log(
          `[BackgroundJob] Completed job: ${jobName} in ${duration}ms`,
        );
      } catch (err) {
        console.error(`[BackgroundJob] Job failed: ${jobName}`, err);
      }
    });
  }
}
