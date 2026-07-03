export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export class MCPServer {
  static getTools(): MCPTool[] {
    return [
      {
        name: "mnemo_query_memories",
        description: "Retrieve workspace memories matching semantic contexts.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
          },
          required: ["query"],
        },
      },
      {
        name: "mnemo_list_agents",
        description: "List active agents configured in current workspace.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ];
  }
}
