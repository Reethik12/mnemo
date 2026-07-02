import { Metadata } from "next";
import { IntelligenceProvider } from "@/providers/intelligence-provider";

export const metadata: Metadata = {
  title: "Semantic Intelligence | Mnemo",
  description:
    "Semantic search and intelligent insights for your memory fabric.",
};

export default function IntelligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <IntelligenceProvider>{children}</IntelligenceProvider>;
}
