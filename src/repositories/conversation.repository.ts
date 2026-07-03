import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class ConversationRepository {
  static async create(data: Prisma.ConversationUncheckedCreateInput) {
    return db.conversation.create({ data });
  }

  static async findById(id: string) {
    return db.conversation.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static async findAllByWorkspace(workspaceId: string, skip = 0, take = 50) {
    return db.conversation.findMany({
      where: { workspaceId, deletedAt: null },
      orderBy: { updatedAt: "desc" },
      skip,
      take,
    });
  }

  static async update(id: string, data: Prisma.ConversationUpdateInput) {
    return db.conversation.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return db.conversation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
