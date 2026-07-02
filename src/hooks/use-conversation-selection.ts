import { useConversationContext } from "@/providers/conversation-provider";

export function useConversationSelection() {
  const {
    selectedConversationIds,
    toggleSelection,
    clearSelection,
    selectAll,
    deleteSelected,
    archiveSelected,
  } = useConversationContext();

  return {
    selectedIds: selectedConversationIds,
    isMultiSelect: selectedConversationIds.length > 0,
    toggleSelection,
    clearSelection,
    selectAll,
    deleteSelected,
    archiveSelected,
  };
}
