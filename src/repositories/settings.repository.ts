import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class SettingsRepository {
  static async upsert(
    userId: string,
    data: Prisma.SettingsUncheckedCreateWithoutUserInput,
  ) {
    return db.settings.upsert({
      where: { userId },
      update: data,
      create: { ...data, userId },
    });
  }

  static async findByUserId(userId: string) {
    return db.settings.findUnique({
      where: { userId },
    });
  }
}
