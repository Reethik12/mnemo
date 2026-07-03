import { NextRequest } from "next/server";
import { respond } from "@/lib/api-response";
import { NotificationService } from "@/services/backend/notification.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return respond.error("userId is required");
    const page = parseInt(searchParams.get("page") || "1");
    const notifications = await NotificationService.getNotificationsByUser(
      userId,
      page,
    );
    return respond.success(notifications);
  } catch (e: unknown) {
    const error = e as Error;
    return respond.serverError(error.message);
  }
}
