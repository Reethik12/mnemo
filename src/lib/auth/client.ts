import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import { env } from "@/lib/config";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [magicLinkClient()],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;
