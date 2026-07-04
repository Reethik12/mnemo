import "dotenv/config";
import { db as prisma } from "../src/lib/db";

async function main() {
  console.log("🌱 Seeding database...");

  const user = await prisma.user.upsert({
    where: {
      id: "00000000-0000-0000-0000-000000000000",
    },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000000",
      email: "system@mnemo.ai",
      name: "System Admin",
    },
  });

  await prisma.workspace.upsert({
    where: {
      id: "00000000-0000-0000-0000-000000000000",
    },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "Default Workspace",
      userId: user.id,
    },
  });

  const providers = [
    {
      id: "openai",
      name: "OpenAI",
      apiKey: null,
      baseUrl: "https://api.openai.com/v1",
      capabilities: {
        hasVision: true,
        hasFunctionCalling: true,
      },
    },
    {
      id: "anthropic",
      name: "Anthropic",
      apiKey: null,
      baseUrl: "https://api.anthropic.com",
      capabilities: {
        hasVision: true,
        hasFunctionCalling: true,
      },
    },
    {
      id: "gemini",
      name: "Google Gemini",
      apiKey: null,
      baseUrl: "https://generativelanguage.googleapis.com",
      capabilities: {
        hasVision: true,
        hasFunctionCalling: true,
      },
    },
    {
      id: "groq",
      name: "Groq",
      apiKey: null,
      baseUrl: "https://api.groq.com/openai/v1",
      capabilities: {
        hasVision: false,
        hasFunctionCalling: true,
      },
    },
  ];

  for (const provider of providers) {
    await prisma.provider.upsert({
      where: {
        id: provider.id,
      },
      update: provider,
      create: provider,
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
