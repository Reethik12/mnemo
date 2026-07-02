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
  Conversation,
  ConversationSummary,
  ConversationFolder,
  ConversationFilter,
  ConversationSort,
  ConversationStatistics,
} from "@/types/conversation";
import { ConversationWorkspaceService } from "@/services/conversation-service";

interface ConversationState {
  conversations: ConversationSummary[];
  activeConversation: Conversation | null;
  selectedConversationIds: string[];
  folders: ConversationFolder[];
  filter: ConversationFilter;
  searchQuery: string;
  searchResults: readonly ConversationSummary[];
  isSearching: boolean;
  sort: ConversationSort;
  loading: boolean;
  error: string | null;
  statistics: ConversationStatistics | null;
}

type ConversationAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "SET_DATA";
      payload: {
        conversations: ConversationSummary[];
        folders: ConversationFolder[];
        stats: ConversationStatistics;
      };
    }
  | { type: "SET_ACTIVE_CONVERSATION"; payload: Conversation | null }
  | {
      type: "UPDATE_CONVERSATION";
      payload: Partial<ConversationSummary> & { id: string };
    }
  | { type: "ADD_CONVERSATION"; payload: ConversationSummary }
  | { type: "REMOVE_CONVERSATIONS"; payload: string[] }
  | { type: "SET_SELECTED_IDS"; payload: string[] }
  | { type: "SET_FILTER"; payload: ConversationFilter }
  | {
      type: "SET_SEARCH";
      payload: {
        query: string;
        results: readonly ConversationSummary[];
        isSearching: boolean;
      };
    }
  | { type: "SET_SORT"; payload: ConversationSort }
  | { type: "SET_STATISTICS"; payload: ConversationStatistics };

const initialState: ConversationState = {
  conversations: [],
  activeConversation: null,
  selectedConversationIds: [],
  folders: [],
  filter: { status: "active" },
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  sort: "updatedDesc",
  loading: true,
  error: null,
  statistics: null,
};

function conversationReducer(
  state: ConversationState,
  action: ConversationAction,
): ConversationState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_DATA":
      return {
        ...state,
        conversations: action.payload.conversations,
        folders: action.payload.folders,
        statistics: action.payload.stats,
      };
    case "SET_ACTIVE_CONVERSATION":
      return { ...state, activeConversation: action.payload };
    case "UPDATE_CONVERSATION":
      return {
        ...state,
        conversations: state.conversations.map((c) =>
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
    case "ADD_CONVERSATION":
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
      };
    case "REMOVE_CONVERSATIONS":
      return {
        ...state,
        conversations: state.conversations.filter(
          (c) => !action.payload.includes(c.id),
        ),
        activeConversation:
          state.activeConversation &&
          action.payload.includes(state.activeConversation.id)
            ? null
            : state.activeConversation,
        selectedConversationIds: state.selectedConversationIds.filter(
          (id) => !action.payload.includes(id),
        ),
      };
    case "SET_SELECTED_IDS":
      return { ...state, selectedConversationIds: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_SEARCH":
      return {
        ...state,
        searchQuery: action.payload.query,
        searchResults: action.payload.results,
        isSearching: action.payload.isSearching,
      };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SET_STATISTICS":
      return { ...state, statistics: action.payload };
    default:
      return state;
  }
}

interface ConversationContextValue extends ConversationState {
  loadConversation: (id: string) => Promise<void>;
  createConversation: (modelId: string, folderId?: string) => Promise<void>;
  duplicateConversation: (id: string) => Promise<void>;
  renameConversation: (id: string, title: string) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  deleteSelected: () => Promise<void>;
  archiveConversation: (id: string) => Promise<void>;
  archiveSelected: () => Promise<void>;
  restoreConversation: (id: string) => Promise<void>;
  favoriteConversation: (id: string, isFavorite: boolean) => Promise<void>;
  pinConversation: (id: string, isPinned: boolean) => Promise<void>;
  moveConversation: (id: string, folderId: string | undefined) => Promise<void>;
  setFilter: (filter: ConversationFilter) => void;
  setSort: (sort: ConversationSort) => void;
  search: (query: string) => Promise<void>;
  clearSearch: () => void;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
  selectAll: (ids: string[]) => void;
  refreshStatistics: () => Promise<void>;
}

