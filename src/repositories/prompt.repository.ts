import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class PromptRepository {
  static async create(data: Prisma.PromptUncheckedCreateInput) {
    return db.prompt.create({ data });
  }

  static async findById(id: string) {
    return db.prompt.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static async findAllByWorkspace(workspaceId: string, skip = 0, take = 50) {
    return db.prompt.findMany({
      where: { workspaceId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  static async update(id: string, data: Prisma.PromptUpdateInput) {
    return db.prompt.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return db.prompt.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
