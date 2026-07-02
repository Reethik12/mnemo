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
  MemoryNode,
  MemoryEdge,
  MemoryCluster,
  FabricStatistics,
  FabricSnapshot,
} from "@/types/fabric";
import { FabricService } from "@/services/fabric-service";

interface FabricContextValue {
  fabric: {
    nodes: MemoryNode[];
    edges: MemoryEdge[];
    clusters: MemoryCluster[];
    snapshots: FabricSnapshot[];
    statistics: FabricStatistics | null;
  };
  isLoading: boolean;
  selectedNode: MemoryNode | null;
  setSelectedNode: (node: MemoryNode | null) => void;
  refreshFabric: () => Promise<void>;
  generateSnapshot: () => Promise<void>;
}

const FabricContext = createContext<FabricContextValue | undefined>(undefined);

export function FabricProvider({ children }: { children: React.ReactNode }) {
  const [nodes, setNodes] = useState<MemoryNode[]>([]);
  const [edges, setEdges] = useState<MemoryEdge[]>([]);
  const [clusters, setClusters] = useState<MemoryCluster[]>([]);
  const [snapshots, setSnapshots] = useState<FabricSnapshot[]>([]);
  const [statistics, setStatistics] = useState<FabricStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<MemoryNode | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      await FabricService.buildFabric();
      const [
        fetchedNodes,
        fetchedEdges,
        fetchedClusters,
        fetchedStats,
        fetchedSnapshots,
      ] = await Promise.all([
        FabricService.getNodes(),
        FabricService.getEdges(),
        FabricService.getClusters(),
        FabricService.calculateStatistics(),
        FabricService.getSnapshots(),
      ]);

      setNodes(fetchedNodes);
      setEdges(fetchedEdges);
      setClusters(fetchedClusters);
      setStatistics(fetchedStats);
      setSnapshots(fetchedSnapshots);
    } catch (error) {
      console.error("Failed to load fabric data", error);
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

  const refreshFabric = useCallback(async () => {
    await FabricService.refreshFabric();
    await loadData();
  }, [loadData]);

  const generateSnapshot = useCallback(async () => {
    // Mock snapshot generation
    console.log("Generating snapshot...");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }, []);

  const value = useMemo(
    () => ({
      fabric: {
        nodes,
        edges,
        clusters,
        snapshots,
        statistics,
      },
      isLoading,
      selectedNode,
      setSelectedNode,
      refreshFabric,
      generateSnapshot,
    }),
    [
      nodes,
      edges,
      clusters,
      snapshots,
      statistics,
      isLoading,
      selectedNode,
      refreshFabric,
      generateSnapshot,
    ],
  );

  return (
    <FabricContext.Provider value={value}>{children}</FabricContext.Provider>
  );
}

export function useFabricContext() {
  const context = useContext(FabricContext);
  if (context === undefined) {
    throw new Error("useFabricContext must be used within a FabricProvider");
  }
  return context;
}
