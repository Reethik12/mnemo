import { NextRequest } from "next/server";
import { logger } from "./logger";
import crypto from "crypto";

export function logRequest(req: NextRequest) {
  const requestId = req.headers.get("x-request-id") || crypto.randomUUID();
  const correlationId = req.headers.get("x-correlation-id") || requestId;

  logger.info({
    type: "request",
    requestId,
    correlationId,
    method: req.method,
    url: req.nextUrl.pathname,
    userAgent: req.headers.get("user-agent"),
  });

  return { requestId, correlationId };
}
