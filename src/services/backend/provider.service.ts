import { ProviderRepository } from "@/repositories/provider.repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";

export class ProviderService {
  static async createProvider(data: Prisma.ProviderCreateInput) {
    return ProviderRepository.create(data);
  }

  static async getProvider(id: string) {
    const provider = await ProviderRepository.findById(id);
    if (!provider) throw new NotFoundError("Provider not found");
    return provider;
  }

  static async getAllProviders() {
    return ProviderRepository.findAll();
  }

  static async updateProvider(id: string, data: Prisma.ProviderUpdateInput) {
    const provider = await ProviderRepository.findById(id);
    if (!provider) throw new NotFoundError("Provider not found");
    return ProviderRepository.update(id, data);
  }

  static async deleteProvider(id: string) {
    const provider = await ProviderRepository.findById(id);
    if (!provider) throw new NotFoundError("Provider not found");
    return ProviderRepository.delete(id);
  }
}
