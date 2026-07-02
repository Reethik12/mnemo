import {
  PromptTemplate,
  PromptCategory,
  PromptHistory,
  ContextMemory,
  PromptSuggestion,
  PromptVariables,
  TokenEstimate,
  PromptStatistics,
} from "@/types/prompt";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_CATEGORIES: PromptCategory[] = [
  { id: "c1", name: "Writing", color: "#3B82F6", icon: "✍️" },
  { id: "c2", name: "Coding", color: "#10B981", icon: "💻" },
  { id: "c3", name: "Analysis", color: "#8B5CF6", icon: "📊" },
  { id: "c4", name: "Brainstorming", color: "#F59E0B", icon: "🧠" },
  { id: "c5", name: "Summarization", color: "#EF4444", icon: "📝" },
  { id: "c6", name: "Translation", color: "#EC4899", icon: "🌍" },
  { id: "c7", name: "Review", color: "#6366F1", icon: "👀" },
  { id: "c8", name: "Roleplay", color: "#14B8A6", icon: "🎭" },
  { id: "c9", name: "Extraction", color: "#F97316", icon: "⛏️" },
  { id: "c10", name: "Custom", color: "#64748B", icon: "⚙️" },
];

const generateMockTemplates = (): PromptTemplate[] => {
  return Array.from({ length: 25 }, (_, i) => ({
    id: `tpl-${i}`,
    title: `Template ${i + 1}`,
    description: `A mock template for testing prompt generation ${i + 1}.`,
    content: `This is a template that uses {{variable1}} and {{variable2}} to generate a response about {{topic}}.`,
    categoryId: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].id,
    isFavorite: i % 4 === 0,
    tags: ["mock", "test", `tag${i}`],
    createdAt: new Date(Date.now() - (i + 5) * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
    variables: ["variable1", "variable2", "topic"],
  }));
};

const generateMockHistory = (): PromptHistory[] => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: `hist-${i}`,
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    execution: {
      promptId: `exec-${i}`,
      prompt: {
        id: `p-${i}`,
        templateId: i % 2 === 0 ? `tpl-${i % 25}` : undefined,
        content: "Raw prompt content here.",
        compiledContent:
          "Compiled prompt content here with variables injected.",
        variables: { topic: "AI" },
        contextIds: [],
      },
      tokens: {
        promptTokens: 150 + (i % 50),
        contextTokens: 500,
        totalTokens: 650 + (i % 50),
        maxTokens: 8192,
        percentageUsed: 8,
        isOverLimit: false,
      },
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      modelId: "gpt-4o",
      durationMs: 1200 + i * 10,
      success: i % 10 !== 0, // 1 in 10 fails
    },
    resultPreview: "This is a preview of the generated response...",
  }));
};

const generateMockContextMemories = (): ContextMemory[] => {
  const types: Array<"note" | "document" | "webpage" | "code"> = [
    "note",
    "document",
    "webpage",
    "code",
  ];
  return Array.from({ length: 20 }, (_, i) => ({
    id: `ctx-${i}`,
    title: `Context Memory ${i + 1}`,
    summary: `A brief summary of what this context contains...`,
    tokenCount: 250 + i * 50,
    type: types[i % types.length],
    selected: false,
  }));
};

const generateMockSuggestions = (): PromptSuggestion[] => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: `sugg-${i}`,
    title: `Suggested Prompt ${i + 1}`,
    description: `A helpful suggestion for your next prompt.`,
    promptText: `Can you explain {{concept}} in simple terms?`,
    category: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].name,
  }));
};

let MOCK_TEMPLATES = generateMockTemplates();
const MOCK_HISTORY = generateMockHistory();
const MOCK_CONTEXT = generateMockContextMemories();
const MOCK_SUGGESTIONS = generateMockSuggestions();

export class PromptEngineService {
  static async loadCategories(): Promise<PromptCategory[]> {
    await delay(200);
    return [...MOCK_CATEGORIES];
  }

  static async loadTemplates(): Promise<PromptTemplate[]> {
    await delay(300);
    return [...MOCK_TEMPLATES];
  }

