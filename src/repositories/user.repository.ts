import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class UserRepository {
  static async findById(id: string) {
    return db.user.findUnique({
      where: { id },
      include: { settings: true },
    });
  }

  static async findByEmail(email: string) {
    return db.user.findUnique({
      where: { email },
    });
  }

  static async update(id: string, data: Prisma.UserUpdateInput) {
    return db.user.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return db.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
