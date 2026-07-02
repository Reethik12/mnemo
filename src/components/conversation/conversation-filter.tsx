import { memo } from "react";
import { useConversationFilter } from "@/hooks/use-conversation-filter";
import { ConversationSort } from "@/types/conversation";

export const ConversationFilter = memo(function ConversationFilter() {
  const { filter, setFilter, sort, setSort } = useConversationFilter();

  return (
    <div className="flex flex-wrap gap-2">
      <select
        value={filter.dateRange || "all"}
        onChange={(e) =>
          setFilter({
            ...filter,
            dateRange:
              e.target.value === "all"
                ? undefined
                : (e.target.value as "today" | "this-week" | "this-month"),
          })
        }
        className="bg-bg-secondary border-border-subtle text-text-primary focus:border-primary rounded-md border px-3 py-1.5 text-xs transition-colors focus:outline-none"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="this-week">This Week</option>
        <option value="this-month">This Month</option>
      </select>

      <select
        value={filter.status || "active"}
        onChange={(e) =>
          setFilter({
            ...filter,
            status: e.target.value as "active" | "archived" | "deleted",
          })
        }
        className="bg-bg-secondary border-border-subtle text-text-primary focus:border-primary rounded-md border px-3 py-1.5 text-xs transition-colors focus:outline-none"
      >
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as ConversationSort)}
        className="bg-bg-secondary border-border-subtle text-text-primary focus:border-primary rounded-md border px-3 py-1.5 text-xs transition-colors focus:outline-none"
      >
        <option value="updatedDesc">Recently Updated</option>
        <option value="updatedAsc">Oldest Updated</option>
        <option value="titleAsc">Title (A-Z)</option>
        <option value="titleDesc">Title (Z-A)</option>
      </select>
    </div>
  );
});
