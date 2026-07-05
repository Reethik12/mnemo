import { AssistantMessage } from "./types";
import { MOCK_REPLAYS } from "./mock-data";

export async function askEvolutionAssistant(
  memoryId: string,
  query: string,
): Promise<AssistantMessage> {
  await new Promise((res) => setTimeout(res, 800));

  const replay = MOCK_REPLAYS[memoryId];
  let answer = `I'm analyzing the evolution of this memory.`;

  if (replay) {
    const vLast = replay.versions[replay.versions.length - 1];
    if (
      query.toLowerCase().includes("how") ||
      query.toLowerCase().includes("explain")
    ) {
      answer = `This memory evolved over ${replay.versions.length} versions. Initially, it lacked depth, but through the \`improve()\` process, I added concepts like: ${vLast.newConceptsLearned.join(", ")}. The confidence score increased to ${vLast.confidenceScore}%.`;
    } else if (query.toLowerCase().includes("concept")) {
      answer = `New concepts recently integrated into this memory include: ${vLast.newConceptsLearned.join(", ")}. These were extracted from related materials in your Memory Fabric.`;
    } else if (query.toLowerCase().includes("future")) {
      answer = `To further improve this memory, I recommend adding more specific code examples or integrating it with your recent notes on System Design.`;
    } else {
      answer = `Based on the evolution of "${replay.title}", it has grown significantly in relationship density and confidence. What specific aspect of its history would you like me to explain?`;
    }
  }

  return {
    id: `msg_${Date.now()}`,
    role: "ai",
    content: answer,
    timestamp: new Date().toISOString(),
  };
}
