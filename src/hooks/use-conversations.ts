import { useConversationContext } from "@/providers/conversation-provider";

export function useConversations() {
  const {
    conversations,
    activeConversation,
    folders,
    loading,
    error,
    loadConversation,
    createConversation,
    duplicateConversation,
    renameConversation,
    deleteConversation,
    archiveConversation,
    restoreConversation,
    favoriteConversation,
    pinConversation,
    moveConversation,
  } = useConversationContext();

  return {
    conversations,
    activeConversation,
    folders,
    loading,
    error,
    loadConversation,
    createConversation,
    duplicateConversation,
    renameConversation,
    deleteConversation,
    archiveConversation,
    restoreConversation,
    favoriteConversation,
    pinConversation,
    moveConversation,
  };
}
