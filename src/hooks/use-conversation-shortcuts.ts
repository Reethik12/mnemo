import { useEffect } from "react";
import { useConversationContext } from "@/providers/conversation-provider";

export function useConversationShortcuts() {
  const {
    createConversation,
    deleteSelected,
    clearSelection,
    selectedConversationIds,
  } = useConversationContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + N: New Conversation
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        createConversation("gpt-4o"); // Using default mock model
      }

      // Delete: Delete selected
      if (e.key === "Delete" || e.key === "Backspace") {
        // Prevent deleting if typing in an input/textarea
        if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName))
          return;

        if (selectedConversationIds.length > 0) {
          e.preventDefault();
          deleteSelected();
        }
      }

      // Escape: Clear selection
      if (e.key === "Escape") {
        if (selectedConversationIds.length > 0) {
          e.preventDefault();
          clearSelection();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    createConversation,
    deleteSelected,
    clearSelection,
    selectedConversationIds.length,
  ]);
}
