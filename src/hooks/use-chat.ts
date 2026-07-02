import { useAIContext } from "@/providers/ai-provider";
import { useCallback } from "react";

export function useChat() {
  const {
    activeConversation,
    sendMessage,
    regenerate,
    cancelGeneration,
    isGenerating,
    loadingState,
    errorState,
  } = useAIContext();

  const send = useCallback(
    async (content: string) => {
      await sendMessage(content);
    },
    [sendMessage],
  );

  const deleteMessage = useCallback(async (messageId: string) => {
    // In a real app we'd call an API and then dispatch a state update.
    console.log(`Mock delete message ${messageId}`);
  }, []);

  const editMessage = useCallback(
    async (messageId: string, newContent: string) => {
      console.log(`Mock edit message ${messageId} to ${newContent}`);
    },
    [],
  );

  const retry = useCallback(
    async (messageId: string) => {
      await regenerate(messageId);
    },
    [regenerate],
  );

  return {
    messages: activeConversation?.messages || [],
    send,
    regenerate,
    deleteMessage,
    editMessage,
    retry,
    cancelGeneration,
    loading: loadingState,
    isGenerating,
    error: errorState,
  };
}
