import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { usePromptTemplate } from "@/hooks/use-prompt-template";
import { PromptTemplateCard } from "./prompt-template-card";
import { SectionHeader } from "@/components/shared/section-header";

export const PromptTemplateList = memo(function PromptTemplateList() {
  const { templates } = usePromptTemplate();

  return (
    <GlassContainer className="flex flex-col gap-4 p-4">
      <SectionHeader title="Prompt Templates" />
      <div className="custom-scrollbar flex max-h-80 flex-col gap-2 overflow-y-auto">
        {templates.map((template) => (
          <PromptTemplateCard key={template.id} template={template} />
        ))}
      </div>
    </GlassContainer>
  );
});
