import type { MemorySpace, AccessRequest, SpaceMember } from "./types";

export const MOCK_SPACES: MemorySpace[] = [
  {
    id: "space-personal",
    name: "Personal Knowledge",
    description: "My private thoughts, notes, and general learnings.",
    visibility: "private",
    ownerId: "user-1",
    memberCount: 1,
    memoryCount: 142,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    isArchived: false,
  },
  {
    id: "space-work",
    name: "Project Mnemo",
    description:
      "Engineering notes, system architecture, and product roadmaps.",
    visibility: "workspace",
    ownerId: "user-1",
    memberCount: 4,
    memoryCount: 318,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    isArchived: false,
  },
  {
    id: "space-ai-research",
    name: "AI & ML Research",
    description: "Papers, algorithms, and models I've studied.",
    visibility: "shared",
    ownerId: "user-1",
    memberCount: 12,
    memoryCount: 89,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    isArchived: false,
  },
];

export let MOCK_ACCESS_REQUESTS: AccessRequest[] = [
  {
    id: "req-1",
    spaceId: "space-ai-research",
    spaceName: "AI & ML Research",
    userId: "user-8",
    userName: "Elena Rodriguez",
    userEmail: "elena@stanford.edu",
    reason: "I'm doing a thesis on memory networks and found your public link.",
    status: "pending",
    requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "req-2",
    spaceId: "space-work",
    spaceName: "Project Mnemo",
    userId: "user-9",
    userName: "David Chen",
    userEmail: "david@mnemo.ai",
    reason: "New frontend engineer joining the team.",
    status: "pending",
    requestedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const MOCK_MEMBERS: Record<string, SpaceMember[]> = {
  "space-work": [
    {
      id: "mem-1",
      userId: "user-1",
      userName: "Alex Chen",
      userEmail: "alex@mnemo.ai",
      role: "owner",
      joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "mem-2",
      userId: "user-2",
      userName: "Sarah Jenkins",
      userEmail: "sarah@mnemo.ai",
      role: "admin",
      joinedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "mem-3",
      userId: "user-3",
      userName: "Michael O'Connor",
      userEmail: "michael@mnemo.ai",
      role: "editor",
      joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

export function removeAccessRequest(id: string) {
  MOCK_ACCESS_REQUESTS = MOCK_ACCESS_REQUESTS.filter((r) => r.id !== id);
}

export function addAccessRequest(req: AccessRequest) {
  MOCK_ACCESS_REQUESTS = [req, ...MOCK_ACCESS_REQUESTS];
}

export function addSpaceMember(spaceId: string, member: SpaceMember) {
  if (!MOCK_MEMBERS[spaceId]) {
    MOCK_MEMBERS[spaceId] = [];
  }
  MOCK_MEMBERS[spaceId].push(member);
}

export function removeSpaceMember(spaceId: string, userId: string) {
  if (MOCK_MEMBERS[spaceId]) {
    MOCK_MEMBERS[spaceId] = MOCK_MEMBERS[spaceId].filter(
      (m) => m.userId !== userId,
    );
  }
}

export function changeSpaceMemberRole(
  spaceId: string,
  userId: string,
  role: string,
) {
  if (MOCK_MEMBERS[spaceId]) {
    const member = MOCK_MEMBERS[spaceId].find((m) => m.userId === userId);
    if (member) member.role = role as SpaceMember["role"];
  }
}
