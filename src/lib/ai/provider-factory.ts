import { AIProvider } from "./types";
import { OpenAIProvider } from "./providers/openai-provider";
import { AnthropicProvider } from "./providers/anthropic-provider";
import { GoogleProvider } from "./providers/google-provider";
import { GroqProvider } from "./providers/groq-provider";
import { OllamaProvider } from "./providers/ollama-provider";

export class ProviderFactory {
  static getProvider(providerId: string): AIProvider {
    switch (providerId) {
      case "openai":
        return new OpenAIProvider(process.env.OPENAI_API_KEY);
      case "anthropic":
        return new AnthropicProvider(process.env.ANTHROPIC_API_KEY);
      case "google":
        return new GoogleProvider(process.env.GOOGLE_API_KEY);
      case "groq":
        return new GroqProvider(process.env.GROQ_API_KEY);
      case "ollama":
        return new OllamaProvider();
      default:
        throw new Error(`Unsupported provider: ${providerId}`);
    }
  }

  static getAvailableProviders(): string[] {
    const providers: string[] = ["ollama"];
    if (process.env.OPENAI_API_KEY) providers.push("openai");
    if (process.env.ANTHROPIC_API_KEY) providers.push("anthropic");
    if (process.env.GOOGLE_API_KEY) providers.push("google");
    if (process.env.GROQ_API_KEY) providers.push("groq");
    return providers;
  }
}
