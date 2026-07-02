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
  SemanticSearchResult,
  SemanticCluster,
  IntelligenceInsight,
  SearchHistoryItem,
  IntelligenceStatistics,
  IntelligenceContext,
} from "@/types/intelligence";
import { IntelligenceService } from "@/services/intelligence-service";

interface IntelligenceContextValue {
  context: IntelligenceContext;
  isLoading: boolean;
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
  refreshIntelligence: () => Promise<void>;
}

const IntelligenceStateContext = createContext<
  IntelligenceContextValue | undefined
>(undefined);

export function IntelligenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SemanticSearchResult[]>(
    [],
  );
  const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([]);
  const [suggestedSearches, setSuggestedSearches] = useState<string[]>([]);
  const [clusters, setClusters] = useState<SemanticCluster[]>([]);
  const [insights, setInsights] = useState<IntelligenceInsight[]>([]);
  const [statistics, setStatistics] = useState<IntelligenceStatistics | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        fetchedRecent,
        fetchedSuggested,
        fetchedClusters,
        fetchedInsights,
        fetchedStats,
      ] = await Promise.all([
        IntelligenceService.getRecentSearches(),
        IntelligenceService.getSuggestedSearches(),
        IntelligenceService.getClusters(),
        IntelligenceService.getInsights(),
        IntelligenceService.getStatistics(),
      ]);

      setRecentSearches(fetchedRecent);
      setSuggestedSearches(fetchedSuggested);
      setClusters(fetchedClusters);
      setInsights(fetchedInsights);
      setStatistics(fetchedStats);
    } catch (error) {
      console.error("Failed to load intelligence data", error);
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

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchQuery("");
      setSearchResults([]);
      return;
    }

    setSearchQuery(query);
    setIsSearching(true);
    try {
      const results = await IntelligenceService.search(query);
      setSearchResults(results);

      if (results.length > 0) {
        await IntelligenceService.addSearchToHistory(query, results.length);
        const newRecent = await IntelligenceService.getRecentSearches();
        setRecentSearches(newRecent);
      }
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  const refreshIntelligence = useCallback(async () => {
    await loadData();
  }, [loadData]);

  const context: IntelligenceContext = useMemo(
    () => ({
      searchQuery,
      isSearching,
      searchResults,
      recentSearches,
      suggestedSearches,
      clusters,
      insights,
      statistics,
    }),
    [
      searchQuery,
      isSearching,
      searchResults,
      recentSearches,
      suggestedSearches,
      clusters,
      insights,
      statistics,
    ],
  );

  const value = useMemo(
    () => ({
      context,
      isLoading,
      performSearch,
      clearSearch,
      refreshIntelligence,
    }),
    [context, isLoading, performSearch, clearSearch, refreshIntelligence],
  );

  return (
    <IntelligenceStateContext.Provider value={value}>
      {children}
    </IntelligenceStateContext.Provider>
  );
}

export function useIntelligenceContext() {
  const context = useContext(IntelligenceStateContext);
  if (context === undefined) {
    throw new Error(
      "useIntelligenceContext must be used within a IntelligenceProvider",
    );
  }
  return context;
}
