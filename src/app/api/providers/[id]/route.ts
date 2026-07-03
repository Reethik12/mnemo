import { respond } from "@/lib/api-response";
import { ProviderService } from "@/services/backend/provider.service";
import { ProviderUpdateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const provider = await ProviderService.getProvider(id);
    return respond.success(provider);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
    return respond.serverError(error.message);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = ProviderUpdateSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid input", 400, parsed.error.format());
    const provider = await ProviderService.updateProvider(id, parsed.data);
    return respond.success(provider);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
    return respond.serverError(error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await ProviderService.deleteProvider(id);
    return respond.success(null, { deleted: true });
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
    return respond.serverError(error.message);
  }
}
