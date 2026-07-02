import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { usePrompt } from "@/hooks/use-prompt";
import { SectionHeader } from "@/components/shared/section-header";
import { usePromptTemplate } from "@/hooks/use-prompt-template";

export const PromptBuilder = memo(function PromptBuilder() {
  const { rawContent, setRawContent, activeVariables, updateVariable } =
    usePrompt();
  const { activeTemplate } = usePromptTemplate();

  return (
    <GlassContainer className="flex flex-1 flex-col gap-4 p-4">
      <SectionHeader
        title={
          activeTemplate ? `Editing: ${activeTemplate.title}` : "Prompt Builder"
        }
      />

      <div className="flex flex-1 flex-col gap-4">
        <textarea
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          placeholder="Enter your prompt here... Use {{variableName}} to define variables."
          className="bg-bg-primary border-border-subtle text-text-primary focus:border-primary custom-scrollbar w-full flex-1 resize-none rounded-md border p-3 text-sm transition-colors focus:outline-none"
        />

        {Object.keys(activeVariables).length > 0 && (
          <div className="bg-bg-secondary border-border-subtle flex flex-col gap-2 rounded-md border p-3">
            <h4 className="text-text-secondary text-xs font-semibold tracking-wider uppercase">
              Variables
            </h4>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {Object.entries(activeVariables).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-text-muted text-[10px] font-medium">
                    {key}
                  </label>
                  <input
                    type="text"
                    value={value as string}
                    onChange={(e) => updateVariable(key, e.target.value)}
                    placeholder={`Value for ${key}`}
                    className="bg-bg-primary border-border-subtle text-text-primary focus:border-primary w-full rounded border px-2 py-1 text-xs transition-colors focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GlassContainer>
  );
});
