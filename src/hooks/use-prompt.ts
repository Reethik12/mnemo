import { usePromptContext } from "@/providers/prompt-provider";

export function usePrompt() {
  const {
    rawContent,
    setRawContent,
    activeVariables,
    updateVariable,
    compiledContent,
  } = usePromptContext();

  return {
    rawContent,
    setRawContent,
    activeVariables,
    updateVariable,
    compiledContent,
  };
}
