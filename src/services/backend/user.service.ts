import { UserRepository } from "@/repositories/user.repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";

export class UserService {
  static async getUser(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  static async updateUser(id: string, data: Prisma.UserUpdateInput) {
    const user = await UserRepository.findById(id);
    if (!user) throw new NotFoundError("User not found");
    return UserRepository.update(id, data);
  }

  static async deleteUser(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) throw new NotFoundError("User not found");
    return UserRepository.delete(id);
  }
}
