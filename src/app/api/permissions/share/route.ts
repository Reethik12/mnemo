import { NextResponse } from "next/server";
import { permissionsService } from "@/services/permissions/permissions.service";
import type { PermissionLevel } from "@/services/permissions/types";

export async function POST(req: Request) {
  try {
    const { spaceId, level } = await req.json();
    if (!spaceId || !level) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const link = await permissionsService.generateShareLink(
      spaceId,
      level as PermissionLevel,
    );
    return NextResponse.json(link);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate share link" },
      { status: 500 },
    );
  }
}
