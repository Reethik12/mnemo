import { PromptRepository } from "@/repositories/prompt.repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";

export class PromptService {
  static async createPrompt(
    workspaceId: string,
    data: Prisma.PromptUncheckedCreateWithoutWorkspaceInput,
  ) {
    return PromptRepository.create({ ...data, workspaceId });
  }

  static async getPrompt(id: string) {
    const prompt = await PromptRepository.findById(id);
    if (!prompt) throw new NotFoundError("Prompt not found");
    return prompt;
  }

  static async getPromptsByWorkspace(
    workspaceId: string,
    page = 1,
    limit = 50,
  ) {
    const skip = (page - 1) * limit;
    return PromptRepository.findAllByWorkspace(workspaceId, skip, limit);
  }

  static async updatePrompt(id: string, data: Prisma.PromptUpdateInput) {
    const prompt = await PromptRepository.findById(id);
    if (!prompt) throw new NotFoundError("Prompt not found");
    return PromptRepository.update(id, data);
  }

  static async deletePrompt(id: string) {
    const prompt = await PromptRepository.findById(id);
    if (!prompt) throw new NotFoundError("Prompt not found");
    return PromptRepository.delete(id);
  }
}
