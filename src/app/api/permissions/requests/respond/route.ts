import { NextResponse } from "next/server";
import { permissionsService } from "@/services/permissions/permissions.service";

export async function POST(req: Request) {
  try {
    const { requestId, action } = await req.json();
    if (!requestId || (action !== "approve" && action !== "reject")) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const success =
      action === "approve"
        ? await permissionsService.approveRequest(requestId)
        : await permissionsService.rejectRequest(requestId);

    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  } catch {
    return NextResponse.json(
      { error: "Failed to respond to request" },
      { status: 500 },
    );
  }
}
