import { createAuthClient } from "better-auth/react";
const authClient = createAuthClient({ baseURL: "http://localhost:3000" });
console.log(authClient.$store.baseURL);
console.log(authClient.$store);
