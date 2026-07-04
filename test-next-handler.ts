import { betterAuth } from "better-auth";
import { toNextJsHandler } from "better-auth/next-js";
const auth = betterAuth({ database: { provider: "postgresql", url: "mock" } });
const handler = toNextJsHandler(auth);
console.log(Object.keys(handler));
