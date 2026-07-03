import { DecisionRepository } from "@/repositories/decision.repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";

export class DecisionService {
  /**
   * Seed default schedules and recommendations for a workspace
   */
  static async seedDefaults(workspaceId: string, agentId: string) {
    const existing =
      await DecisionRepository.findSchedulesByWorkspace(workspaceId);
    if (existing.length > 0) return;

    await DecisionRepository.createSchedule({
      workspaceId,
      agentId,
      cron: "0 0 * * *", // Daily
      taskType: "Memory Clean-up & Tag Refinement",
      isActive: true,
    });
  }

  static async logDecision(
    workspaceId: string,
    agentId: string,
    action: string,
    confidence: number,
    riskScore: number,
    policy = "HIGH_RISK_ONLY",
    metadata: Record<string, unknown> = {},
  ) {
    const status =
      policy === "ALWAYS_ASK" ||
      (policy === "HIGH_RISK_ONLY" && riskScore > 0.6)
        ? "PENDING_APPROVAL"
        : "BYPASSED";

    return DecisionRepository.createDecision({
      workspaceId,
      agentId,
      action,
      confidence,
      riskScore,
      status,
      policy,
      metadata: metadata as Prisma.InputJsonValue,
    });
  }

  static async getDecisions(workspaceId: string) {
    return DecisionRepository.findDecisionsByWorkspace(workspaceId);
  }

  static async approveDecision(id: string) {
    const dec = await DecisionRepository.findDecisionById(id);
    if (!dec) throw new NotFoundError("Decision not found");
    return DecisionRepository.updateDecisionStatus(id, "APPROVED");
  }

  static async rejectDecision(id: string) {
    const dec = await DecisionRepository.findDecisionById(id);
    if (!dec) throw new NotFoundError("Decision not found");
    return DecisionRepository.updateDecisionStatus(id, "REJECTED");
  }

  // --- Schedules ---

  static async getSchedules(workspaceId: string) {
    return DecisionRepository.findSchedulesByWorkspace(workspaceId);
  }

  static async createSchedule(
    workspaceId: string,
    agentId: string,
    cron: string,
    taskType: string,
  ) {
    return DecisionRepository.createSchedule({
      workspaceId,
      agentId,
      cron,
      taskType,
      isActive: true,
    });
  }

  static async toggleSchedule(id: string, isActive: boolean) {
    return DecisionRepository.updateScheduleActive(id, isActive);
  }

  static async deleteSchedule(id: string) {
    return DecisionRepository.deleteSchedule(id);
  }

  // --- Mock Recommendations ---

  static async getRecommendations() {
    return [
      {
        id: "rec_1",
        title: "Consolidate 3 duplicate memory entities",
        description:
          "Found similar memories for 'Project Alpha kickoff plan'. Merging them saves storage and improves RAG accuracy.",
        type: "cleanup" as const,
        confidence: 0.94,
      },
      {
        id: "rec_2",
        title: "Refine prompts variables schemas",
        description:
          "Prompt 'Email consolidate' has missing descriptions for its context parameters.",
        type: "organization" as const,
        confidence: 0.81,
      },
    ];
  }
}
