"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/dashboard/exchange?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/dashboard/exchange`);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSearch}
      className="relative mx-auto flex w-full max-w-2xl items-center"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          className="text-text-secondary h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-text-primary placeholder-text-secondary focus:border-accent-blue/50 focus:ring-accent-blue/50 w-full rounded-2xl border border-white/10 bg-white/5 py-3 pr-4 pl-12 text-sm transition-colors focus:bg-white/10 focus:ring-1 focus:outline-none"
        placeholder="Search for Memory Collections, topics, or authors..."
      />
      <button
        type="submit"
        className="bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 absolute right-2 rounded-xl px-4 py-1.5 text-xs font-medium transition-colors"
      >
        Search
      </button>
    </motion.form>
  );
}
