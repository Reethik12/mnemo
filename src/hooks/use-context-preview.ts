import { usePromptContext } from "@/providers/prompt-provider";
import { useMemo } from "react";

export function useContextPreview() {
  const { contextMemories, selectedContextIds } = usePromptContext();

  const selectedMemories = useMemo(() => {
    return contextMemories.filter((c) => selectedContextIds.includes(c.id));
  }, [contextMemories, selectedContextIds]);

  return {
    selectedMemories,
    hasContext: selectedMemories.length > 0,
    totalContextTokens: selectedMemories.reduce(
      (acc, c) => acc + c.tokenCount,
      0,
    ),
  };
}
