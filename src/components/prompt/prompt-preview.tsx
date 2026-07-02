import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { usePrompt } from "@/hooks/use-prompt";
import { SectionHeader } from "@/components/shared/section-header";

export const PromptPreview = memo(function PromptPreview() {
  const { compiledContent } = usePrompt();

  return (
    <GlassContainer className="flex h-full flex-1 flex-col gap-4 p-4">
      <SectionHeader title="Compiled Preview" />
      <div className="custom-scrollbar bg-bg-secondary border-border-subtle text-text-primary flex-1 overflow-y-auto rounded-md border p-3 font-mono text-xs whitespace-pre-wrap">
        {compiledContent || (
          <span className="text-text-muted italic">
            Preview will appear here...
          </span>
        )}
      </div>
    </GlassContainer>
  );
});
