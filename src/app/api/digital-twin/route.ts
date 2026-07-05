import { NextResponse } from "next/server";
import { digitalTwinService } from "@/services/digital-twin/digital-twin.service";

export async function GET() {
  try {
    const stats = await digitalTwinService.getStats();
    const security = await digitalTwinService.getSecurityMetrics();
    const audit = await digitalTwinService.getAuditLogs();

    return NextResponse.json({ stats, security, audit });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch twin data" },
      { status: 500 },
    );
  }
}
