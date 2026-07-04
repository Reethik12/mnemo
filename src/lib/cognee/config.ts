export const cogneeConfig = {
  enabled: process.env.COGNEE_ENABLED !== "false", // Default to true unless explicitly disabled
  apiUrl: process.env.COGNEE_API_URL || "https://api.cognee.ai",
  apiKey: process.env.COGNEE_API_KEY || "",
  namespace: "mnemo_graph",
};
