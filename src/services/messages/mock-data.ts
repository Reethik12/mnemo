export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
};

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "space-work": [
    {
      id: "msg-1",
      conversationId: "space-work",
      senderId: "user-1",
      senderName: "Reethik",
      text: "Hey, I just added some new system architecture diagrams.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      status: "read",
    },
    {
      id: "msg-2",
      conversationId: "space-work",
      senderId: "user-2",
      senderName: "Alex",
      text: "Looks great! I'll review them.",
      timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      status: "read",
    },
  ],
};

export function addMessage(msg: Message) {
  if (!MOCK_MESSAGES[msg.conversationId]) {
    MOCK_MESSAGES[msg.conversationId] = [];
  }
  MOCK_MESSAGES[msg.conversationId].push(msg);
}
