import { NextResponse } from "next/server";
import { permissionsService } from "@/services/permissions/permissions.service";

export async function GET() {
  try {
    const spaces = await permissionsService.getSpaces();
    return NextResponse.json(spaces);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch spaces" },
      { status: 500 },
    );
  }
}
