import { respond } from "@/lib/api-response";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const plugins = await db.plugin.findMany({
      orderBy: { name: "asc" },
    });

    // Seed defaults if empty
    if (plugins.length === 0) {
      const defaultPlugin = await db.plugin.create({
        data: {
          name: "Slack Integration Connector",
          description: "Sync slack channel updates to Mnemo memory layers.",
          version: "1.0.0",
          isActive: true,
        },
      });
      return respond.success([defaultPlugin]);
    }

    return respond.success(plugins);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
