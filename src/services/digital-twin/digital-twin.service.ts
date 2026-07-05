import {
  MOCK_TWIN_STATS,
  MOCK_SECURITY_METRICS,
  MOCK_AUDIT_LOGS,
} from "./mock-data";
import type {
  TwinStats,
  SecurityMetrics,
  AuditLogEntry,
  TwinChatResponse,
} from "./types";

export class DigitalTwinService {
  async getStats(): Promise<TwinStats> {
    return MOCK_TWIN_STATS;
  }

  async getSecurityMetrics(): Promise<SecurityMetrics> {
    return MOCK_SECURITY_METRICS;
  }

  async getAuditLogs(): Promise<AuditLogEntry[]> {
    return MOCK_AUDIT_LOGS;
  }

  async chat(
    message: string,
    isTeam: boolean = false,
  ): Promise<TwinChatResponse> {
    // Simulate AI delay
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 500),
    );

    let reply = "";
    if (message.toLowerCase().includes("research")) {
      reply = isTeam
        ? "Alex has been heavily focused on memory augmentation with LLMs. He recently read 3 papers on semantic networks and implemented a Graph RAG system."
        : "You've been heavily focused on memory augmentation with LLMs. Recently, you read 3 papers on semantic networks and successfully implemented a Graph RAG system.";
    } else if (message.toLowerCase().includes("do")) {
      reply = isTeam
        ? "Based on his past decisions, Alex would likely choose a robust, typed architecture over a quick prototype, prioritizing maintainability and scalability."
        : "Based on your past decisions, you would likely choose a robust, typed architecture over a quick prototype, prioritizing maintainability and scalability.";
    } else if (message.toLowerCase().includes("skill")) {
      reply = isTeam
        ? "Alex's strongest domains are AI & Machine Learning (95%), Frontend Engineering (92%), and System Architecture (88%)."
        : "Your strongest domains are AI & Machine Learning (95%), Frontend Engineering (92%), and System Architecture (88%).";
    } else {
      reply = isTeam
        ? "I can answer questions about Alex's knowledge based on his shared Memory Spaces. Could you be more specific?"
        : "I can answer questions based on your stored memory graph. Could you be more specific?";
    }

    return {
      message: reply,
      sources: ["Memory #8492", "Project Mnemo Architecture"],
    };
  }
}

export const digitalTwinService = new DigitalTwinService();
