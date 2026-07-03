import { apiClient } from "@/lib/api-client";
import {
  PromptCategory,
  PromptTemplate,
  PromptHistory,
  PromptSession,
  PromptStatistics,
  PromptVariables,
} from "@/types/prompt";

const WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";

function toTemplate(p: unknown): PromptTemplate {
  const t = p as {
    id: string;
    title: string;
    content: string;
    variables: string[];
    createdAt: string;
    updatedAt: string;
  };
  return {
    id: t.id,
    title: t.title,
    description: "",
    content: t.content,
    categoryId: "cat-1",
    tags: [],
    variables: t.variables || [],

    isFavorite: false,

    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
}

export class PromptEngineService {
  static async loadCategories(): Promise<PromptCategory[]> {
    return [{ id: "cat-1", name: "Development", icon: "code" }];
  }

  static async loadTemplates(_categoryId?: string): Promise<PromptTemplate[]> {
    const data = await apiClient.get<unknown[]>(
      `/api/prompts?workspaceId=${WORKSPACE_ID}`,
    );
    return data.map(toTemplate);
  }

  static async loadTemplate(id: string): Promise<PromptTemplate | null> {
    try {
      const p = await apiClient.get<unknown>(`/api/prompts/${id}`);
      return toTemplate(p);
    } catch {
      return null;
    }
  }

  static async createTemplate(
    template: Partial<PromptTemplate>,
  ): Promise<PromptTemplate> {
    const p = await apiClient.post<unknown>("/api/prompts", {
      workspaceId: WORKSPACE_ID,
      title: template.title || "New Template",
      content: template.content || "",
      variables: (template.variables || []) as string[],
    });
    return toTemplate(p);
  }

  static async updateTemplate(
    id: string,
    updates: Partial<PromptTemplate>,
  ): Promise<PromptTemplate> {
    const p = await apiClient.patch<unknown>(`/api/prompts/${id}`, {
      title: updates.title,
      content: updates.content,
      variables: (updates.variables || []) as string[],
    });
    return toTemplate(p);
  }

  static async deleteTemplate(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/prompts/${id}`);
  }

  static async toggleFavorite(
    id: string,
    isFavorite: boolean,
  ): Promise<PromptTemplate> {
    const template = await this.loadTemplate(id);
    if (!template) throw new Error("Not found");
    return { ...template, isFavorite };
  }

  static async duplicateTemplate(id: string): Promise<PromptTemplate> {
    const original = await this.loadTemplate(id);
    if (!original) throw new Error("Template not found");
    return this.createTemplate({
      ...original,
      title: `${original.title} (Copy)`,
    });
  }

  static async loadHistory(): Promise<PromptHistory[]> {
    return [];
  }

  static async loadStatistics(): Promise<PromptStatistics> {
    const prompts = await apiClient.get<unknown[]>(
      `/api/prompts?workspaceId=${WORKSPACE_ID}`,
    );
    return {
      totalTemplates: prompts.length,
      totalExecutions: 0,
    } as unknown as PromptStatistics;
  }

  static async startSession(templateId: string): Promise<PromptSession> {
    const template = await this.loadTemplate(templateId);
    if (!template) throw new Error("Template not found");
    return {
      id: `session-${Date.now()}`,
      templateId,
      templateSnapshot: template,
      variables: {},
      contextDocs: [],
      estimatedTokens: 0,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    } as unknown as PromptSession;
  }

  static async loadContextMemories(): Promise<unknown[]> {
    return [];
  }
  static async loadSuggestions(): Promise<string[]> {
    return [];
  }
  static buildPrompt(
    _rawContent: string,
    _activeVariables: PromptVariables,
    _selectedContextIds: string[],
  ): string {
    return _rawContent;
  }
  static async estimateTokens(
    _rawContent: string,
    _selectedContextIds: string[],
  ): Promise<{ tokens: number }> {
    return { tokens: 0 };
  }
  static async saveTemplate(_data: unknown): Promise<PromptTemplate> {
    return {} as unknown as PromptTemplate;
  }
}
