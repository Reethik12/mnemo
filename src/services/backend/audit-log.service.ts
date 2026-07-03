import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class AuditLogService {
  /**
   * Log a workspace audit action
   */
  static async log(
    workspaceId: string,
    userId: string | null,
    action: string,
    resource: string,
    resourceId?: string,
    metadata?: Record<string, unknown>,
  ) {
    return db.auditLog.create({
      data: {
        workspaceId,
        userId,
        action,
        resource,
        resourceId,
        metadata: metadata
          ? (metadata as Prisma.InputJsonValue)
          : Prisma.DbNull,
      },
    });
  }

  /**
   * Get audit logs for a workspace
   */
  static async getLogs(workspaceId: string, limit = 50) {
    return db.auditLog.findMany({
      where: { workspaceId },
      orderBy: { timestamp: "desc" },
      take: limit,
      include: {
        workspace: {
          select: { name: true },
        },
      },
    });
  }
}
