import { rememberMemory } from "./src/services/memory.service";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

async function run() {
  try {
    const res = await rememberMemory({
      title: "Test Import",
      content: "This is a test content from the test script.",
      tags: ["test"],
      category: "External Import",
    });
    console.log("SUCCESS", res);
  } catch (e) {
    console.error("ERROR", e);
  }
}
run();
