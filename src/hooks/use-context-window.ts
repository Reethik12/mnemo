import { usePromptContext } from "@/providers/prompt-provider";

export function useContextWindow() {
  const { contextMemories, selectedContextIds, toggleContext } =
    usePromptContext();

  return {
    contextMemories,
    selectedContextIds,
    toggleContext,
  };
}
