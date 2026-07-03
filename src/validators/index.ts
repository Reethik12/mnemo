import { z } from "zod";

export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const UserUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  image: z.string().url().optional(),
});

export const WorkspaceCreateSchema = z.object({
  name: z.string().min(1).max(100),
});

export const WorkspaceUpdateSchema = WorkspaceCreateSchema.partial();

export const MemoryCreateSchema = z.object({
  workspaceId: z.string().uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const MemoryUpdateSchema = MemoryCreateSchema.omit({
  workspaceId: true,
}).partial();

export const ConversationCreateSchema = z.object({
  workspaceId: z.string().uuid(),
  title: z.string().min(1).max(200),
  providerId: z.string().optional(),
  modelId: z.string().optional(),
});

export const ConversationUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  summary: z.string().optional(),
  messages: z.array(z.any()).optional(), // specific message schema can be added later
});

export const PromptCreateSchema = z.object({
  workspaceId: z.string().uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  variables: z.array(z.string()).default([]),
});

export const PromptUpdateSchema = PromptCreateSchema.omit({
  workspaceId: true,
}).partial();

export const ProviderCreateSchema = z.object({
  name: z.string().min(1).max(100),
  apiKey: z.string().optional(),
  baseUrl: z.string().url().optional(),
  capabilities: z.record(z.string(), z.any()).optional(),
});

export const ProviderUpdateSchema = ProviderCreateSchema.partial();