const ConversationContext = createContext<ConversationContextValue | undefined>(
  undefined,
);

export function ConversationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(conversationReducer, initialState);

  const initData = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const [conversations, folders, stats] = await Promise.all([
        ConversationWorkspaceService.loadConversations(),
        ConversationWorkspaceService.loadFolders(),
        ConversationWorkspaceService.loadStatistics(),
      ]);
      dispatch({
        type: "SET_DATA",
        payload: { conversations, folders, stats },
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "SET_ERROR", payload: "Failed to load conversations" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  useEffect(() => {
    initData();
  }, [initData]);

  const refreshStatistics = useCallback(async () => {
    try {
      const stats = await ConversationWorkspaceService.loadStatistics();
      dispatch({ type: "SET_STATISTICS", payload: stats });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadConversation = useCallback(async (id: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const conv = await ConversationWorkspaceService.loadConversation(id);
      dispatch({ type: "SET_ACTIVE_CONVERSATION", payload: conv });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const createConversation = useCallback(
    async (modelId: string, folderId?: string) => {
      try {
        const conv = await ConversationWorkspaceService.createConversation(
          modelId,
          folderId,
        );
        dispatch({ type: "ADD_CONVERSATION", payload: conv });
        dispatch({ type: "SET_ACTIVE_CONVERSATION", payload: conv });
        refreshStatistics();
      } catch (error) {
        console.error(error);
      }
    },
    [refreshStatistics],
  );

  const duplicateConversation = useCallback(
    async (id: string) => {
      try {
        const duplicate =
          await ConversationWorkspaceService.duplicateConversation(id);
        if (duplicate) {
          dispatch({ type: "ADD_CONVERSATION", payload: duplicate });
          refreshStatistics();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [refreshStatistics],
  );

  const renameConversation = useCallback(async (id: string, title: string) => {
    await ConversationWorkspaceService.renameConversation(id, title);
    dispatch({
      type: "UPDATE_CONVERSATION",
      payload: { id, title, updatedAt: new Date().toISOString() },
    });
  }, []);

  const deleteConversation = useCallback(
    async (id: string) => {
      await ConversationWorkspaceService.deleteConversation(id);
      dispatch({ type: "REMOVE_CONVERSATIONS", payload: [id] });
      refreshStatistics();
    },
    [refreshStatistics],
  );

  const deleteSelected = useCallback(async () => {
    if (state.selectedConversationIds.length === 0) return;
    await ConversationWorkspaceService.deleteConversationsBulk(
      state.selectedConversationIds,
    );
    dispatch({
      type: "REMOVE_CONVERSATIONS",
      payload: state.selectedConversationIds,
    });
    refreshStatistics();
  }, [state.selectedConversationIds, refreshStatistics]);

  const archiveConversation = useCallback(
    async (id: string) => {
      await ConversationWorkspaceService.archiveConversation(id);
      dispatch({
        type: "UPDATE_CONVERSATION",
        payload: {
          id,
          status: "archived",
          isPinned: false,
          isFavorite: false,
          updatedAt: new Date().toISOString(),
        },
      });
      refreshStatistics();
    },
    [refreshStatistics],
  );

  const archiveSelected = useCallback(async () => {
    if (state.selectedConversationIds.length === 0) return;
    await ConversationWorkspaceService.archiveConversationsBulk(
      state.selectedConversationIds,
    );
    state.selectedConversationIds.forEach((id) => {
      dispatch({
        type: "UPDATE_CONVERSATION",
        payload: {
          id,
          status: "archived",
          isPinned: false,
          isFavorite: false,
          updatedAt: new Date().toISOString(),
        },
      });
    });
    dispatch({ type: "SET_SELECTED_IDS", payload: [] });
    refreshStatistics();
  }, [state.selectedConversationIds, refreshStatistics]);

  const restoreConversation = useCallback(
    async (id: string) => {
      await ConversationWorkspaceService.restoreConversation(id);
      dispatch({
        type: "UPDATE_CONVERSATION",
        payload: { id, status: "active", updatedAt: new Date().toISOString() },
      });
      refreshStatistics();
    },
    [refreshStatistics],
  );

  const favoriteConversation = useCallback(
    async (id: string, isFavorite: boolean) => {
      await ConversationWorkspaceService.favoriteConversation(id, isFavorite);
      dispatch({
        type: "UPDATE_CONVERSATION",
        payload: { id, isFavorite, updatedAt: new Date().toISOString() },
      });
    },
    [],
  );

  const pinConversation = useCallback(async (id: string, isPinned: boolean) => {
    await ConversationWorkspaceService.pinConversation(id, isPinned);
    dispatch({
      type: "UPDATE_CONVERSATION",
      payload: { id, isPinned, updatedAt: new Date().toISOString() },
    });
  }, []);

  const moveConversation = useCallback(
    async (id: string, folderId: string | undefined) => {
      await ConversationWorkspaceService.moveConversation(id, folderId);
      dispatch({
        type: "UPDATE_CONVERSATION",
        payload: { id, folderId, updatedAt: new Date().toISOString() },
      });
    },
    [],
  );

  const setFilter = useCallback((filter: ConversationFilter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  }, []);

  const setSort = useCallback((sort: ConversationSort) => {
    dispatch({ type: "SET_SORT", payload: sort });
  }, []);

  const search = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        dispatch({
          type: "SET_SEARCH",
          payload: { query: "", results: [], isSearching: false },
        });
        return;
      }
      dispatch({
        type: "SET_SEARCH",
        payload: { query, results: state.searchResults, isSearching: true },
      });
      const res = await ConversationWorkspaceService.searchConversations(query);
      dispatch({ type: "SET_SEARCH", payload: res });
    },
    [state.searchResults],
  );

  const clearSearch = useCallback(() => {
    dispatch({
      type: "SET_SEARCH",
      payload: { query: "", results: [], isSearching: false },
    });
  }, []);

  const toggleSelection = useCallback(
    (id: string) => {
      dispatch({
        type: "SET_SELECTED_IDS",
        payload: state.selectedConversationIds.includes(id)
          ? state.selectedConversationIds.filter((sid) => sid !== id)
          : [...state.selectedConversationIds, id],
      });
    },
    [state.selectedConversationIds],
  );

  const clearSelection = useCallback(() => {
    dispatch({ type: "SET_SELECTED_IDS", payload: [] });
  }, []);

  const selectAll = useCallback((ids: string[]) => {
    dispatch({ type: "SET_SELECTED_IDS", payload: ids });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      loadConversation,
      createConversation,
      duplicateConversation,
      renameConversation,
      deleteConversation,
      deleteSelected,
      archiveConversation,
      archiveSelected,
      restoreConversation,
      favoriteConversation,
      pinConversation,
      moveConversation,
      setFilter,
      setSort,
      search,
      clearSearch,
      toggleSelection,
      clearSelection,
      selectAll,
      refreshStatistics,
    }),
    [
      state,
      loadConversation,
      createConversation,
      duplicateConversation,
      renameConversation,
      deleteConversation,
      deleteSelected,
      archiveConversation,
      archiveSelected,
      restoreConversation,
      favoriteConversation,
      pinConversation,
      moveConversation,
      setFilter,
      setSort,
      search,
      clearSearch,
      toggleSelection,
      clearSelection,
      selectAll,
      refreshStatistics,
    ],
  );

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversationContext() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error(
      "useConversationContext must be used within a ConversationProvider",
    );
  }
  return context;
}
