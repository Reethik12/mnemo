import { Metadata } from "next";
import { ConversationProvider } from "@/providers/conversation-provider";

export const metadata: Metadata = {
  title: "Conversations | Mnemo",
  description: "Premium Conversation Workspace.",
};

export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConversationProvider>{children}</ConversationProvider>;
}
