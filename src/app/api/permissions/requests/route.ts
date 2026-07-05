import { NextResponse } from "next/server";
import { permissionsService } from "@/services/permissions/permissions.service";

export async function GET() {
  try {
    const requests = await permissionsService.getAccessRequests();
    return NextResponse.json(requests);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 },
    );
  }
}
