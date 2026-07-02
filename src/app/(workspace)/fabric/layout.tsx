import { Metadata } from "next";
import { FabricProvider } from "@/providers/fabric-provider";

export const metadata: Metadata = {
  title: "Memory Fabric | Mnemo",
  description:
    "Explore the underlying neural architecture connecting your memories.",
};

export default function FabricLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FabricProvider>{children}</FabricProvider>;
}
