"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import {
  PromptTemplate,
  PromptHistory,
  ContextMemory,
  TokenEstimate,
  PromptStatistics,
  PromptVariables,
  PromptCategory,
  PromptSuggestion,
} from "@/types/prompt";
import { PromptEngineService } from "@/services/prompt-service";

interface PromptState {
  templates: PromptTemplate[];
  categories: PromptCategory[];
  history: PromptHistory[];
  contextMemories: ContextMemory[];
  suggestions: PromptSuggestion[];
  statistics: PromptStatistics | null;
  activeTemplateId: string | null;
  activeVariables: PromptVariables;
  selectedContextIds: string[];
  rawContent: string;
  compiledContent: string;
  tokenEstimate: TokenEstimate | null;
  loading: boolean;
  error: string | null;
}

type PromptAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "SET_INITIAL_DATA";
      payload: {
        templates: PromptTemplate[];
        categories: PromptCategory[];
        history: PromptHistory[];
        contextMemories: ContextMemory[];
        suggestions: PromptSuggestion[];
        statistics: PromptStatistics;
      };
    }
  | { type: "SET_ACTIVE_TEMPLATE"; payload: string | null }
  | { type: "SET_VARIABLES"; payload: PromptVariables }
  | {
      type: "UPDATE_VARIABLE";
      payload: { key: string; value: string | number | boolean };
    }
  | { type: "TOGGLE_CONTEXT"; payload: string }
  | { type: "SET_CONTEXT_IDS"; payload: string[] }
  | { type: "SET_RAW_CONTENT"; payload: string }
  | { type: "SET_COMPILED_CONTENT"; payload: string }
  | { type: "SET_TOKEN_ESTIMATE"; payload: TokenEstimate }
  | { type: "ADD_TEMPLATE"; payload: PromptTemplate }
  | { type: "UPDATE_TEMPLATE"; payload: PromptTemplate }
  | { type: "REMOVE_TEMPLATE"; payload: string };

const initialState: PromptState = {
  templates: [],
  categories: [],
  history: [],
  contextMemories: [],
  suggestions: [],
  statistics: null,
  activeTemplateId: null,
  activeVariables: {},
  selectedContextIds: [],
  rawContent: "",
  compiledContent: "",
  tokenEstimate: null,
  loading: true,
  error: null,
};

function promptReducer(state: PromptState, action: PromptAction): PromptState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_INITIAL_DATA":
      return { ...state, ...action.payload };
    case "SET_ACTIVE_TEMPLATE": {
      const template = state.templates.find((t) => t.id === action.payload);
      const newVariables: Record<string, string | number | boolean> = {};
      if (template) {
        template.variables.forEach((v) => {
          newVariables[v] = "";
        });
      }
      return {
        ...state,
        activeTemplateId: action.payload,
        rawContent: template?.content || "",
        activeVariables: newVariables as PromptVariables,
      };
    }
    case "SET_VARIABLES":
      return { ...state, activeVariables: action.payload };
    case "UPDATE_VARIABLE":
      return {
        ...state,
        activeVariables: {
          ...state.activeVariables,
          [action.payload.key]: action.payload.value,
        },
      };
    case "TOGGLE_CONTEXT": {
      const isSelected = state.selectedContextIds.includes(action.payload);
      return {
        ...state,
        selectedContextIds: isSelected
          ? state.selectedContextIds.filter((id) => id !== action.payload)
          : [...state.selectedContextIds, action.payload],
      };
    }
    case "SET_CONTEXT_IDS":
      return { ...state, selectedContextIds: action.payload };
    case "SET_RAW_CONTENT":
      return { ...state, rawContent: action.payload };
    case "SET_COMPILED_CONTENT":
      return { ...state, compiledContent: action.payload };
    case "SET_TOKEN_ESTIMATE":
      return { ...state, tokenEstimate: action.payload };
    case "ADD_TEMPLATE":
      return { ...state, templates: [action.payload, ...state.templates] };
    case "UPDATE_TEMPLATE":
      return {
        ...state,
        templates: state.templates.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
    case "REMOVE_TEMPLATE":
      return {
        ...state,
        templates: state.templates.filter((t) => t.id !== action.payload),
        activeTemplateId:
          state.activeTemplateId === action.payload
            ? null
            : state.activeTemplateId,
      };
    default:
      return state;
  }
}

