import { betterAuth } from "better-auth";
const auth = betterAuth({ database: { provider: "postgresql", url: "mock" } });
console.log(typeof auth.handler);
console.log(Object.keys(auth.handler));
