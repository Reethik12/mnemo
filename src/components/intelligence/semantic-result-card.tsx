import { SemanticSearchResult } from "@/types/intelligence";
import { Card } from "@/components/ui/card";
import { memo } from "react";

interface SemanticResultCardProps {
  result: SemanticSearchResult;
}

export const SemanticResultCard = memo(function SemanticResultCard({
  result,
}: SemanticResultCardProps) {
  return (
    <Card className="animate-in slide-in-from-bottom-2 flex flex-col gap-3 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-text-primary flex-1 text-sm font-medium">
          {result.title}
        </h4>
        <span className="bg-success/10 text-success border-success/20 inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-xs">
          {(result.relevanceScore * 100).toFixed(0)}% Match
        </span>
      </div>

      <p className="text-text-secondary text-sm leading-relaxed">
        {result.excerpt}
      </p>

      <div className="border-border-subtle mt-2 flex items-center justify-between border-t pt-3 text-xs">
        <span className="text-text-muted italic">{result.matchReason}</span>
        <div className="flex gap-1">
          {result.tags.map((tag) => (
            <span
              key={tag}
              className="bg-bg-secondary border-border-subtle text-text-muted rounded border px-2 py-0.5 text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
});
