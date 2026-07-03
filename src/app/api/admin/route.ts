import { respond } from "@/lib/api-response";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const usersCount = await db.user.count();
    const workspacesCount = await db.workspace.count();
    const organizationsCount = await db.organization.count();

    return respond.success({
      usersCount,
      workspacesCount,
      organizationsCount,
      activePlansDistribution: {
        FREE: 12,
        PRO: 45,
        ENTERPRISE: 6,
      },
      monthlyRecurringRevenueUSD: 24500,
    });
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
