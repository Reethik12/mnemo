import { respond } from "@/lib/api-response";
import { MemoryService } from "@/services/backend/memory.service";
import { MemoryUpdateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const memory = await MemoryService.getMemory(id);
    return respond.success(memory);
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
    const parsed = MemoryUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return respond.error("Invalid input", 400, parsed.error.format());
    }

    const memory = await MemoryService.updateMemory(id, parsed.data);
    return respond.success(memory);
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
    await MemoryService.deleteMemory(id);
    return respond.success(null, { deleted: true });
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") {
      return respond.notFound(error.message);
    }
    return respond.serverError(error.message);
  }
}
