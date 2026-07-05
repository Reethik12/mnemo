import { importMockAction } from "./src/actions/memory.actions";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

async function run() {
  console.log("Calling importMockAction...");
  const res = await importMockAction("PDF", "Test PDF content");
  console.log("Result:", res);
}
run();
