import { respond } from "@/lib/api-response";
import { UserService } from "@/services/backend/user.service";
import { UserUpdateSchema } from "@/validators";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await UserService.getUser(id);
    return respond.success(user);
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
    const parsed = UserUpdateSchema.safeParse(body);
    if (!parsed.success)
      return respond.error("Invalid input", 400, parsed.error.format());
    const user = await UserService.updateUser(id, parsed.data);
    return respond.success(user);
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
    await UserService.deleteUser(id);
    return respond.success(null, { deleted: true });
  } catch (e: unknown) {
    const error = e as Error;
    if (error.name === "NotFoundError") return respond.notFound(error.message);
    return respond.serverError(error.message);
  }
}
