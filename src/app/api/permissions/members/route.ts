import { NextResponse } from "next/server";
import { permissionsService } from "@/services/permissions/permissions.service";
import {
  removeSpaceMember,
  changeSpaceMemberRole,
  addSpaceMember,
} from "@/services/permissions/mock-data";
import { addAuditLog } from "@/services/digital-twin/mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const members = await permissionsService.getSpaceMembers("space-work");
    return NextResponse.json(members);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const newMember = {
      id: `mem-${Date.now()}`,
      userId: `user-${Date.now()}`,
      userName: email.split("@")[0],
      userEmail: email,
      role: "viewer" as const,
      joinedAt: new Date().toISOString(),
    };
    addSpaceMember("space-work", newMember);
    addAuditLog(
      "grant",
      "Workspace",
      "Current User",
      `Invited ${email} to Workspace`,
    );
    return NextResponse.json({ success: true, member: newMember });
  } catch {
    return NextResponse.json(
      { error: "Failed to invite member" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId, role } = await req.json();
    if (!userId || !role) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    changeSpaceMemberRole("space-work", userId, role);
    addAuditLog(
      "improve",
      "Workspace",
      "Current User",
      `Changed role for ${userId} to ${role}`,
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }
    removeSpaceMember("space-work", userId);
    addAuditLog(
      "remove",
      "Workspace",
      "Current User",
      `Removed ${userId} from Workspace`,
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to remove member" },
      { status: 500 },
    );
  }
}
