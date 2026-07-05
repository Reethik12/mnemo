import { NextResponse } from "next/server";
import { compareMemoryVersions } from "@/services/timeline/replay.service";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const v1 = searchParams.get("v1");
    const v2 = searchParams.get("v2");

    if (!id || !v1 || !v2)
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );

    const compareResult = await compareMemoryVersions(id, v1, v2);
    if (!compareResult)
      return NextResponse.json(
        { error: "Compare result not found" },
        { status: 404 },
      );

    return NextResponse.json(compareResult);
  } catch (error) {
    console.error("[API] Compare get error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
