import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { db } from "@/lib/db";
import { env } from "@/lib/config";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        if (!env.SMTP_HOST) {
          console.error("Missing SMTP_HOST. Cannot send magic link.");
          throw new Error("SMTP configuration is missing. Cannot send magic link.");
        }
        console.log(`[MAGIC LINK] Would send magic link to ${email}: ${url}`);
      },
    }),
  ],
  socialProviders: {
    ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },
  secret: env.BETTER_AUTH_SECRET || "default_secret_for_development",
  trustedOrigins: env.BETTER_AUTH_URL
    ? [env.BETTER_AUTH_URL]
    : ["http://localhost:3000"],
});
