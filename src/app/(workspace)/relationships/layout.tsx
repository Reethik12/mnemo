import { Metadata } from "next";
import { RelationshipProvider } from "@/providers/relationship-provider";

export const metadata: Metadata = {
  title: "Relationship Engine | Mnemo",
  description: "Explore connections mapped by the Memory Relationship Engine.",
};

export default function RelationshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RelationshipProvider>{children}</RelationshipProvider>;
}
