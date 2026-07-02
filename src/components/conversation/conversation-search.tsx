import { memo } from "react";
import { useConversationSearch } from "@/hooks/use-conversation-search";

export const ConversationSearch = memo(function ConversationSearch() {
  const { query, search, clearSearch } = useConversationSearch();

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-text-muted">🔍</span>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => search(e.target.value)}
        className="bg-bg-secondary border-border-subtle text-text-primary focus:border-primary w-full rounded-md border py-2 pr-10 pl-10 text-sm transition-colors focus:outline-none"
        placeholder="Search conversations..."
      />
      {query && (
        <button
          onClick={clearSearch}
          className="text-text-muted hover:text-text-primary absolute inset-y-0 right-0 flex items-center pr-3 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
});
