import { Metadata } from "next";
import { AIProviderComponent } from "@/providers/ai-provider";

export const metadata: Metadata = {
  title: "AI Core | Mnemo",
  description: "Core AI interface for interacting with your Memory Fabric.",
};

export default function AILayout({ children }: { children: React.ReactNode }) {
  return <AIProviderComponent>{children}</AIProviderComponent>;
}
