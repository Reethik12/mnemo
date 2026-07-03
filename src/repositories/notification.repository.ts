import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class NotificationRepository {
  static async create(data: Prisma.NotificationUncheckedCreateInput) {
    return db.notification.create({ data });
  }

  static async findById(id: string) {
    return db.notification.findUnique({
      where: { id },
    });
  }

  static async findAllByUserId(userId: string, skip = 0, take = 20) {
    return db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  static async markAsRead(id: string) {
    return db.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  static async delete(id: string) {
    return db.notification.delete({
      where: { id },
    });
  }
}
