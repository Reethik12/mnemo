import { memo } from "react";
import { Provider } from "@/types/provider";
import { StatusPill } from "@/components/shared/status-pill";

interface ProviderCardProps {
  provider: Provider;
  isActive: boolean;
  onClick: () => void;
}

export const ProviderCard = memo(function ProviderCard({
  provider,
  isActive,
  onClick,
}: ProviderCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${isActive ? "bg-primary/10 border-primary" : "bg-bg-secondary border-border-subtle hover:bg-bg-tertiary"} `}
    >
      <div className="bg-bg-primary border-border-subtle flex h-10 w-10 shrink-0 items-center justify-center rounded-md border text-lg font-bold">
        {provider.icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between">
          <h4 className="text-text-primary truncate text-sm font-semibold">
            {provider.name}
          </h4>
          <StatusPill
            status={
              provider.status === "active"
                ? "active"
                : provider.status === "degraded"
                  ? "beta"
                  : "inactive"
            }
          />
        </div>
        <p className="text-text-secondary truncate text-xs">
          {provider.description}
        </p>
      </div>
    </div>
  );
});
