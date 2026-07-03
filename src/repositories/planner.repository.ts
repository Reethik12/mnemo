import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class PlannerRepository {
  static async createGoal(data: Prisma.GoalUncheckedCreateInput) {
    return db.goal.create({ data });
  }

  static async findGoalById(id: string) {
    return db.goal.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  static async findGoalsByAgent(agentId: string) {
    return db.goal.findMany({
      where: { agentId },
      include: { tasks: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async updateGoal(id: string, data: Prisma.GoalUpdateInput) {
    return db.goal.update({
      where: { id },
      data,
    });
  }

  static async deleteGoal(id: string) {
    return db.goal.delete({
      where: { id },
    });
  }

  // --- Tasks ---

  static async createTask(data: Prisma.AgentTaskUncheckedCreateInput) {
    return db.agentTask.create({ data });
  }

  static async findTaskById(id: string) {
    return db.agentTask.findUnique({
      where: { id },
    });
  }

  static async findTasksByGoal(goalId: string) {
    return db.agentTask.findMany({
      where: { goalId },
      orderBy: { createdAt: "asc" },
    });
  }

  static async updateTask(id: string, data: Prisma.AgentTaskUpdateInput) {
    return db.agentTask.update({
      where: { id },
      data,
    });
  }
}
