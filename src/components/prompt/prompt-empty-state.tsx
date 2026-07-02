import { EmptyState } from "@/components/shared/empty-state";
import { memo } from "react";
import { usePromptTemplate } from "@/hooks/use-prompt-template";

export const PromptEmptyState = memo(function PromptEmptyState() {
  const { setActiveTemplate } = usePromptTemplate();

  return (
    <div className="animate-in fade-in flex h-full flex-col items-center justify-center duration-500">
      <EmptyState
        title="No Template Selected"
        description="Select a template from the list or start typing to create a new prompt."
        actionLabel="Create New Template"
        onAction={() => setActiveTemplate(null)}
      />
    </div>
  );
});
