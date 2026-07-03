export const cogneeConfig = {
  enabled: process.env.COGNEE_ENABLED === "true",
  apiUrl: process.env.COGNEE_API_URL || "http://localhost:8000",
  apiKey: process.env.COGNEE_API_KEY || "",
  namespace: "mnemo_graph",
};
