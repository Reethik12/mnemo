import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { db } from "@/lib/db";
import { z } from "zod";

const CreateOrgSchema = z.object({
  name: z.string().min(1),
  billingPlan: z.enum(["FREE", "PRO", "ENTERPRISE"]).default("FREE"),
});

export async function GET() {
  try {
    const orgs = await db.organization.findMany({
      orderBy: { name: "asc" },
    });

    if (orgs.length === 0) {
      const seeded = await db.organization.create({
        data: {
          name: "Acme Corp (Default)",
          billingPlan: "ENTERPRISE",
        },
      });
      return respond.success([seeded]);
    }

    return respond.success(orgs);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateOrgSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid inputs", 400, parsed.error.format());

    const org = await db.organization.create({
      data: {
        name: parsed.data.name,
        billingPlan: parsed.data.billingPlan,
      },
    });

    return respond.success(org, "Organization registered successfully", 201);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
