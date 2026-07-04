import { betterAuth } from "better-auth";
const auth = betterAuth({
  database: {
    provider: "postgresql",
    url: "mock",
  },
  socialProviders: {},
});
console.log(auth.options.socialProviders);
