export interface MemoryCollection {
  id: string;
  title: string;
  description: string;
  author: string;
  organization?: string;
  category: string;
  tags: string[];
  memoryCount: number;
  lastUpdated: string;
  createdAt: string;
  downloads: number;
  views: number;
  forks: number;
  rating: number;
  license: string;
  visibility: "public" | "private" | "organization";
  version: string;
  isTrending?: boolean;
  isFeatured?: boolean;
}

export interface CollectionVersion {
  version: string;
  createdAt: string;
  author: string;
  changes: string;
}

export interface PermissionNode {
  userId: string;
  role: "owner" | "editor" | "viewer";
}
