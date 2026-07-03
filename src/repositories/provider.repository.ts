import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class ProviderRepository {
  static async create(data: Prisma.ProviderCreateInput) {
    return db.provider.create({ data });
  }

  static async findById(id: string) {
    return db.provider.findUnique({
      where: { id },
    });
  }

  static async findAll() {
    return db.provider.findMany({
      orderBy: { name: "asc" },
    });
  }

  static async update(id: string, data: Prisma.ProviderUpdateInput) {
    return db.provider.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return db.provider.delete({
      where: { id },
    });
  }
}
