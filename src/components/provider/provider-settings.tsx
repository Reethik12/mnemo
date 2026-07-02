import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useProviderConfig } from "@/hooks/use-provider-config";
import { SectionHeader } from "@/components/shared/section-header";

interface ProviderSettingsProps {
  providerId: string;
}

export const ProviderSettings = memo(function ProviderSettings({
  providerId,
}: ProviderSettingsProps) {
  const { config, connection, update, test } = useProviderConfig(providerId);

  return (
    <GlassContainer className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <SectionHeader title="Configuration" />
        {connection && (
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-medium ${connection.isConnected ? "bg-success/20 text-success" : "bg-error/20 text-error"}`}
          >
            {connection.isConnected
              ? `Connected (${connection.latencyMs}ms)`
              : "Disconnected"}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">
            API Key
          </label>
          <input
            type="password"
            value={config.apiKey || ""}
            onChange={(e) => update({ apiKey: e.target.value })}
            placeholder="sk-..."
            className="bg-bg-primary border-border-subtle text-text-primary focus:border-primary w-full rounded-md border px-3 py-2 text-xs transition-colors focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">
            Base URL (Optional)
          </label>
          <input
            type="text"
            value={config.baseUrl || ""}
            onChange={(e) => update({ baseUrl: e.target.value })}
            placeholder="https://api..."
            className="bg-bg-primary border-border-subtle text-text-primary focus:border-primary w-full rounded-md border px-3 py-2 text-xs transition-colors focus:outline-none"
          />
        </div>

        <div className="border-border-subtle mt-auto flex justify-end gap-3 border-t pt-4">
          <button
            onClick={() =>
              update({ apiKey: "", baseUrl: "", organizationId: "" })
            }
            className="bg-bg-secondary border-border-subtle text-text-primary hover:bg-bg-tertiary rounded border px-4 py-2 text-xs font-medium transition-colors"
          >
            Reset
          </button>
          <button
            onClick={test}
            className="bg-primary hover:bg-primary-hover rounded px-4 py-2 text-xs font-medium text-white transition-colors"
          >
            Test Connection
          </button>
        </div>
      </div>
    </GlassContainer>
  );
});
