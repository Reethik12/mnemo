import { GlassContainer } from "@/components/shared/glass-container";
import { useSemanticSearch } from "@/hooks/use-semantic-search";
import { SemanticResultCard } from "./semantic-result-card";
import { memo } from "react";

export const SemanticSearchComponent = memo(function SemanticSearchComponent() {
  const { query, setQuery, isSearching, results, handleSearch, handleClear } =
    useSemanticSearch();

  return (
    <GlassContainer className="animate-in fade-in slide-in-from-top-4 flex flex-col gap-6 p-6 duration-500">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="from-primary to-accent-purple bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent">
          Semantic Search Engine
        </h2>
        <p className="text-text-secondary max-w-md text-sm">
          Query your memory fabric using natural language. The engine
          understands concepts, context, and relationships.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="relative mx-auto flex w-full max-w-2xl items-center"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 'meetings about local AI architecture'..."
          className="bg-bg-secondary border-border text-text-primary focus:border-primary placeholder:text-text-muted h-12 w-full rounded-xl border pr-24 pl-10 transition-colors focus:outline-none"
        />
        <div className="text-text-muted absolute left-4">🔍</div>
        <div className="absolute right-2 flex gap-2">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-text-muted hover:text-text-primary px-2 text-xs transition-colors"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="bg-primary hover:bg-primary-hover h-8 rounded-lg px-4 text-xs font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {isSearching && (
        <div className="text-text-muted flex animate-pulse items-center justify-center py-10">
          Analyzing semantic vectors...
        </div>
      )}

      {!isSearching && results.length > 0 && (
        <div className="mt-2 flex flex-col gap-4">
          <h3 className="text-text-secondary text-sm font-medium">
            Found {results.length} semantic matches
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {results.map((result) => (
              <SemanticResultCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      )}
    </GlassContainer>
  );
});