  static async saveTemplate(
    template: Partial<PromptTemplate> & { title: string; content: string },
  ): Promise<PromptTemplate> {
    await delay(400);
    const variables = Array.from(
      template.content.matchAll(/\{\{([^}]+)\}\}/g),
    ).map((m) => m[1]);

    if (template.id) {
      MOCK_TEMPLATES = MOCK_TEMPLATES.map((t) =>
        t.id === template.id
          ? {
              ...t,
              ...template,
              variables,
              updatedAt: new Date().toISOString(),
            }
          : t,
      );
      return MOCK_TEMPLATES.find((t) => t.id === template.id)!;
    } else {
      const newTemplate: PromptTemplate = {
        id: `tpl-${Date.now()}`,
        title: template.title,
        description: template.description || "",
        content: template.content,
        categoryId: template.categoryId || MOCK_CATEGORIES[0].id,
        isFavorite: template.isFavorite || false,
        tags: template.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        variables,
      };
      MOCK_TEMPLATES = [newTemplate, ...MOCK_TEMPLATES];
      return newTemplate;
    }
  }

  static async duplicateTemplate(id: string): Promise<PromptTemplate | null> {
    await delay(300);
    const source = MOCK_TEMPLATES.find((t) => t.id === id);
    if (!source) return null;

    const duplicate: PromptTemplate = {
      ...source,
      id: `tpl-${Date.now()}`,
      title: `${source.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
    };
    MOCK_TEMPLATES = [duplicate, ...MOCK_TEMPLATES];
    return duplicate;
  }

  static async deleteTemplate(id: string): Promise<void> {
    await delay(300);
    MOCK_TEMPLATES = MOCK_TEMPLATES.filter((t) => t.id !== id);
  }

  static async loadHistory(): Promise<PromptHistory[]> {
    await delay(400);
    return [...MOCK_HISTORY];
  }

  static async loadContextMemories(): Promise<ContextMemory[]> {
    await delay(250);
    return [...MOCK_CONTEXT];
  }

  static async loadSuggestions(): Promise<PromptSuggestion[]> {
    await delay(200);
    return [...MOCK_SUGGESTIONS];
  }

  static async loadStatistics(): Promise<PromptStatistics> {
    await delay(200);
    return {
      totalTemplates: MOCK_TEMPLATES.length,
      totalExecutions: MOCK_HISTORY.length,
      favoriteTemplates: MOCK_TEMPLATES.filter((t) => t.isFavorite).length,
      mostUsedTemplateId: MOCK_TEMPLATES[0]?.id,
      averageTokensUsed: Math.round(
        MOCK_HISTORY.reduce(
          (acc, h) => acc + h.execution.tokens.totalTokens,
          0,
        ) / (MOCK_HISTORY.length || 1),
      ),
    };
  }

  static async estimateTokens(
    text: string,
    contextIds: string[],
  ): Promise<TokenEstimate> {
    // Rough mock estimation: 1 token ~= 4 characters
    await delay(100); // Fast mock tokenization
    const promptTokens = Math.ceil(text.length / 4);
    const selectedContext = MOCK_CONTEXT.filter((c) =>
      contextIds.includes(c.id),
    );
    const contextTokens = selectedContext.reduce(
      (acc, c) => acc + c.tokenCount,
      0,
    );
    const totalTokens = promptTokens + contextTokens;
    const maxTokens = 8192; // Mock GPT-4 max context

    return {
      promptTokens,
      contextTokens,
      totalTokens,
      maxTokens,
      percentageUsed: Math.min(
        100,
        Math.round((totalTokens / maxTokens) * 100),
      ),
      isOverLimit: totalTokens > maxTokens,
    };
  }

  static buildPrompt(
    templateContent: string,
    variables: PromptVariables,
    contextIds: string[],
  ): string {
    let result = templateContent;

    // Replace variables
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
      result = result.replace(regex, String(value));
    }

    // Append context
    const selectedContext = MOCK_CONTEXT.filter((c) =>
      contextIds.includes(c.id),
    );
    if (selectedContext.length > 0) {
      result += "\n\n--- CONTEXT ---\n";
      selectedContext.forEach((ctx, idx) => {
        result += `\n[Reference ${idx + 1}: ${ctx.title}]\n${ctx.summary}\n`;
      });
    }

    return result;
  }
}
