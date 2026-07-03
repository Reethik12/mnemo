import { respond } from "@/lib/api-response";
import { SettingsService } from "@/services/backend/settings.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return respond.error("userId is required");
    const settings = await SettingsService.getSettings(userId);
    return respond.success(settings);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return respond.error("userId is required");
    const body = await req.json();
    const settings = await SettingsService.updateSettings(userId, body);
    return respond.success(settings);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}
