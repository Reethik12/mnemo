import { respond } from "@/lib/api-response";
import { ConversationService } from "@/services/backend/conversation.service";
import { ConversationUpdateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const conversation = await ConversationService.getConversation(id);
    return respond.success(conversation);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") {
      return respond.notFound(error.message);
    }
    return respond.serverError(error.message);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = ConversationUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return respond.error("Invalid input", 400, parsed.error.format());
    }

    const conversation = await ConversationService.updateConversation(
      id,
      parsed.data,
    );
    return respond.success(conversation);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") {
      return respond.notFound(error.message);
    }
    return respond.serverError(error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await ConversationService.deleteConversation(id);
    return respond.success(null, { deleted: true });
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") {
      return respond.notFound(error.message);
    }
    return respond.serverError(error.message);
  }
}
