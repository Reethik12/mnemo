import { useState, useCallback, useEffect } from "react";
import type {
  TimelineEvent,
  TimelineStats,
  EvolutionDataPoint,
} from "@/services/timeline/types";

export function useTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [stats, setStats] = useState<TimelineStats | null>(null);
  const [evolution, setEvolution] = useState<EvolutionDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchTimeline = useCallback(async (q?: string) => {
    setIsLoading(true);
    try {
      const url = q
        ? `/api/timeline?q=${encodeURIComponent(q)}`
        : `/api/timeline`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events);
        setStats(data.stats);
        setEvolution(data.evolution);
      }
    } catch (err) {
      console.error("Timeline fetch error", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTimeline(query);
  }, [fetchTimeline, query]);

  return {
    events,
    stats,
    evolution,
    isLoading,
    query,
    setQuery,
    refetch: () => fetchTimeline(query),
  };
}
