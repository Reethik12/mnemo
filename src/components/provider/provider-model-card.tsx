import { memo } from "react";
import { ProviderModel } from "@/types/provider";

interface ProviderModelCardProps {
  model: ProviderModel;
  isActive: boolean;
  onClick: () => void;
}

export const ProviderModelCard = memo(function ProviderModelCard({
  model,
  isActive,
  onClick,
}: ProviderModelCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer flex-col gap-2 rounded-lg border p-3 transition-colors ${isActive ? "bg-primary/10 border-primary" : "bg-bg-secondary border-border-subtle hover:bg-bg-tertiary"} `}
    >
      <div className="flex items-start justify-between">
        <h4 className="text-text-primary text-sm font-semibold">
          {model.name}
        </h4>
        {model.isDefault && (
          <span className="bg-primary/20 text-primary rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">
            Default
          </span>
        )}
      </div>
      <p className="text-text-secondary text-xs">{model.description}</p>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-text-muted bg-bg-primary border-border-subtle rounded border px-2 py-0.5 text-[10px]">
          {model.contextWindow.toLocaleString()} ctx
        </span>
        <span className="text-text-muted text-[10px] font-medium">
          ${model.pricing.inputPer1k}/1k
        </span>
      </div>
    </div>
  );
});
