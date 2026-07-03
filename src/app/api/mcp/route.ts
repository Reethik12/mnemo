import { respond } from "@/lib/api-response";
import { MCPServer } from "@/lib/mcp/server";

export async function GET() {
  try {
    const tools = MCPServer.getTools();
    return respond.success(tools);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
