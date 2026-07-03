import { respond } from "@/lib/api-response";
import { NotificationService } from "@/services/backend/notification.service";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const notification = await NotificationService.getNotification(id);
    return respond.success(notification);
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
    const notification = await NotificationService.markAsRead(id);
    return respond.success(notification);
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
    await NotificationService.deleteNotification(id);
    return respond.success(null, { deleted: true });
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
    return respond.serverError(error.message);
  }
}
