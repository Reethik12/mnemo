import { respond } from "@/lib/api-response";
import { PromptService } from "@/services/backend/prompt.service";
import { PromptCreateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = PromptCreateSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid input", 400, parsed.error.format());

    const prompt = await PromptService.createPrompt(parsed.data.workspaceId, {
      title: parsed.data.title,
      content: parsed.data.content,
      variables: parsed.data.variables,
    });
    return respond.success(prompt, null, 201);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    if (!workspaceId) return respond.error("workspaceId is required");
    const page = parseInt(searchParams.get("page") || "1");
    const prompts = await PromptService.getPromptsByWorkspace(
      workspaceId,
      page,
    );
    return respond.success(prompts);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}
