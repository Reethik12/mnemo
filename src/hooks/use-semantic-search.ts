import { useIntelligenceContext } from "@/providers/intelligence-provider";
import { useCallback, useState } from "react";

export function useSemanticSearch() {
  const { context, performSearch, clearSearch } = useIntelligenceContext();
  const [localQuery, setLocalQuery] = useState(context.searchQuery);

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      void performSearch(localQuery);
    },
    [localQuery, performSearch],
  );

  const handleClear = useCallback(() => {
    setLocalQuery("");
    clearSearch();
  }, [clearSearch]);

  const executeSearch = useCallback(
    (query: string) => {
      setLocalQuery(query);
      void performSearch(query);
    },
    [performSearch],
  );

  return {
    query: localQuery,
    setQuery: setLocalQuery,
    isSearching: context.isSearching,
    results: context.searchResults,
    recentSearches: context.recentSearches,
    suggestedSearches: context.suggestedSearches,
    handleSearch,
    handleClear,
    executeSearch,
  };
}
