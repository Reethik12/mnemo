import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class DecisionRepository {
  // --- Decisions ---

  static async createDecision(data: Prisma.DecisionLogUncheckedCreateInput) {
    return db.decisionLog.create({ data });
  }

  static async findDecisionById(id: string) {
    return db.decisionLog.findUnique({
      where: { id },
    });
  }

  static async findDecisionsByWorkspace(workspaceId: string) {
    return db.decisionLog.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async updateDecisionStatus(id: string, status: string) {
    return db.decisionLog.update({
      where: { id },
      data: { status },
    });
  }

  // --- Schedules ---

  static async createSchedule(data: Prisma.AgentScheduleUncheckedCreateInput) {
    return db.agentSchedule.create({ data });
  }

  static async findSchedulesByWorkspace(workspaceId: string) {
    return db.agentSchedule.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async updateScheduleActive(id: string, isActive: boolean) {
    return db.agentSchedule.update({
      where: { id },
      data: { isActive },
    });
  }

  static async deleteSchedule(id: string) {
    return db.agentSchedule.delete({
      where: { id },
    });
  }
}
