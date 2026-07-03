import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class WorkspaceRepository {
  static async create(data: Prisma.WorkspaceUncheckedCreateInput) {
    return db.workspace.create({ data });
  }

  static async findById(id: string) {
    return db.workspace.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static async findAllByUserId(userId: string) {
    return db.workspace.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
  }

  static async update(id: string, data: Prisma.WorkspaceUpdateInput) {
    return db.workspace.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return db.workspace.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
