import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { TimelineEvent } from "@/services/timeline/types";

const getTypeStyles = (type: string) => {
  switch (type) {
    case "created":
      return "text-green-400 bg-green-400/10 border-green-400/20";
    case "improved":
      return "text-accent-blue bg-accent-blue/10 border-accent-blue/20";
    case "restored":
      return "text-purple-400 bg-purple-400/10 border-purple-400/20";
    case "forgotten":
      return "text-red-400 bg-red-400/10 border-red-400/20";
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }
};

export function TimelineView({
  events,
  isLoading,
  onSelectEvent,
}: {
  events: TimelineEvent[];
  isLoading: boolean;
  onSelectEvent: (id: string) => void;
}) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="glass h-32 animate-pulse rounded-2xl bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="glass glow-border text-text-secondary rounded-2xl p-12 text-center">
        No events found for this filter.
      </div>
    );
  }

  return (
    <div className="relative ml-4 space-y-8 border-l-2 border-white/10 pb-12 md:ml-6">
      {events.map((event, i) => (
        <motion.div
          key={event.id}
          custom={i}
          variants={fadeInUp}
          className="group relative cursor-pointer pl-8 md:pl-10"
          onClick={() => onSelectEvent(event.memoryId)}
        >
          {/* Timeline dot */}
          <div className="bg-accent-blue absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-[#050505] transition-transform group-hover:scale-125" />

          <div className="glass glow-border rounded-2xl bg-white/5 p-5 transition-colors group-hover:bg-white/10">
            <div className="mb-3 flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <h4 className="text-text-primary group-hover:text-accent-blue text-lg font-semibold transition-colors">
                {event.title}
              </h4>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span
                  className={`rounded-full border px-2 py-1 ${getTypeStyles(event.type)} capitalize`}
                >
                  {event.type}
                </span>
                <span className="text-text-secondary">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <p className="text-text-secondary mb-4 line-clamp-2 text-sm">
              {event.summary}
            </p>

            <div className="text-text-secondary flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {event.confidence}% Confidence
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                {event.relationshipCount} Relationships
              </div>
              <div className="mt-2 ml-auto flex items-center gap-2 md:mt-0">
                {event.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded bg-white/10 px-2 py-1">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
