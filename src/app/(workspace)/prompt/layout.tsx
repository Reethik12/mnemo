import { Metadata } from "next";
import { PromptProvider } from "@/providers/prompt-provider";

export const metadata: Metadata = {
  title: "Prompt Engine | Mnemo",
  description: "Advanced Prompt & Context Engineering.",
};

export default function PromptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PromptProvider>{children}</PromptProvider>;
}
