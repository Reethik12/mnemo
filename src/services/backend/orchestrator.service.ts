import { OrchestratorRepository } from "@/repositories/orchestrator.repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { type WorkflowStep } from "@/types/orchestrator";

export class OrchestratorService {
  /**
   * Seed default workflows for a workspace
   */
  static async seedDefaultWorkflows(workspaceId: string) {
    const existing =
      await OrchestratorRepository.findWorkflowsByWorkspace(workspaceId);
    if (existing.length > 0) return existing;

    const defaultSteps: WorkflowStep[] = [
      {
        id: "step_1",
        agentId: "default_seed_agent_1", // Alex or generic Assistant
        action: "Query workspace changes",
        status: "READY",
      },
      {
        id: "step_2",
        agentId: "default_seed_agent_2", // Mnemo Core
        action: "Organize duplicate categories",
        dependsOn: ["step_1"],
        status: "PENDING",
      },
    ];

    const w = await OrchestratorRepository.createWorkflow({
      workspaceId,
      name: "Knowledge Consolidator Workflow",
      status: "IDLE",
      steps: defaultSteps as unknown as Prisma.InputJsonValue,
      checkpoint: Prisma.JsonNull,
    });

    await OrchestratorRepository.logHistory(
      workspaceId,
      w.id,
      "Workflow Seeded",
      { stepsCount: 2 },
    );
    return [w];
  }

  static async createWorkflow(
    workspaceId: string,
    name: string,
    steps: WorkflowStep[],
  ) {
    const w = await OrchestratorRepository.createWorkflow({
      workspaceId,
      name,
      status: "IDLE",
      steps: steps as unknown as Prisma.InputJsonValue,
      checkpoint: Prisma.JsonNull,
    });

    await OrchestratorRepository.logHistory(
      workspaceId,
      w.id,
      "Workflow Created",
    );
    return w;
  }

  static async getWorkflow(id: string) {
    const w = await OrchestratorRepository.findWorkflowById(id);
    if (!w) throw new NotFoundError("Workflow not found");
    return w;
  }

  static async getWorkflowsByWorkspace(workspaceId: string) {
    await this.seedDefaultWorkflows(workspaceId);
    return OrchestratorRepository.findWorkflowsByWorkspace(workspaceId);
  }

  static async updateWorkflowStep(
    id: string,
    stepId: string,
    status: "PENDING" | "READY" | "RUNNING" | "COMPLETED" | "FAILED",
    result?: Record<string, unknown>,
  ) {
    const w = await OrchestratorRepository.findWorkflowById(id);
    if (!w) throw new NotFoundError("Workflow not found");

    const steps = w.steps as unknown as WorkflowStep[] as WorkflowStep[];
    const updatedSteps = steps.map((s) => {
      if (s.id === stepId) {
        return { ...s, status, result };
      }
      return s;
    });

    // If step completed, update subsequent dependent steps status
    if (status === "COMPLETED") {
      for (const s of updatedSteps) {
        if (s.status === "PENDING" && s.dependsOn?.includes(stepId)) {
          const clearedDeps = s.dependsOn.filter((d) => {
            const depStep = updatedSteps.find((x) => x.id === d);
            return depStep?.status !== "COMPLETED";
          });
          if (clearedDeps.length === 0) {
            s.status = "READY";
          }
        }
      }
    }

    // Determine overall status
    const allDone = updatedSteps.every((s) => s.status === "COMPLETED");
    const anyFailed = updatedSteps.some((s) => s.status === "FAILED");
    const workflowStatus = anyFailed
      ? "FAILED"
      : allDone
        ? "COMPLETED"
        : "RUNNING";

    const checkpoint = {
      lastStepId: stepId,
      lastStepStatus: status,
      timestamp: new Date().toISOString(),
    };

    const updated = await OrchestratorRepository.updateWorkflow(id, {
      steps: updatedSteps as unknown as Prisma.InputJsonValue,
      status: workflowStatus,
      checkpoint: checkpoint as unknown as Prisma.InputJsonValue,
    });

    await OrchestratorRepository.logHistory(
      w.workspaceId,
      id,
      `Step ${stepId} status: ${status}`,
      { checkpoint },
    );

    return updated;
  }

  static async getHistory(workflowId: string) {
    return OrchestratorRepository.findHistoryByWorkflow(workflowId);
  }
}
