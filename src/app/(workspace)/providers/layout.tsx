import { Metadata } from "next";
import { ProviderProvider } from "@/providers/provider-provider";

export const metadata: Metadata = {
  title: "AI Providers | Mnemo",
  description: "Manage AI Providers and Models.",
};

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProviderProvider>{children}</ProviderProvider>;
}
