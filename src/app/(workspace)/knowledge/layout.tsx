import { Metadata } from "next";
import { KnowledgeProvider } from "@/providers/knowledge-provider";

export const metadata: Metadata = {
  title: "Knowledge Graph | Mnemo",
  description: "Explore the structural mapping of your memory entities.",
};

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <KnowledgeProvider>{children}</KnowledgeProvider>;
}
