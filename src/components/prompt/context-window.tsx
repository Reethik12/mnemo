import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useContextWindow } from "@/hooks/use-context-window";
import { SectionHeader } from "@/components/shared/section-header";

export const ContextWindow = memo(function ContextWindow() {
  const { contextMemories, selectedContextIds, toggleContext } =
    useContextWindow();

  return (
    <GlassContainer className="flex flex-col gap-4 p-4">
      <SectionHeader title="Context Window" />
      <div className="custom-scrollbar flex max-h-60 flex-col gap-2 overflow-y-auto">
        {contextMemories.map((memory) => {
          const isSelected = selectedContextIds.includes(memory.id);
          return (
            <div
              key={memory.id}
              onClick={() => toggleContext(memory.id)}
              className={`flex cursor-pointer flex-col gap-1 rounded-md border p-3 transition-colors ${isSelected ? "bg-primary/10 border-primary" : "bg-bg-secondary border-border-subtle hover:bg-bg-tertiary"} `}
            >
              <div className="flex items-start justify-between">
                <span className="text-text-primary text-xs font-semibold">
                  {memory.title}
                </span>
                <span className="text-text-muted bg-bg-primary rounded px-1.5 py-0.5 text-[10px]">
                  {memory.tokenCount} tkns
                </span>
              </div>
              <span className="text-text-secondary line-clamp-2 text-[10px]">
                {memory.summary}
              </span>
            </div>
          );
        })}
      </div>
    </GlassContainer>
  );
});
