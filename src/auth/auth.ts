import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";
import { env } from "@/lib/config";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: env.BETTER_AUTH_SECRET || "default_secret_for_development",
  trustedOrigins: env.BETTER_AUTH_URL
    ? [env.BETTER_AUTH_URL]
    : ["http://localhost:3000"],
});
