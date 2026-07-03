import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class OrchestratorRepository {
  static async createWorkflow(data: Prisma.WorkflowUncheckedCreateInput) {
    return db.workflow.create({ data });
  }

  static async findWorkflowById(id: string) {
    return db.workflow.findUnique({
      where: { id },
    });
  }

  static async findWorkflowsByWorkspace(workspaceId: string) {
    return db.workflow.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async updateWorkflow(id: string, data: Prisma.WorkflowUpdateInput) {
    return db.workflow.update({
      where: { id },
      data,
    });
  }

  static async deleteWorkflow(id: string) {
    return db.workflow.delete({
      where: { id },
    });
  }

  // --- History Log mapping AuditLogs ---

  static async logHistory(
    workspaceId: string,
    workflowId: string,
    action: string,
    metadata: Record<string, unknown> = {},
  ) {
    return db.auditLog.create({
      data: {
        workspaceId,
        action,
        resource: "Workflow",
        resourceId: workflowId,
        metadata: metadata as Prisma.InputJsonValue,
      },
    });
  }

  static async findHistoryByWorkflow(workflowId: string) {
    return db.auditLog.findMany({
      where: {
        resource: "Workflow",
        resourceId: workflowId,
      },
      orderBy: { timestamp: "desc" },
    });
  }
}
