import { useAIContext } from "@/providers/ai-provider";

export function useConversation() {
  const {
    activeConversation,
    conversationList,
    loadConversation,
    createConversation,
    deleteConversation,
    renameConversation,
    archiveConversation,
    favoriteConversation,
    pinConversation,
    clearConversation,
  } = useAIContext();

  return {
    activeConversation,
    conversationList,
    loadConversation,
    createConversation,
    deleteConversation,
    renameConversation,
    archiveConversation,
    favoriteConversation,
    pinConversation,
    clearConversation,
  };
}
