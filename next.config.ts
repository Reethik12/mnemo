import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@cognee/cognee-ts"],
};

export default nextConfig;
