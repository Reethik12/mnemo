import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class AgentRepository {
  static async create(data: Prisma.AgentUncheckedCreateInput) {
    return db.agent.create({ data });
  }

  static async findById(id: string) {
    return db.agent.findUnique({
      where: { id },
      include: { goalsList: true },
    });
  }

  static async findAllByWorkspace(workspaceId: string) {
    return db.agent.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async update(id: string, data: Prisma.AgentUpdateInput) {
    return db.agent.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return db.agent.delete({
      where: { id },
    });
  }

  static async updateStatus(id: string, status: string) {
    return db.agent.update({
      where: { id },
      data: { status },
    });
  }
}
