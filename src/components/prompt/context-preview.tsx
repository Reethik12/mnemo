import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useContextPreview } from "@/hooks/use-context-preview";

export const ContextPreview = memo(function ContextPreview() {
  const { selectedMemories, hasContext, totalContextTokens } =
    useContextPreview();

  if (!hasContext) return null;

  return (
    <GlassContainer className="bg-bg-secondary border-border-subtle flex flex-col gap-2 p-3">
      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-xs font-semibold tracking-wider uppercase">
          Injected Context
        </span>
        <span className="text-text-muted text-[10px]">
          {totalContextTokens} tokens
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedMemories.map((m) => (
          <span
            key={m.id}
            className="bg-bg-primary border-border-subtle text-text-primary flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
          >
            <span className="text-primary">📎</span> {m.title}
          </span>
        ))}
      </div>
    </GlassContainer>
  );
});
