"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  AIProvider,
  AIModel,
  Conversation,
  ConversationSummary,
  StreamingState,
  UsageStatistics,
  TokenUsage,
  ChatMessage,
} from "@/types/ai";
import { AIService } from "@/services/ai-service";

interface AIState {
  availableProviders: AIProvider[];
  availableModels: AIModel[];
  selectedProvider: AIProvider | null;
  selectedModel: AIModel | null;
  activeConversation: Conversation | null;
  conversationList: ConversationSummary[];
  streamingState: StreamingState;
  isGenerating: boolean;
  usageStatistics: UsageStatistics | null;
  tokenUsage: TokenUsage | null;
  loadingState: boolean;
  errorState: string | null;
}

type AIAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PROVIDERS"; payload: AIProvider[] }
  | { type: "SET_MODELS"; payload: AIModel[] }
  | { type: "SET_SELECTED_PROVIDER"; payload: AIProvider | null }
  | { type: "SET_SELECTED_MODEL"; payload: AIModel | null }
  | { type: "SET_CONVERSATION_LIST"; payload: ConversationSummary[] }
  | { type: "SET_ACTIVE_CONVERSATION"; payload: Conversation | null }
  | {
      type: "UPDATE_CONVERSATION_LIST_ITEM";
      payload: Partial<ConversationSummary> & { id: string };
    }
  | { type: "REMOVE_CONVERSATION"; payload: string }
  | { type: "SET_GENERATING"; payload: boolean }
  | { type: "SET_STREAMING_STATE"; payload: Partial<StreamingState> }
  | { type: "APPEND_MESSAGE"; payload: ChatMessage }
  | { type: "UPDATE_MESSAGE"; payload: ChatMessage }
  | {
      type: "SET_USAGE";
      payload: { usage: TokenUsage; stats: UsageStatistics };
    };

const initialState: AIState = {
  availableProviders: [],
  availableModels: [],
  selectedProvider: null,
  selectedModel: null,
  activeConversation: null,
  conversationList: [],
  streamingState: { status: "idle", currentText: "" },
  isGenerating: false,
  usageStatistics: null,
  tokenUsage: null,
  loadingState: true,
  errorState: null,
};

function aiReducer(state: AIState, action: AIAction): AIState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loadingState: action.payload };
    case "SET_ERROR":
      return { ...state, errorState: action.payload };
    case "SET_PROVIDERS":
      return { ...state, availableProviders: action.payload };
    case "SET_MODELS":
      return { ...state, availableModels: action.payload };
    case "SET_SELECTED_PROVIDER":
      return { ...state, selectedProvider: action.payload };
    case "SET_SELECTED_MODEL":
      return { ...state, selectedModel: action.payload };
    case "SET_CONVERSATION_LIST":
      return { ...state, conversationList: action.payload };
    case "SET_ACTIVE_CONVERSATION":
      return { ...state, activeConversation: action.payload };
    case "UPDATE_CONVERSATION_LIST_ITEM":
      return {
        ...state,
        conversationList: state.conversationList.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c,
        ),
        activeConversation:
          state.activeConversation?.id === action.payload.id
            ? ({
                ...state.activeConversation,
                ...action.payload,
              } as Conversation)
            : state.activeConversation,
      };
    case "REMOVE_CONVERSATION":
      return {
        ...state,
        conversationList: state.conversationList.filter(
          (c) => c.id !== action.payload,
        ),
        activeConversation:
          state.activeConversation?.id === action.payload
            ? null
            : state.activeConversation,
      };
    case "SET_GENERATING":
      return { ...state, isGenerating: action.payload };
    case "SET_STREAMING_STATE":
      return {
        ...state,
        streamingState: { ...state.streamingState, ...action.payload },
      };
    case "APPEND_MESSAGE":
      if (!state.activeConversation) return state;
      return {
        ...state,
        activeConversation: {
          ...state.activeConversation,
          messages: [...state.activeConversation.messages, action.payload],
        },
      };
    case "UPDATE_MESSAGE":
      if (!state.activeConversation) return state;
      return {
        ...state,
        activeConversation: {
          ...state.activeConversation,
          messages: state.activeConversation.messages.map((m) =>
            m.id === action.payload.id ? action.payload : m,
          ),
        },
      };
    case "SET_USAGE":
      return {
        ...state,
        tokenUsage: action.payload.usage,
        usageStatistics: action.payload.stats,
      };
    default:
      return state;
  }
}

