"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MODULE_CARDS } from "@/lib/constants";
import { searchMemoriesAction } from "@/actions/memory.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateMemoryDialog } from "@/components/dashboard/fabric/create-memory-dialog";
import { ImportConnectors } from "@/components/dashboard/fabric/import-connectors";
import { MemoryDetailCard } from "@/components/dashboard/fabric/memory-detail-card";
import type { MemorySearchResult } from "@/services/memory.service";

export default function FabricPage() {
  const moduleData = MODULE_CARDS.find((m) => m.id === "memory-fabric")!;
  const [searchQuery, setSearchQuery] = useState("");
  const [memories, setMemories] = useState<MemorySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchMemories = useCallback(async (query: string = "") => {
    try {
      const result = await searchMemoriesAction(query);
      if (result.success && result.data) {
        setMemories(result.data);
      } else {
        console.error(result.error);
        setMemories([]);
      }
    } catch (err) {
      console.error(err);
      setMemories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadInit = async () => {
      try {
        const result = await searchMemoriesAction("");
        if (!mounted) return;
        if (result.success && result.data) {
          setMemories(result.data);
        } else {
          setMemories([]);
        }
      } catch {
        if (!mounted) return;
        setMemories([]);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    loadInit();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    fetchMemories(searchQuery);
  };

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl space-y-10"
    >
      <motion.div variants={fadeInUp}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${moduleData.gradient} text-white shadow-lg`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-text-primary text-2xl font-bold tracking-tight">
                {moduleData.title}
              </h1>
              <p className="text-text-secondary mt-1">
                {moduleData.description}
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            className="shrink-0"
            onClick={() => setIsDialogOpen(true)}
          >
            + Create Memory
          </Button>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <ImportConnectors
          onSuccess={() => {
            setIsLoading(true);
            fetchMemories();
          }}
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search concepts, thoughts, or events (Semantic Search)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" variant="secondary" isLoading={isLoading}>
            Search
          </Button>
          {searchQuery && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setSearchQuery("");
                setIsLoading(true);
                fetchMemories("");
              }}
            >
              Clear
            </Button>
          )}
        </form>

        <div className="min-h-[300px]">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <svg
                className="text-accent-purple h-8 w-8 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : memories.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {memories.map((memory, i) => (
                <MemoryDetailCard key={memory.id} memory={memory} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5">
              <span className="text-text-secondary text-sm">
                No memories found in Cognee Cloud.
              </span>
              <span className="text-text-tertiary mt-1 text-xs">
                Import data or create a memory to start building your graph.
              </span>
            </div>
          )}
        </div>
      </motion.div>

      <CreateMemoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={() => {
          setIsLoading(true);
          fetchMemories();
        }}
      />
    </motion.div>
  );
}
