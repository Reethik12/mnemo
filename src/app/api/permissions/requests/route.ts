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

export async function POST(req: Request) {
  try {
    const { spaceId, reason } = await req.json();
    if (!spaceId) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    await permissionsService.createAccessRequest(spaceId, reason || "");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 },
    );
  }
}
