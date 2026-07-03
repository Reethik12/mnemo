import { respond } from "@/lib/api-response";
import { MemoryService } from "@/services/backend/memory.service";
import { MemoryCreateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = MemoryCreateSchema.safeParse(body);

    if (!parsed.success) {
      return respond.error("Invalid input", 400, parsed.error.format());
    }

    const memory = await MemoryService.createMemory(parsed.data.workspaceId, {
      title: parsed.data.title,
      content: parsed.data.content,
      tags: parsed.data.tags,
      metadata: parsed.data.metadata || {},
    });

    return respond.success(memory, null, 201);
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
    const memories = await MemoryService.getMemoriesByWorkspace(
      workspaceId,
      page,
    );

    return respond.success(memories);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}
