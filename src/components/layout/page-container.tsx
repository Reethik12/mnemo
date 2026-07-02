import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Section ID for scroll targeting */
  id?: string;
  /** Use narrower max-width */
  narrow?: boolean;
}

// ─── Component ───────────────────────────────────────

export function PageContainer({
  children,
  className,
  id,
  narrow = false,
}: PageContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full px-6 lg:px-8",
        "py-[var(--spacing-section-sm)] lg:py-[var(--spacing-section)]",
        narrow ? "max-w-4xl" : "max-w-7xl",
        className,
      )}
    >
      {children}
    </section>
  );
}
