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
  Provider,
  ProviderModel,
  ProviderUsage,
  ProviderStatistics,
  ProviderHealth,
  ProviderConfiguration,
  ProviderConnection,
} from "@/types/provider";
import { ProviderManagementService } from "@/services/provider-service";

interface ProviderState {
  providers: Provider[];
  models: ProviderModel[];
  usage: ProviderUsage[];
  statistics: ProviderStatistics | null;
  activeProviderId: string | null;
  activeModelId: string | null;
  configurations: Record<string, ProviderConfiguration>;
  healthStatus: Record<string, ProviderHealth>;
  connections: Record<string, ProviderConnection>;
  loading: boolean;
  error: string | null;
}

type ProviderAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "SET_INITIAL_DATA";
      payload: {
        providers: Provider[];
        models: ProviderModel[];
        usage: ProviderUsage[];
        statistics: ProviderStatistics;
      };
    }
  | { type: "SET_ACTIVE_PROVIDER"; payload: string | null }
  | { type: "SET_ACTIVE_MODEL"; payload: string | null }
  | {
      type: "SET_CONFIGURATION";
      payload: { providerId: string; config: ProviderConfiguration };
    }
  | {
      type: "SET_HEALTH";
      payload: { providerId: string; health: ProviderHealth };
    }
  | {
      type: "SET_CONNECTION";
      payload: { providerId: string; connection: ProviderConnection };
    };

const initialState: ProviderState = {
  providers: [],
  models: [],
  usage: [],
  statistics: null,
  activeProviderId: null,
  activeModelId: null,
  configurations: {},
  healthStatus: {},
  connections: {},
  loading: true,
  error: null,
};

function providerReducer(
  state: ProviderState,
  action: ProviderAction,
): ProviderState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_INITIAL_DATA":
      return { ...state, ...action.payload };
    case "SET_ACTIVE_PROVIDER":
      return {
        ...state,
        activeProviderId: action.payload,
        activeModelId: null,
      };
    case "SET_ACTIVE_MODEL":
      return { ...state, activeModelId: action.payload };
    case "SET_CONFIGURATION":
      return {
        ...state,
        configurations: {
          ...state.configurations,
          [action.payload.providerId]: action.payload.config,
        },
      };
    case "SET_HEALTH":
      return {
        ...state,
        healthStatus: {
          ...state.healthStatus,
          [action.payload.providerId]: action.payload.health,
        },
      };
    case "SET_CONNECTION":
      return {
        ...state,
        connections: {
          ...state.connections,
          [action.payload.providerId]: action.payload.connection,
        },
      };
    default:
      return state;
  }
}

interface ProviderContextValue extends ProviderState {
  setActiveProvider: (id: string | null) => void;
  setActiveModel: (id: string | null) => void;
  updateConfiguration: (
    providerId: string,
    config: ProviderConfiguration,
  ) => void;
  checkHealth: (providerId: string) => Promise<void>;
  testConnection: (providerId: string) => Promise<void>;
}

const ProviderContext = createContext<ProviderContextValue | undefined>(
  undefined,
);

export function ProviderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(providerReducer, initialState);

  useEffect(() => {
    async function init() {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const [providers, models, usage, statistics] = await Promise.all([
          ProviderManagementService.loadProviders(),
          ProviderManagementService.loadModels(),
          ProviderManagementService.loadUsage(),
          ProviderManagementService.loadStatistics(),
        ]);

        dispatch({
          type: "SET_INITIAL_DATA",
          payload: { providers, models, usage, statistics },
        });

        if (providers.length > 0) {
          dispatch({ type: "SET_ACTIVE_PROVIDER", payload: providers[0].id });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to load provider data.",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
    init();
  }, []);

  const setActiveProvider = useCallback((id: string | null) => {
    dispatch({ type: "SET_ACTIVE_PROVIDER", payload: id });
  }, []);

  const setActiveModel = useCallback((id: string | null) => {
    dispatch({ type: "SET_ACTIVE_MODEL", payload: id });
  }, []);

  const updateConfiguration = useCallback(
    (providerId: string, config: ProviderConfiguration) => {
      dispatch({ type: "SET_CONFIGURATION", payload: { providerId, config } });
    },
    [],
  );

  const checkHealth = useCallback(async (providerId: string) => {
    try {
      const health = await ProviderManagementService.checkHealth(providerId);
      dispatch({ type: "SET_HEALTH", payload: { providerId, health } });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const testConnection = useCallback(
    async (providerId: string) => {
      const config = state.configurations[providerId] || {};
      try {
        const connection = await ProviderManagementService.testConnection(
          providerId,
          config,
        );
        dispatch({
          type: "SET_CONNECTION",
          payload: { providerId, connection },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [state.configurations],
  );

  const value = useMemo(
    () => ({
      ...state,
      setActiveProvider,
      setActiveModel,
      updateConfiguration,
      checkHealth,
      testConnection,
    }),
    [
      state,
      setActiveProvider,
      setActiveModel,
      updateConfiguration,
      checkHealth,
      testConnection,
    ],
  );

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
}

export function useProviderContext() {
  const context = useContext(ProviderContext);
  if (context === undefined) {
    throw new Error(
      "useProviderContext must be used within a ProviderProvider",
    );
  }
  return context;
}
