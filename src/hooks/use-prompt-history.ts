import { usePromptContext } from "@/providers/prompt-provider";

export function usePromptHistory() {
  const { history } = usePromptContext();

  return {
    history,
  };
}
