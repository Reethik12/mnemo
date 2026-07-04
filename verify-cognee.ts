import { CogneeClient } from "./src/lib/cognee/client";

async function verify() {
  console.log("Verifying Cognee Cloud connection...");
  const isHealthy = await CogneeClient.healthCheck();
  
  if (isHealthy) {
    console.log("✅ Successfully connected to Cognee Cloud!");
  } else {
    console.log("❌ Failed to connect to Cognee Cloud. Please check your URL and API Key.");
  }
}

verify();
