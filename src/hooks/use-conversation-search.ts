import { useConversationContext } from "@/providers/conversation-provider";

export function useConversationSearch() {
  const { searchQuery, searchResults, isSearching, search, clearSearch } =
    useConversationContext();

  return {
    query: searchQuery,
    results: searchResults,
    isSearching,
    search,
    clearSearch,
  };
}
