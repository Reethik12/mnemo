import { respond } from "@/lib/api-response";
import { ConversationService } from "@/services/backend/conversation.service";
import { ConversationCreateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ConversationCreateSchema.safeParse(body);

    if (!parsed.success) {
      return respond.error("Invalid input", 400, parsed.error.format());
    }

    const conversation = await ConversationService.createConversation(
      parsed.data.workspaceId,
      {
        title: parsed.data.title,
        modelId: parsed.data.modelId,
      },
    );

    return respond.success(conversation, null, 201);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");

    if (!workspaceId) {
      return respond.error("workspaceId is required");
    }

    const page = parseInt(searchParams.get("page") || "1");
    const conversations = await ConversationService.getConversationsByWorkspace(
      workspaceId,
      page,
    );

    return respond.success(conversations);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}
