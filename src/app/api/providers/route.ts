import { respond } from "@/lib/api-response";
import { ProviderService } from "@/services/backend/provider.service";
import { ProviderCreateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ProviderCreateSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid input", 400, parsed.error.format());

    const provider = await ProviderService.createProvider(parsed.data);
    return respond.success(provider, null, 201);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}

export async function GET() {
  try {
    const providers = await ProviderService.getAllProviders();
    return respond.success(providers);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}
