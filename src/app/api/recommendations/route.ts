import { respond } from "@/lib/api-response";
import { DecisionService } from "@/services/backend/decision.service";

export async function GET() {
  try {
    const recs = await DecisionService.getRecommendations();
    return respond.success(recs);
  } catch (e: unknown) {
    return respond.serverError((e as Error).message);
  }
}
