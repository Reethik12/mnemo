import { TimelineEvent, TimelineStats } from "./types";
import { MOCK_TIMELINE_EVENTS, MOCK_STATS } from "./mock-data";

export async function getTimelineEvents(
  query?: string,
): Promise<TimelineEvent[]> {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 300));

  if (!query) {
    return MOCK_TIMELINE_EVENTS;
  }

  const lowerQuery = query.toLowerCase();
  return MOCK_TIMELINE_EVENTS.filter(
    (e) =>
      e.title.toLowerCase().includes(lowerQuery) ||
      e.summary.toLowerCase().includes(lowerQuery) ||
      e.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      e.source.toLowerCase().includes(lowerQuery),
  );
}

export async function getTimelineStats(): Promise<TimelineStats> {
  return MOCK_STATS;
}
