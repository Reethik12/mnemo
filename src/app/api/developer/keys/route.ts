import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { db } from "@/lib/db";
import { z } from "zod";

const CreateKeySchema = z.object({
  workspaceId: z.string().uuid(),
  name: z.string().min(1),
  scope: z.enum(["READ_ONLY", "FULL_ACCESS"]).default("READ_ONLY"),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    if (!workspaceId) return respond.error("workspaceId is required");

    const keys = await db.aPIKey.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });

    return respond.success(keys);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateKeySchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    // Generate random prefix-based key
    const rawKey = `mnemo_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;

    const key = await db.aPIKey.create({
      data: {
        workspaceId: parsed.data.workspaceId,
        name: parsed.data.name,
        key: rawKey,
        scope: parsed.data.scope,
      },
    });

    return respond.success(key, "API key registered successfully", 201);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return respond.error("id is required");

    const deleted = await db.aPIKey.delete({
      where: { id },
    });

    return respond.success(deleted, "API key revoked successfully");
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
