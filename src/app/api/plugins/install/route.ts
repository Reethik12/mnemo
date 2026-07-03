import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { db } from "@/lib/db";
import { z } from "zod";

const InstallSchema = z.object({
  id: z.string().uuid(),
  isActive: z.boolean(),
});

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = InstallSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const updated = await db.plugin.update({
      where: { id: parsed.data.id },
      data: { isActive: parsed.data.isActive },
    });

    return respond.success(updated);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
