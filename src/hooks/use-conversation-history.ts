import { useConversationContext } from "@/providers/conversation-provider";
import { useMemo } from "react";

export function useConversationHistory() {
  const { conversations } = useConversationContext();

  const recentHistory = useMemo(() => {
    return [...conversations]
      .filter((c) => c.status !== "deleted")
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 10);
  }, [conversations]);

  return {
    recentHistory,
  };
}
