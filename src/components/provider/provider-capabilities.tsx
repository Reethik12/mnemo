import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useProviderCapabilities } from "@/hooks/use-provider-capabilities";
import { SectionHeader } from "@/components/shared/section-header";

interface ProviderCapabilitiesProps {
  providerId: string;
}

export const ProviderCapabilities = memo(function ProviderCapabilities({
  providerId,
}: ProviderCapabilitiesProps) {
  const { capabilities } = useProviderCapabilities(providerId);

  if (!capabilities) return null;

  return (
    <GlassContainer className="flex flex-col gap-4 p-4">
      <SectionHeader title="Capabilities" />
      <div className="grid grid-cols-2 gap-3">
        <CapabilityItem label="Vision" enabled={capabilities.hasVision} />
        <CapabilityItem
          label="Function Calling"
          enabled={capabilities.hasFunctionCalling}
        />
        <CapabilityItem label="JSON Mode" enabled={capabilities.hasJsonMode} />
        <CapabilityItem label="Streaming" enabled={capabilities.hasStreaming} />
        <CapabilityItem label="Reasoning" enabled={capabilities.hasReasoning} />
        <CapabilityItem
          label="Embeddings"
          enabled={capabilities.hasEmbeddings}
        />
      </div>
    </GlassContainer>
  );
});

function CapabilityItem({
  label,
  enabled,
}: {
  label: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-2 w-2 rounded-full ${enabled ? "bg-success" : "bg-bg-tertiary"}`}
      />
      <span
        className={`text-xs ${enabled ? "text-text-primary" : "text-text-muted"}`}
      >
        {label}
      </span>
    </div>
  );
}
