import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class MemoryRepository {
  static async create(data: Prisma.MemoryUncheckedCreateInput) {
    return db.memory.create({ data });
  }

  static async findById(id: string) {
    return db.memory.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static async findAllByWorkspace(workspaceId: string, skip = 0, take = 50) {
    return db.memory.findMany({
      where: { workspaceId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  static async update(id: string, data: Prisma.MemoryUpdateInput) {
    return db.memory.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return db.memory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
