import { memo } from "react";
import { PromptTemplate } from "@/types/prompt";
import { usePromptTemplate } from "@/hooks/use-prompt-template";

interface PromptTemplateCardProps {
  template: PromptTemplate;
}

export const PromptTemplateCard = memo(function PromptTemplateCard({
  template,
}: PromptTemplateCardProps) {
  const { activeTemplateId, setActiveTemplate } = usePromptTemplate();
  const isActive = activeTemplateId === template.id;

  return (
    <div
      onClick={() => setActiveTemplate(template.id)}
      className={`cursor-pointer rounded-lg border p-3 transition-colors ${isActive ? "bg-primary/10 border-primary" : "bg-bg-secondary border-border-subtle hover:bg-bg-tertiary"} `}
    >
      <div className="mb-1 flex items-start justify-between">
        <h4 className="text-text-primary text-sm font-semibold">
          {template.title}
        </h4>
        {template.isFavorite && (
          <span className="text-warning text-[10px]">⭐</span>
        )}
      </div>
      <p className="text-text-secondary line-clamp-2 text-xs">
        {template.description}
      </p>
    </div>
  );
});
