import { ConversationRepository } from "@/repositories/conversation.repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { RealtimeServer } from "@/lib/realtime/server";

export class ConversationService {
  static async createConversation(
    workspaceId: string,
    data: Omit<
      Prisma.ConversationUncheckedCreateWithoutWorkspaceInput,
      "messages"
    >,
  ) {
    const con = await ConversationRepository.create({
      ...data,
      messages: [],
      workspaceId,
    });

    // Broadcast event
    RealtimeServer.broadcast({
      type: "ConversationCreated",
      workspaceId,
      payload: { id: con.id, workspaceId, title: con.title },
      timestamp: new Date().toISOString(),
    });

    return con;
  }

  static async getConversation(id: string) {
    const conversation = await ConversationRepository.findById(id);
    if (!conversation) throw new NotFoundError("Conversation not found");
    return conversation;
  }

  static async getConversationsByWorkspace(
    workspaceId: string,
    page = 1,
    limit = 50,
  ) {
    const skip = (page - 1) * limit;
    return ConversationRepository.findAllByWorkspace(workspaceId, skip, limit);
  }

  static async updateConversation(
    id: string,
    data: Prisma.ConversationUpdateInput,
  ) {
    const conversation = await ConversationRepository.findById(id);
    if (!conversation) throw new NotFoundError("Conversation not found");
    const con = await ConversationRepository.update(id, data);

    // Broadcast event
    RealtimeServer.broadcast({
      type: "ConversationUpdated",
      workspaceId: con.workspaceId,
      payload: { id: con.id, workspaceId: con.workspaceId, title: con.title },
      timestamp: new Date().toISOString(),
    });

    return con;
  }

  static async deleteConversation(id: string) {
    const conversation = await ConversationRepository.findById(id);
    if (!conversation) throw new NotFoundError("Conversation not found");
    return ConversationRepository.delete(id);
  }
}