interface AIContextValue extends AIState {
  switchProvider: (providerId: string) => void;
  switchModel: (modelId: string) => void;
  createConversation: () => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  renameConversation: (id: string, title: string) => Promise<void>;
  archiveConversation: (id: string) => Promise<void>;
  favoriteConversation: (id: string, isFavorite: boolean) => Promise<void>;
  pinConversation: (id: string, isPinned: boolean) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  cancelGeneration: () => void;
  regenerate: (messageId: string) => Promise<void>;
  clearConversation: () => void;
  loadConversation: (id: string) => Promise<void>;
}

const AIContext = createContext<AIContextValue | undefined>(undefined);

export function AIProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(aiReducer, initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const initData = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const [providers, models, conversations, usage, stats] =
        await Promise.all([
          AIService.loadProviders(),
          AIService.loadModels(),
          AIService.loadConversations(),
          AIService.getUsage(),
          AIService.getStatistics(),
        ]);

      dispatch({ type: "SET_PROVIDERS", payload: providers });
      dispatch({ type: "SET_MODELS", payload: models });
      dispatch({ type: "SET_CONVERSATION_LIST", payload: conversations });
      dispatch({ type: "SET_USAGE", payload: { usage, stats } });

      if (providers.length > 0) {
        dispatch({ type: "SET_SELECTED_PROVIDER", payload: providers[0] });
        const providerModels = models.filter(
          (m) => m.providerId === providers[0].id,
        );
        if (providerModels.length > 0) {
          dispatch({ type: "SET_SELECTED_MODEL", payload: providerModels[0] });
        }
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to load AI configuration.",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  useEffect(() => {
    initData();
  }, [initData]);

  const switchProvider = useCallback(
    (providerId: string) => {
      const provider = state.availableProviders.find(
        (p) => p.id === providerId,
      );
      if (provider) {
        dispatch({ type: "SET_SELECTED_PROVIDER", payload: provider });
        const providerModels = state.availableModels.filter(
          (m) => m.providerId === providerId,
        );
        if (providerModels.length > 0) {
          dispatch({ type: "SET_SELECTED_MODEL", payload: providerModels[0] });
        } else {
          dispatch({ type: "SET_SELECTED_MODEL", payload: null });
        }
      }
    },
    [state.availableProviders, state.availableModels],
  );

  const switchModel = useCallback(
    (modelId: string) => {
      const model = state.availableModels.find((m) => m.id === modelId);
      if (model) {
        dispatch({ type: "SET_SELECTED_MODEL", payload: model });
        const provider = state.availableProviders.find(
          (p) => p.id === model.providerId,
        );
        if (provider && provider.id !== state.selectedProvider?.id) {
          dispatch({ type: "SET_SELECTED_PROVIDER", payload: provider });
        }
      }
    },
    [state.availableModels, state.availableProviders, state.selectedProvider],
  );

  const createConversation = useCallback(async () => {
    if (!state.selectedModel) return;
    try {
      const conv = await AIService.createConversation(state.selectedModel.id);
      dispatch({ type: "SET_ACTIVE_CONVERSATION", payload: conv });
      const updatedList = await AIService.loadConversations();
      dispatch({ type: "SET_CONVERSATION_LIST", payload: updatedList });
    } catch (err) {
      console.error(err);
    }
  }, [state.selectedModel]);

  const loadConversation = useCallback(async (id: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const conv = await AIService.loadConversation(id);
      dispatch({ type: "SET_ACTIVE_CONVERSATION", payload: conv });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const deleteConversation = useCallback(async (id: string) => {
    await AIService.deleteConversation(id);
    dispatch({ type: "REMOVE_CONVERSATION", payload: id });
  }, []);

  const renameConversation = useCallback(async (id: string, title: string) => {
    await AIService.renameConversation(id, title);
    dispatch({ type: "UPDATE_CONVERSATION_LIST_ITEM", payload: { id, title } });
  }, []);

  const archiveConversation = useCallback(async (id: string) => {
    await AIService.archiveConversation(id);
    dispatch({
      type: "UPDATE_CONVERSATION_LIST_ITEM",
      payload: { id, status: "archived" },
    });
  }, []);

  const favoriteConversation = useCallback(
    async (id: string, isFavorite: boolean) => {
      await AIService.favoriteConversation(id, isFavorite);
      dispatch({
        type: "UPDATE_CONVERSATION_LIST_ITEM",
        payload: { id, isFavorite },
      });
    },
    [],
  );

  const pinConversation = useCallback(async (id: string, isPinned: boolean) => {
    await AIService.pinConversation(id, isPinned);
    dispatch({
      type: "UPDATE_CONVERSATION_LIST_ITEM",
      payload: { id, isPinned },
    });
  }, []);

  const clearConversation = useCallback(() => {
    dispatch({ type: "SET_ACTIVE_CONVERSATION", payload: null });
  }, []);

  const cancelGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    dispatch({ type: "SET_GENERATING", payload: false });
    dispatch({
      type: "SET_STREAMING_STATE",
      payload: { status: "cancelled", abortReason: "user_cancelled" },
    });
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!state.activeConversation) return;

      // Add User Message Optimistically
      const userMsgId = `user-${Date.now()}`;
      dispatch({
        type: "APPEND_MESSAGE",
        payload: {
          id: userMsgId,
          role: "user",
          content,
          status: "sent",
          timestamp: new Date().toISOString(),
        },
      });

      const assistantMsgId = `ast-${Date.now()}`;
      dispatch({
        type: "APPEND_MESSAGE",
        payload: {
          id: assistantMsgId,
          role: "assistant",
          content: "",
          status: "streaming",
          timestamp: new Date().toISOString(),
        },
      });

      dispatch({ type: "SET_GENERATING", payload: true });
      dispatch({
        type: "SET_STREAMING_STATE",
        payload: {
          status: "generating",
          currentText: "",
          error: undefined,
          abortReason: undefined,
        },
      });

      abortControllerRef.current = new AbortController();

      try {
        await AIService.streamMessage(
          state.activeConversation.id,
          [{ role: "user", content }],
          (chunk: string) => {
            dispatch({
              type: "SET_STREAMING_STATE",
              payload: { currentText: chunk }, // In a real app we accumulate in state or component
            });
            // Update the message in the conversation
            dispatch({
              type: "UPDATE_MESSAGE",
              payload: {
                id: assistantMsgId,
                role: "assistant",
                content: chunk,
                status: "streaming",
                timestamp: new Date().toISOString(),
              },
            });
          },
          (fullText) => {
            dispatch({
              type: "UPDATE_MESSAGE",
              payload: {
                id: assistantMsgId,
                role: "assistant",
                content: fullText,
                status: "sent",
                timestamp: new Date().toISOString(),
              },
            });
            dispatch({
              type: "SET_STREAMING_STATE",
              payload: { status: "completed" },
            });
          },
          undefined,
          undefined,
          abortControllerRef.current.signal,
        );
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Stream aborted");
        } else {
          dispatch({
            type: "SET_STREAMING_STATE",
            payload: { status: "error", error: "Failed to generate response." },
          });
          dispatch({
            type: "UPDATE_MESSAGE",
            payload: {
              id: assistantMsgId,
              role: "assistant",
              content: "Error generating response.",
              status: "error",
              timestamp: new Date().toISOString(),
            },
          });
        }
      } finally {
        dispatch({ type: "SET_GENERATING", payload: false });
        abortControllerRef.current = null;
      }
    },
    [state.activeConversation],
  );

  const regenerate = useCallback(
    async (messageId: string) => {
      if (!state.activeConversation) return;
      dispatch({ type: "SET_GENERATING", payload: true });
      try {
        const regeneratedMsg = await AIService.regenerateResponse(
          state.activeConversation.id,
          messageId,
        );
        dispatch({
          type: "UPDATE_MESSAGE",
          payload: { ...regeneratedMsg, id: messageId }, // mock replace
        });
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: "SET_GENERATING", payload: false });
      }
    },
    [state.activeConversation],
  );

  const value = useMemo(
    () => ({
      ...state,
      switchProvider,
      switchModel,
      createConversation,
      deleteConversation,
      renameConversation,
      archiveConversation,
      favoriteConversation,
      pinConversation,
      sendMessage,
      cancelGeneration,
      regenerate,
      clearConversation,
      loadConversation,
    }),
    [
      state,
      switchProvider,
      switchModel,
      createConversation,
      deleteConversation,
      renameConversation,
      archiveConversation,
      favoriteConversation,
      pinConversation,
      sendMessage,
      cancelGeneration,
      regenerate,
      clearConversation,
      loadConversation,
    ],
  );

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

export function useAIContext() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error("useAIContext must be used within an AIProvider");
  }
  return context;
}
