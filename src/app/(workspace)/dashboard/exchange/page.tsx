"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MODULE_CARDS } from "@/lib/constants";
import { useExchange } from "@/hooks/useExchange";
import { SearchBar } from "@/components/dashboard/exchange/SearchBar";
import { CollectionCard } from "@/components/dashboard/exchange/CollectionCard";
import type { MemoryCollection } from "@/services/exchange/types";

function ExchangeContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const moduleData = MODULE_CARDS.find((m) => m.id === "memory-exchange")!;
  const { data, isLoading } = useExchange();
  const [searchResults, setSearchResults] = useState<MemoryCollection[] | null>(
    null,
  );

  useEffect(() => {
    async function performSearch() {
      if (!query) {
        setSearchResults(null);
        return;
      }
      try {
        const res = await fetch(
          `/api/exchange/search?q=${encodeURIComponent(query)}`,
        );
        if (res.ok) {
          const json = await res.json();
          setSearchResults(json);
        }
      } catch {
        // handle error silently for now
      }
    }
    performSearch();
  }, [query]);

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl space-y-12 pb-12"
    >
      <motion.div
        variants={fadeInUp}
        className="flex flex-col items-center justify-center space-y-6 py-12 text-center"
      >
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${moduleData.gradient} text-white shadow-lg`}
        >
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-text-primary mb-4 text-4xl font-bold tracking-tight">
            Memory Exchange
          </h1>
          <p className="text-text-secondary max-w-2xl text-lg">
            Discover, import, and fork Living Memory Collections. Combine
            community knowledge with your personal Memory Fabric.
          </p>
        </div>
        <div className="mt-4 w-full">
          <SearchBar />
        </div>
      </motion.div>

      {query && searchResults !== null ? (
        <motion.div variants={fadeInUp} className="space-y-6">
          <h2 className="text-text-primary text-2xl font-semibold">
            Search Results for &quot;{query}&quot;
          </h2>
          {searchResults.length === 0 ? (
            <div className="glass glow-border text-text-secondary rounded-2xl p-12 text-center">
              No collections found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((c) => (
                <CollectionCard key={c.id} collection={c} />
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        <>
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-text-primary flex items-center gap-2 text-2xl font-semibold">
              Trending Packs
              <span className="relative flex h-3 w-3">
                <span className="bg-accent-blue absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-accent-blue relative inline-flex h-3 w-3 rounded-full"></span>
              </span>
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="glass h-[200px] animate-pulse rounded-2xl bg-white/5"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data?.trending.map((c) => (
                  <CollectionCard key={c.id} collection={c} />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-text-primary text-2xl font-semibold">
              Featured Collections
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="glass h-[200px] animate-pulse rounded-2xl bg-white/5"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data?.featured.map((c) => (
                  <CollectionCard key={c.id} collection={c} />
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default function ExchangePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="border-t-accent-blue h-8 w-8 animate-spin rounded-full border-4 border-white/20" />
        </div>
      }
    >
      <ExchangeContent />
    </Suspense>
  );
}
