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
  RelationshipEdge,
  RelationshipCluster,
  RelationshipStatistics,
  RelationshipFilter,
  RelationshipSnapshot,
  RelationshipGroup,
} from "@/types/relationship";
import { RelationshipService } from "@/services/relationship-service";

interface RelationshipContextValue {
  relationships: RelationshipEdge[];
  filteredRelationships: RelationshipEdge[];
  groupedRelationships: RelationshipGroup[];
  clusters: RelationshipCluster[];
  snapshots: RelationshipSnapshot[];
  statistics: RelationshipStatistics | null;
  filters: RelationshipFilter;
  setFilters: (filters: RelationshipFilter) => void;
  isLoading: boolean;
  selectedRelationship: RelationshipEdge | null;
  selectedNodeId: string | null;
  setSelectedRelationship: (rel: RelationshipEdge | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  refreshRelationships: () => Promise<void>;
}

const RelationshipContext = createContext<RelationshipContextValue | undefined>(
  undefined,
);

export function RelationshipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [relationships, setRelationships] = useState<RelationshipEdge[]>([]);
  const [filteredRelationships, setFilteredRelationships] = useState<
    RelationshipEdge[]
  >([]);
  const [groupedRelationships, setGroupedRelationships] = useState<
    RelationshipGroup[]
  >([]);
  const [clusters, setClusters] = useState<RelationshipCluster[]>([]);
  const [snapshots, setSnapshots] = useState<RelationshipSnapshot[]>([]);
  const [statistics, setStatistics] = useState<RelationshipStatistics | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<RelationshipFilter>({});
  const [selectedRelationship, setSelectedRelationship] =
    useState<RelationshipEdge | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedRels, fetchedClusters, fetchedStats, fetchedSnapshots] =
        await Promise.all([
          RelationshipService.getRelationships(),
          RelationshipService.getClusters(),
          RelationshipService.calculateStatistics(),
          RelationshipService.getSnapshots(),
        ]);

      setRelationships(fetchedRels);
      setClusters(fetchedClusters);
      setStatistics(fetchedStats);
      setSnapshots(fetchedSnapshots);
    } catch (error) {
      console.error("Failed to load relationship data", error);
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

  useEffect(() => {
    const applyFiltersAndGrouping = async () => {
      const filtered = await RelationshipService.filterRelationships(
        relationships,
        filters,
      );
      setFilteredRelationships(filtered);

      const grouped = await RelationshipService.groupRelationships(filtered);
      setGroupedRelationships(grouped);
    };

    // We don't need to await this if we just want it to run, but to avoid react-hooks warning we can call it.
    void applyFiltersAndGrouping();
  }, [relationships, filters]);

  const refreshRelationships = useCallback(async () => {
    await RelationshipService.refreshRelationships();
    await loadData();
  }, [loadData]);

  const value = useMemo(
    () => ({
      relationships,
      filteredRelationships,
      groupedRelationships,
      clusters,
      snapshots,
      statistics,
      filters,
      setFilters,
      isLoading,
      selectedRelationship,
      selectedNodeId,
      setSelectedRelationship,
      setSelectedNodeId,
      refreshRelationships,
    }),
    [
      relationships,
      filteredRelationships,
      groupedRelationships,
      clusters,
      snapshots,
      statistics,
      filters,
      isLoading,
      selectedRelationship,
      selectedNodeId,
      refreshRelationships,
    ],
  );

  return (
    <RelationshipContext.Provider value={value}>
      {children}
    </RelationshipContext.Provider>
  );
}

export function useRelationshipContext() {
  const context = useContext(RelationshipContext);
  if (context === undefined) {
    throw new Error(
      "useRelationshipContext must be used within a RelationshipProvider",
    );
  }
  return context;
}
