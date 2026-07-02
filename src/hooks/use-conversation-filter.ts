import { useConversationContext } from "@/providers/conversation-provider";
import { useMemo, useState } from "react";

export function useConversationFilter() {
  const { conversations, filter, setFilter, sort, setSort } =
    useConversationContext();
  const [now] = useState(() => Date.now());

  const filteredConversations = useMemo(() => {
    let result = conversations;

    if (filter.status) {
      result = result.filter((c) => c.status === filter.status);
    }
    if (filter.isPinned !== undefined) {
      result = result.filter((c) => c.isPinned === filter.isPinned);
    }
    if (filter.isFavorite !== undefined) {
      result = result.filter((c) => c.isFavorite === filter.isFavorite);
    }
    if (filter.folderId) {
      result = result.filter((c) => c.folderId === filter.folderId);
    }
    if (filter.dateRange) {
      const oneDay = 86400000;
      result = result.filter((c) => {
        const updated = new Date(c.updatedAt).getTime();
        if (filter.dateRange === "today") return now - updated <= oneDay;
        if (filter.dateRange === "this-week")
          return now - updated <= oneDay * 7;
        if (filter.dateRange === "this-month")
          return now - updated <= oneDay * 30;
        return true;
      });
    }

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "updatedDesc":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "updatedAsc":
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        case "titleAsc":
          return a.title.localeCompare(b.title);
        case "titleDesc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [conversations, filter, sort, now]);

  return {
    filter,
    setFilter,
    sort,
    setSort,
    filteredConversations,
  };
}
