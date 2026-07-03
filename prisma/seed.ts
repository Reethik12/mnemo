import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});

async function main() {
  console.log("Seeding database...");

  const user = await prisma.user.upsert({
    where: { id: "00000000-0000-0000-0000-000000000000" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000000",
      email: "system@mnemo.ai",
      name: "System Admin",
      // BetterAuth usually manages this, but this is a mock seed
    },
  });

  await prisma.workspace.upsert({
    where: { id: "00000000-0000-0000-0000-000000000000" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "Default Workspace",
      userId: user.id,
    },
  });

  // Providers
  const providers = [
    {
      id: "openai",
      name: "OpenAI",
      description: "Industry-leading foundation models.",
      status: "active",
      icon: "O",
      website: "https://openai.com",
      capabilities: { hasVision: true, hasFunctionCalling: true },
    },
    {
      id: "anthropic",
      name: "Anthropic",
      description: "Highly capable and safe models.",
      status: "active",
      icon: "A",
      website: "https://anthropic.com",
      capabilities: { hasVision: true, hasFunctionCalling: true },
    },
    {
      id: "gemini",
      name: "Google Gemini",
      description: "Google's multimodal powerhouse.",
      status: "active",
      icon: "G",
      website: "https://deepmind.google",
      capabilities: { hasVision: true, hasFunctionCalling: true },
    },
    {
      id: "groq",
      name: "Groq",
      description: "Ultra-low latency LPU inference.",
      status: "active",
      icon: "Q",
      website: "https://groq.com",
      capabilities: { hasVision: false, hasFunctionCalling: true },
    },
  ];

  for (const p of providers) {
    await prisma.provider.upsert({
      where: { id: p.id },
      update: { ...p },
      create: { ...p },
    });
  }

  console.log("Seeding complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
