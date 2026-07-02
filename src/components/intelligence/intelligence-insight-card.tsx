import { IntelligenceInsight } from "@/types/intelligence";
import { Card } from "@/components/ui/card";
import { memo } from "react";
import { cn } from "@/lib/cn";

interface IntelligenceInsightCardProps {
  insight: IntelligenceInsight;
}

export const IntelligenceInsightCard = memo(function IntelligenceInsightCard({
  insight,
}: IntelligenceInsightCardProps) {
  const getTypeColor = (type: IntelligenceInsight["type"]) => {
    switch (type) {
      case "trend":
        return "text-primary border-primary/20 bg-primary/10";
      case "gap":
        return "text-warning border-warning/20 bg-warning/10";
      case "connection":
        return "text-secondary border-secondary/20 bg-secondary/10";
      case "anomaly":
        return "text-accent-purple border-accent-purple/20 bg-accent-purple/10";
    }
  };

  return (
    <Card className="hover:border-border-hover animate-in fade-in flex cursor-pointer flex-col gap-3 p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-text-primary text-sm font-semibold">
          {insight.title}
        </h4>
        <span
          className={cn(
            "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] capitalize",
            getTypeColor(insight.type),
          )}
        >
          {insight.type}
        </span>
      </div>
      <p className="text-text-secondary text-sm">{insight.description}</p>

      <div className="text-text-muted border-border-subtle mt-auto flex items-center justify-between border-t pt-2 text-xs">
        <span>Confidence: {(insight.confidenceScore * 100).toFixed(0)}%</span>
        {insight.relatedMemoryIds.length > 0 && (
          <span>{insight.relatedMemoryIds.length} Memories</span>
        )}
      </div>
    </Card>
  );
});
