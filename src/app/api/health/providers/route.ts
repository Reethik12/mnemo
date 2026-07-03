import { NextResponse } from "next/server";
import { ProviderFactory } from "@/lib/ai/provider-factory";

export async function GET() {
  try {
    const provider = ProviderFactory.getProvider("openai");
    const isHealthy = provider ? await provider.health() : false;
    return NextResponse.json({
      status: isHealthy ? "healthy" : "unhealthy",
      provider: "openai",
      available: !!provider,
    });
  } catch (err) {
    return NextResponse.json(
      { status: "unhealthy", error: (err as Error).message },
      { status: 500 },
    );
  }
}
