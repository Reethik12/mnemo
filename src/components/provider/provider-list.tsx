import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useProvider } from "@/hooks/use-provider";
import { ProviderCard } from "./provider-card";
import { SectionHeader } from "@/components/shared/section-header";

export const ProviderList = memo(function ProviderList() {
  const { providers, activeProviderId, setActiveProvider } = useProvider();

  return (
    <GlassContainer className="flex flex-col gap-4 p-4">
      <SectionHeader title="AI Providers" />
      <div className="flex flex-col gap-2">
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            isActive={activeProviderId === provider.id}
            onClick={() => setActiveProvider(provider.id)}
          />
        ))}
      </div>
    </GlassContainer>
  );
});
