import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

interface SidebarSectionProps {
  title: string;
  isExpanded: boolean;
  children: React.ReactNode;
}

// ─── Component ───────────────────────────────────────

export function SidebarSection({
  title,
  isExpanded,
  children,
}: SidebarSectionProps) {
  return (
    <div className="mb-2">
      {isExpanded && (
        <h3
          className={cn(
            "text-text-tertiary mb-1 px-3 text-[10px] font-semibold tracking-wider uppercase",
          )}
        >
          {title}
        </h3>
      )}
      {!isExpanded && (
        <div className="border-border mx-3 mb-2 border-t" aria-hidden="true" />
      )}
      <nav className="flex flex-col gap-0.5" aria-label={title}>
        {children}
      </nav>
    </div>
  );
}
