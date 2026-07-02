import { usePromptContext } from "@/providers/prompt-provider";

export function useTokenEstimator() {
  const { tokenEstimate } = usePromptContext();

  return {
    estimate: tokenEstimate,
  };
}
