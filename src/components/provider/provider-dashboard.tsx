import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useProvider } from "@/hooks/use-provider";
import { SectionHeader } from "@/components/shared/section-header";
import { ProviderList } from "./provider-list";
import { ProviderModelList } from "./provider-model-list";
import { ProviderCapabilities } from "./provider-capabilities";
import { ProviderHealth } from "./provider-health";
import { ProviderUsage } from "./provider-usage";
import { ProviderSettings } from "./provider-settings";
import { ProviderStatistics } from "./provider-statistics";

export const ProviderDashboard = memo(function ProviderDashboard() {
  const { activeProvider } = useProvider();

  return (
    <div className="flex h-full w-full gap-6 overflow-hidden">
      <div className="custom-scrollbar flex h-full w-64 shrink-0 flex-col gap-6 overflow-y-auto pr-2">
        <ProviderList />
      </div>

      <div className="flex h-full flex-1 flex-col gap-6 overflow-hidden">
        <div className="shrink-0">
          <ProviderStatistics />
        </div>

        <div className="flex flex-1 gap-6 overflow-hidden">
          <div className="custom-scrollbar flex h-full flex-1 flex-col gap-6 overflow-y-auto pr-2">
            {activeProvider ? (
              <>
                <GlassContainer className="flex flex-col gap-4 p-4">
                  <SectionHeader title={`${activeProvider.name} Models`} />
                  <ProviderModelList providerId={activeProvider.id} />
                </GlassContainer>

                <ProviderSettings providerId={activeProvider.id} />
              </>
            ) : (
              <div className="text-text-muted flex flex-1 items-center justify-center">
                Select a provider to view details
              </div>
            )}
          </div>

          <div className="custom-scrollbar flex h-full w-80 shrink-0 flex-col gap-6 overflow-y-auto pr-2">
            {activeProvider && (
              <>
                <ProviderHealth providerId={activeProvider.id} />
                <ProviderCapabilities providerId={activeProvider.id} />
                <ProviderUsage />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
