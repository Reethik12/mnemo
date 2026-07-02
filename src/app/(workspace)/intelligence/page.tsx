"use client";

import { IntelligenceDashboard } from "@/components/intelligence/intelligence-dashboard";
import { IntelligenceSidebar } from "@/components/intelligence/intelligence-sidebar";
import { useIntelligence } from "@/hooks/use-intelligence";
import { IntelligenceLoading } from "@/components/intelligence/intelligence-loading";

export default function IntelligencePage() {
  const { isLoading } = useIntelligence();

  if (isLoading) {
    return <IntelligenceLoading />;
  }

  return (
    <div className="flex h-full w-full gap-6">
      <IntelligenceSidebar />
      <IntelligenceDashboard />
    </div>
  );
}
