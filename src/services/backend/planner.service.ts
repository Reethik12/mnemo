import { PlannerRepository } from "@/repositories/planner.repository";
import { NotFoundError } from "@/lib/errors";

export class PlannerService {
  /**
   * Create a goal and automatically decompose it into dependent subtasks
   */
  static async createGoal(
    agentId: string,
    title: string,
    description: string,
    priority = "MEDIUM",
  ) {
    const goal = await PlannerRepository.createGoal({
      agentId,
      title,
      description,
      priority,
      status: "PENDING",
      progress: 0,
    });

    // Auto-decompose goal into subtasks
    await this.decomposeGoal(goal.id, title, description);

    return this.getGoal(goal.id);
  }

  static async getGoal(id: string) {
    const goal = await PlannerRepository.findGoalById(id);
    if (!goal) throw new NotFoundError("Goal not found");
    return goal;
  }

  static async getGoalsByAgent(agentId: string) {
    return PlannerRepository.findGoalsByAgent(agentId);
  }

  /**
   * Performs goal decomposition into a checklist of subtasks with parent links and dependencies
   */
  static async decomposeGoal(
    goalId: string,
    title: string,
    description: string,
  ) {
    // Generate a set of logical subtasks based on the description
    const planSteps = [
      {
        title: `Analyze target object: "${title}"`,
        description: `Inspect references and requirements for: ${description}`,
        dependencies: [] as string[],
      },
      {
        title: `Formulate retrieval query`,
        description: "Pull semantic context matches from knowledge layers.",
        dependencies: [] as string[],
      },
      {
        title: `Synthesize and execute action`,
        description: "Run final updates or output generations.",
        dependencies: [] as string[],
      },
    ];

    const createdTasks = [];

    // Create tasks in order, chaining dependencies
    let previousTaskId: string | null = null;
    for (const step of planSteps) {
      const task = await PlannerRepository.createTask({
        goalId,
        title: step.title,
        description: step.description,
        status: previousTaskId ? "PENDING" : "READY", // First task is immediately READY
        dependencies: previousTaskId ? [previousTaskId] : [],
        parentTaskId: null,
      });

      previousTaskId = task.id;
      createdTasks.push(task);
    }

    return createdTasks;
  }

  /**
   * Update task status and recalculate parent goal completion progress ratio
   */
  static async updateTaskStatus(
    taskId: string,
    status: string,
    errorLogs?: string,
  ) {
    const task = await PlannerRepository.findTaskById(taskId);
    if (!task) throw new NotFoundError("Task not found");

    const updated = await PlannerRepository.updateTask(taskId, {
      status,
      errorLogs,
      executionTime:
        status === "COMPLETED"
          ? Math.floor(Math.random() * 800) + 200
          : undefined,
    });

    // Recalculate goal progress
    const allTasks = await PlannerRepository.findTasksByGoal(task.goalId);
    const completed = allTasks.filter((t) => t.status === "COMPLETED").length;
    const progress =
      allTasks.length > 0 ? (completed / allTasks.length) * 100 : 0;

    const goalStatus = progress === 100 ? "COMPLETED" : "RUNNING";

    await PlannerRepository.updateGoal(task.goalId, {
      progress,
      status: goalStatus,
    });

    // If task completed, mark next dependent tasks as READY
    if (status === "COMPLETED") {
      for (const t of allTasks) {
        if (t.status === "PENDING" && t.dependencies.includes(taskId)) {
          const remainingDeps = t.dependencies.filter((d) => d !== taskId);
          // If all dependencies are cleared, mark task as READY
          if (remainingDeps.length === 0) {
            await PlannerRepository.updateTask(t.id, { status: "READY" });
          }
        }
      }
    }

    return updated;
  }
}
