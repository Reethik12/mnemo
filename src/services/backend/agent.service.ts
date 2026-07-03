import { AgentRepository } from "@/repositories/agent.repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { AuditLogService } from "./audit-log.service";

export class AgentService {
  /**
   * Seed default agents for a workspace if none exist
   */
  static async seedDefaultAgents(workspaceId: string, userId?: string) {
    const existing = await AgentRepository.findAllByWorkspace(workspaceId);
    if (existing.length > 0) return existing;

    const defaults: Prisma.AgentUncheckedCreateInput[] = [
      {
        name: "Alex",
        type: "ASSISTANT",
        identity: "Proactive Personal Assistant",
        description:
          "Helps you draft messages, plan objectives, and summarize memories.",
        goals: [
          "Improve user productivity",
          "Synthesize context search matches",
        ],
        instructions: [
          "Maintain a friendly and concise tone",
          "Prioritize recent workspace context",
        ],
        status: "IDLE",
        capabilities: ["Text Generation", "Context Synthesis", "Task Planning"],
        memoryScope: "workspace",
        workspaceId,
      },
      {
        name: "Mnemo Core",
        type: "SYSTEM",
        identity: "Workspace Orchestrator",
        description:
          "Monitors memory health, updates graphs, and optimizes semantic indexes.",
        goals: [
          "Clean duplicate memories",
          "Refactor knowledge node relations",
        ],
        instructions: [
          "Run operations asynchronously in the background",
          "Prompt user for approval on delete actions",
        ],
        status: "IDLE",
        capabilities: [
          "Memory De-duplication",
          "Relationship Inference",
          "Tag Generation",
        ],
        memoryScope: "workspace",
        workspaceId,
      },
    ];

    const seeded = [];
    for (const d of defaults) {
      const a = await AgentRepository.create(d);
      await AuditLogService.log(
        workspaceId,
        userId || null,
        `Agent ${a.name} Registered`,
        "Agent",
        a.id,
      );
      seeded.push(a);
    }
    return seeded;
  }

  static async createAgent(
    workspaceId: string,
    data: Omit<Prisma.AgentUncheckedCreateInput, "workspaceId">,
    userId?: string,
  ) {
    const agent = await AgentRepository.create({ ...data, workspaceId });
    await AuditLogService.log(
      workspaceId,
      userId || null,
      `Agent ${agent.name} Registered`,
      "Agent",
      agent.id,
    );
    return agent;
  }

  static async getAgent(id: string) {
    const agent = await AgentRepository.findById(id);
    if (!agent) throw new NotFoundError("Agent not found");
    return agent;
  }

  static async getAgentsByWorkspace(workspaceId: string, userId?: string) {
    // Seed defaults automatically on fetch if list is empty
    await this.seedDefaultAgents(workspaceId, userId);
    return AgentRepository.findAllByWorkspace(workspaceId);
  }

  static async updateAgent(
    id: string,
    data: Prisma.AgentUpdateInput,
    userId?: string,
  ) {
    const agent = await AgentRepository.findById(id);
    if (!agent) throw new NotFoundError("Agent not found");

    const updated = await AgentRepository.update(id, data);
    await AuditLogService.log(
      updated.workspaceId,
      userId || null,
      `Agent ${updated.name} Settings Updated`,
      "Agent",
      id,
    );
    return updated;
  }

  static async updateAgentStatus(id: string, status: string, userId?: string) {
    const agent = await AgentRepository.findById(id);
    if (!agent) throw new NotFoundError("Agent not found");

    const updated = await AgentRepository.updateStatus(id, status);
    await AuditLogService.log(
      updated.workspaceId,
      userId || null,
      `Agent ${updated.name} Status Changed to ${status}`,
      "Agent",
      id,
    );
    return updated;
  }

  static async deleteAgent(id: string, userId?: string) {
    const agent = await AgentRepository.findById(id);
    if (!agent) throw new NotFoundError("Agent not found");

    const deleted = await AgentRepository.delete(id);
    await AuditLogService.log(
      agent.workspaceId,
      userId || null,
      `Agent ${agent.name} Deleted`,
      "Agent",
      id,
    );
    return deleted;
  }
}
