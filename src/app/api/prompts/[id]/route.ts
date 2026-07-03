import { respond } from "@/lib/api-response";
import { PromptService } from "@/services/backend/prompt.service";
import { PromptUpdateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const prompt = await PromptService.getPrompt(id);
    return respond.success(prompt);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
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
    const parsed = PromptUpdateSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid input", 400, parsed.error.format());
    const prompt = await PromptService.updatePrompt(id, parsed.data);
    return respond.success(prompt);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
    return respond.serverError(error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await PromptService.deletePrompt(id);
    return respond.success(null, { deleted: true });
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
    return respond.serverError(error.message);
  }
}
