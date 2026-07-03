import { NotificationRepository } from "@/repositories/notification.repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";

export class NotificationService {
  static async createNotification(
    userId: string,
    data: Prisma.NotificationUncheckedCreateWithoutUserInput,
  ) {
    return NotificationRepository.create({ ...data, userId });
  }

  static async getNotification(id: string) {
    const notification = await NotificationRepository.findById(id);
    if (!notification) throw new NotFoundError("Notification not found");
    return notification;
  }

  static async getNotificationsByUser(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return NotificationRepository.findAllByUserId(userId, skip, limit);
  }

  static async markAsRead(id: string) {
    const notification = await NotificationRepository.findById(id);
    if (!notification) throw new NotFoundError("Notification not found");
    return NotificationRepository.markAsRead(id);
  }

  static async deleteNotification(id: string) {
    const notification = await NotificationRepository.findById(id);
    if (!notification) throw new NotFoundError("Notification not found");
    return NotificationRepository.delete(id);
  }
}
