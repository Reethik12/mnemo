import { GlassContainer } from "@/components/shared/glass-container";
import { useIntelligence } from "@/hooks/use-intelligence";
import { useSemanticSearch } from "@/hooks/use-semantic-search";
import { Button } from "@/components/ui/button";
import { memo } from "react";

export const IntelligenceSidebar = memo(function IntelligenceSidebar() {
  const { recentSearches, suggestedSearches, refreshIntelligence } =
    useIntelligence();
  const { executeSearch } = useSemanticSearch();

  return (
    <div className="flex w-64 shrink-0 flex-col gap-6">
      <GlassContainer className="flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold">Semantic Intelligence</h2>
        <p className="text-text-secondary text-sm">
          AI-driven analysis of your memory fabric. Discover hidden patterns and
          connect concepts naturally.
        </p>

        <div className="mt-2 flex flex-col gap-2">
          <Button
            onClick={refreshIntelligence}
            variant="secondary"
            className="w-full justify-center"
          >
            Refresh Engine
          </Button>
        </div>
      </GlassContainer>

      <GlassContainer className="flex flex-col gap-4 p-4">
        <h3 className="text-text-secondary text-sm font-medium">
          Suggested Queries
        </h3>
        <div className="flex flex-col gap-2">
          {suggestedSearches.map((query) => (
            <button
              key={query}
              onClick={() => executeSearch(query)}
              className="text-text-primary hover:text-primary line-clamp-1 text-left text-sm transition-colors"
              title={query}
            >
              • {query}
            </button>
          ))}
        </div>
      </GlassContainer>

      <GlassContainer className="flex flex-1 flex-col gap-4 overflow-hidden p-4">
        <h3 className="text-text-secondary text-sm font-medium">
          Recent Searches
        </h3>
        <div className="custom-scrollbar flex flex-col gap-3 overflow-y-auto">
          {recentSearches.map((item) => (
            <button
              key={item.id}
              onClick={() => executeSearch(item.query)}
              className="group flex flex-col gap-1 text-left"
            >
              <span className="text-text-primary group-hover:text-primary line-clamp-1 text-sm transition-colors">
                {item.query}
              </span>
              <div className="text-text-muted flex items-center justify-between text-xs">
                <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                <span>{item.resultCount} results</span>
              </div>
            </button>
          ))}
          {recentSearches.length === 0 && (
            <span className="text-text-muted text-sm">No recent searches.</span>
          )}
        </div>
      </GlassContainer>
    </div>
  );
});