interface PromptContextValue extends PromptState {
  setActiveTemplate: (id: string | null) => void;
  updateVariable: (key: string, value: string | number | boolean) => void;
  toggleContext: (id: string) => void;
  setRawContent: (content: string) => void;
  saveTemplate: (
    template: Partial<PromptTemplate> & { title: string; content: string },
  ) => Promise<void>;
  duplicateTemplate: (id: string) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  recompilePrompt: () => void;
  refreshEstimates: () => Promise<void>;
}

const PromptContext = createContext<PromptContextValue | undefined>(undefined);

export function PromptProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(promptReducer, initialState);

  useEffect(() => {
    async function init() {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const [
          templates,
          categories,
          history,
          contextMemories,
          suggestions,
          statistics,
        ] = await Promise.all([
          PromptEngineService.loadTemplates(),
          PromptEngineService.loadCategories(),
          PromptEngineService.loadHistory(),
          PromptEngineService.loadContextMemories() as unknown as Promise<
            unknown[]
          >,
          PromptEngineService.loadSuggestions() as unknown as Promise<
            unknown[]
          >,
          PromptEngineService.loadStatistics(),
        ]);

        dispatch({
          type: "SET_INITIAL_DATA",
          payload: {
            templates,
            categories,
            history,
            contextMemories:
              contextMemories as unknown as import("@/types/prompt").ContextMemory[],
            suggestions: suggestions as unknown as string[],
            statistics,
          } as unknown as Extract<
            PromptAction,
            { type: "SET_INITIAL_DATA" }
          >["payload"],
        });
      } catch (err) {
        console.error(err);
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to initialize Prompt Engine.",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
    init();
  }, []);

  const recompilePrompt = useCallback(() => {
    const compiled = PromptEngineService.buildPrompt(
      state.rawContent,
      state.activeVariables,
      state.selectedContextIds,
    );
    dispatch({
      type: "SET_COMPILED_CONTENT",
      payload: compiled as unknown as string,
    });
  }, [state.rawContent, state.activeVariables, state.selectedContextIds]);

  const refreshEstimates = useCallback(async () => {
    if (!state.rawContent) return;
    const estimate = await PromptEngineService.estimateTokens(
      state.rawContent,
      state.selectedContextIds,
    );
    dispatch({
      type: "SET_TOKEN_ESTIMATE",
      payload: estimate as unknown as import("@/types/prompt").TokenEstimate,
    });
  }, [state.rawContent, state.selectedContextIds]);

  useEffect(() => {
    recompilePrompt();
    refreshEstimates();
  }, [
    state.rawContent,
    state.activeVariables,
    state.selectedContextIds,
    recompilePrompt,
    refreshEstimates,
  ]);

  const setActiveTemplate = useCallback((id: string | null) => {
    dispatch({ type: "SET_ACTIVE_TEMPLATE", payload: id });
  }, []);

  const updateVariable = useCallback(
    (key: string, value: string | number | boolean) => {
      dispatch({ type: "UPDATE_VARIABLE", payload: { key, value } });
    },
    [],
  );

  const toggleContext = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_CONTEXT", payload: id });
  }, []);

  const setRawContent = useCallback((content: string) => {
    dispatch({ type: "SET_RAW_CONTENT", payload: content });
  }, []);

  const saveTemplate = useCallback(
    async (
      template: Partial<PromptTemplate> & { title: string; content: string },
    ) => {
      const saved = await PromptEngineService.saveTemplate(template);
      if (template.id) {
        dispatch({ type: "UPDATE_TEMPLATE", payload: saved });
      } else {
        dispatch({ type: "ADD_TEMPLATE", payload: saved });
      }
    },
    [],
  );

  const duplicateTemplate = useCallback(async (id: string) => {
    const duplicate = await PromptEngineService.duplicateTemplate(id);
    if (duplicate) {
      dispatch({ type: "ADD_TEMPLATE", payload: duplicate });
    }
  }, []);

  const deleteTemplate = useCallback(async (id: string) => {
    await PromptEngineService.deleteTemplate(id);
    dispatch({ type: "REMOVE_TEMPLATE", payload: id });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setActiveTemplate,
      updateVariable,
      toggleContext,
      setRawContent,
      saveTemplate,
      duplicateTemplate,
      deleteTemplate,
      recompilePrompt,
      refreshEstimates,
    }),
    [
      state,
      setActiveTemplate,
      updateVariable,
      toggleContext,
      setRawContent,
      saveTemplate,
      duplicateTemplate,
      deleteTemplate,
      recompilePrompt,
      refreshEstimates,
    ],
  );

  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  );
}

export function usePromptContext() {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error("usePromptContext must be used within a PromptProvider");
  }
  return context;
}
