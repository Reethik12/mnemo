import { respond } from "@/lib/api-response";

export async function GET() {
  return respond.success([], null, 200); // Placeholder for users list
}
