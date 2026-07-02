"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Memory } from "@/types";
import { memoryService } from "@/services";
import { useToast } from "@/hooks/use-toast";

interface MemoryContextType {
  memories: Memory[];
  selectedMemory: Memory | null;
  isLoading: boolean;
  error: Error | null;
  setSelectedMemory: (memory: Memory | null) => void;
  createMemory: (
    memory: Omit<Memory, "id" | "createdAt" | "updatedAt">,
  ) => Promise<Memory>;
  updateMemory: (id: string, updates: Partial<Memory>) => Promise<Memory>;
  deleteMemory: (id: string) => Promise<void>;
  duplicateMemory: (id: string) => Promise<Memory>;
  toggleFavorite: (id: string, currentState: boolean) => Promise<Memory>;
  togglePin: (id: string, currentState: boolean) => Promise<Memory>;
  archiveMemory: (id: string) => Promise<Memory>;
  restoreMemory: (id: string) => Promise<Memory>;
  refreshMemories: () => Promise<void>;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export function MemoryProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { success, error: toastError } = useToast();

  const refreshMemories = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await memoryService.getMemories();
      setMemories(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch memories"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshMemories();
  }, [refreshMemories]);

  const createMemory = useCallback(
    async (memory: Omit<Memory, "id" | "createdAt" | "updatedAt">) => {
      try {
        const newMem = await memoryService.createMemory(memory);
        setMemories((prev) => [newMem, ...prev]);
        success("Memory created");
        return newMem;
      } catch (err) {
        toastError("Failed to create memory");
        throw err;
      }
    },
    [success, toastError],
  );

  const updateMemory = useCallback(
    async (id: string, updates: Partial<Memory>) => {
      try {
        const updated = await memoryService.updateMemory(id, updates);
        setMemories((prev) => prev.map((m) => (m.id === id ? updated : m)));
        if (selectedMemory?.id === id) {
          setSelectedMemory(updated);
        }
        return updated;
      } catch (err) {
        toastError("Failed to update memory");
        throw err;
      }
    },
    [selectedMemory, toastError],
  );

  const deleteMemory = useCallback(
    async (id: string) => {
      try {
        await memoryService.deleteMemory(id);
        setMemories((prev) => prev.filter((m) => m.id !== id));
        if (selectedMemory?.id === id) {
          setSelectedMemory(null);
        }
        success("Memory deleted");
      } catch (err) {
        toastError("Failed to delete memory");
        throw err;
      }
    },
    [selectedMemory, success, toastError],
  );

  const duplicateMemory = useCallback(
    async (id: string) => {
      try {
        const duplicated = await memoryService.duplicateMemory(id);
        setMemories((prev) => [duplicated, ...prev]);
        success("Memory duplicated");
        return duplicated;
      } catch (err) {
        toastError("Failed to duplicate memory");
        throw err;
      }
    },
    [success, toastError],
  );

  const toggleFavorite = useCallback(
    async (id: string, currentState: boolean) => {
      try {
        const updated = await memoryService.favoriteMemory(id, !currentState);
        setMemories((prev) => prev.map((m) => (m.id === id ? updated : m)));
        if (selectedMemory?.id === id) setSelectedMemory(updated);
        success(currentState ? "Removed from favorites" : "Added to favorites");
        return updated;
      } catch (err) {
        toastError("Failed to update favorite status");
        throw err;
      }
    },
    [selectedMemory, success, toastError],
  );

  const togglePin = useCallback(
    async (id: string, currentState: boolean) => {
      try {
        const updated = await memoryService.pinMemory(id, !currentState);
        setMemories((prev) => prev.map((m) => (m.id === id ? updated : m)));
        if (selectedMemory?.id === id) setSelectedMemory(updated);
        success(currentState ? "Memory unpinned" : "Memory pinned");
        return updated;
      } catch (err) {
        toastError("Failed to update pin status");
        throw err;
      }
    },
    [selectedMemory, success, toastError],
  );

  const archiveMemory = useCallback(
    async (id: string) => {
      try {
        const updated = await memoryService.archiveMemory(id);
        setMemories((prev) => prev.map((m) => (m.id === id ? updated : m)));
        if (selectedMemory?.id === id) setSelectedMemory(null); // Unselect if archived
        success("Memory archived");
        return updated;
      } catch (err) {
        toastError("Failed to archive memory");
        throw err;
      }
    },
    [selectedMemory, success, toastError],
  );

  const restoreMemory = useCallback(
    async (id: string) => {
      try {
        const updated = await memoryService.restoreMemory(id);
        setMemories((prev) => prev.map((m) => (m.id === id ? updated : m)));
        if (selectedMemory?.id === id) setSelectedMemory(updated);
        success("Memory restored");
        return updated;
      } catch (err) {
        toastError("Failed to restore memory");
        throw err;
      }
    },
    [selectedMemory, success, toastError],
  );

  return (
    <MemoryContext.Provider
      value={{
        memories,
        selectedMemory,
        isLoading,
        error,
        setSelectedMemory,
        createMemory,
        updateMemory,
        deleteMemory,
        duplicateMemory,
        toggleFavorite,
        togglePin,
        archiveMemory,
        restoreMemory,
        refreshMemories,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemoryContext() {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error("useMemoryContext must be used within a MemoryProvider");
  }
  return context;
}
