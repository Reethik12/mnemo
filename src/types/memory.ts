export type MemoryCategory =
  | "Personal"
  | "Work"
  | "Learning"
  | "Research"
  | "Journal"
  | "Ideas"
  | "Music"
  | "Books"
  | "Travel"
  | "Health"
  | "Uncategorized";

export type MemoryStatus =
  "Draft" | "Completed" | "Archived" | "Pinned" | "Favorite";

export type MemoryFilter =
  "All" | "Favorites" | "Pinned" | "Archived" | "Recent";

export type MemorySort =
  | "Newest"
  | "Oldest"
  | "Alphabetical"
  | "Updated Recently"
  | "Pinned First"
  | "Favorites First";

export interface Memory {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
  category: MemoryCategory;
  tags: string[];
  pinned: boolean;
  favorite: boolean;
  archived: boolean;
  // Metadata for Phase 3.2/3.3
  readingTime?: number; // In minutes
  characterCount?: number;
  wordCount?: number;
  lastOpened?: string; // ISO String
}
