"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  KnowledgeNode,
  KnowledgeEdge,
  KnowledgeCluster,
  KnowledgeStatistics,
  KnowledgeInsight,
} from "@/types/knowledge";
import { KnowledgeService } from "@/services/knowledge-service";

interface KnowledgeContextValue {
  graph: {
    nodes: KnowledgeNode[];
    edges: KnowledgeEdge[];
    clusters: KnowledgeCluster[];
    insights: KnowledgeInsight[];
  };
  statistics: KnowledgeStatistics | null;
  isLoading: boolean;
  selectedNode: KnowledgeNode | null;
  selectedEdge: KnowledgeEdge | null;
  setSelectedNode: (node: KnowledgeNode | null) => void;
  setSelectedEdge: (edge: KnowledgeEdge | null) => void;
  refreshGraph: () => Promise<void>;
}

const KnowledgeContext = createContext<KnowledgeContextValue | undefined>(
  undefined,
);

export function KnowledgeProvider({ children }: { children: React.ReactNode }) {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [edges, setEdges] = useState<KnowledgeEdge[]>([]);
  const [clusters, setClusters] = useState<KnowledgeCluster[]>([]);
  const [insights, setInsights] = useState<KnowledgeInsight[]>([]);
  const [statistics, setStatistics] = useState<KnowledgeStatistics | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<KnowledgeEdge | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      await KnowledgeService.buildGraph();
      const [
        fetchedNodes,
        fetchedEdges,
        fetchedClusters,
        fetchedStats,
        fetchedInsights,
      ] = await Promise.all([
        KnowledgeService.getNodes(),
        KnowledgeService.getEdges(),
        KnowledgeService.getClusters(),
        KnowledgeService.calculateStatistics(),
        KnowledgeService.getInsights(),
      ]);

      setNodes(fetchedNodes);
      setEdges(fetchedEdges);
      setClusters(fetchedClusters);
      setStatistics(fetchedStats);
      setInsights(fetchedInsights);
    } catch (error) {
      console.error("Failed to load knowledge graph data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadData]);

  const refreshGraph = useCallback(async () => {
    await KnowledgeService.refreshGraph();
    await loadData();
  }, [loadData]);

  const value = useMemo(
    () => ({
      graph: {
        nodes,
        edges,
        clusters,
        insights,
      },
      statistics,
      isLoading,
      selectedNode,
      selectedEdge,
      setSelectedNode,
      setSelectedEdge,
      refreshGraph,
    }),
    [
      nodes,
      edges,
      clusters,
      insights,
      statistics,
      isLoading,
      selectedNode,
      selectedEdge,
      refreshGraph,
    ],
  );

  return (
    <KnowledgeContext.Provider value={value}>
      {children}
    </KnowledgeContext.Provider>
  );
}

export function useKnowledgeContext() {
  const context = useContext(KnowledgeContext);
  if (context === undefined) {
    throw new Error(
      "useKnowledgeContext must be used within a KnowledgeProvider",
    );
  }
  return context;
}
