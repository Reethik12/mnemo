import { SettingsRepository } from "@/repositories/settings.repository";
import { Prisma } from "@prisma/client";

export class SettingsService {
  static async updateSettings(
    userId: string,
    data: Omit<Prisma.SettingsUncheckedCreateWithoutUserInput, "userId">,
  ) {
    return SettingsRepository.upsert(userId, data);
  }

  static async getSettings(userId: string) {
    const settings = await SettingsRepository.findByUserId(userId);
    if (!settings) {
      // Return default settings if none exist yet
      return { theme: "system", language: "en" };
    }
    return settings;
  }
}
