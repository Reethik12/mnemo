import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import { getBaseUrl } from "@/lib/url";

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [magicLinkClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
