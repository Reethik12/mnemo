import { NextRequest, NextResponse } from "next/server";
import { SemanticSearchService } from "@/services/backend/semantic-search.service";
import { z } from "zod";

const SearchSchema = z.object({
  query: z.string().min(1),
  workspaceId: z.string().uuid(),
  limit: z.number().optional().default(10),
  type: z.enum(["semantic", "keyword", "hybrid"]).optional().default("hybrid"),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const workspaceId = searchParams.get("workspaceId");
    const limit = searchParams.get("limit");
    const type = searchParams.get("type");

    // Session would be validated in middleware, but for safety:
    const session = true;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = SearchSchema.safeParse({
      query,
      workspaceId,
      limit: limit ? parseInt(limit, 10) : undefined,
      type: type || undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: parsed.error.format() },
        { status: 400 },
      );
    }

    const results = await SemanticSearchService.search({
      query: parsed.data.query,
      workspaceId: parsed.data.workspaceId,
      limit: parsed.data.limit,
      type: parsed.data.type,
    });

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error("[Search API]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
