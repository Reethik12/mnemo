"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useCollection } from "@/hooks/useCollection";
import { CollectionHeader } from "@/components/dashboard/exchange/CollectionHeader";
import { ChatPanel } from "@/components/dashboard/exchange/ChatPanel";
import { ImportDialog } from "@/components/dashboard/exchange/ImportDialog";
import { ShareDialog } from "@/components/dashboard/exchange/ShareDialog";

export default function CollectionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const {
    collection,
    isLoading,
    isImporting,
    importCollection,
    forkCollection,
  } = useCollection(unwrappedParams.id);
  const [showImport, setShowImport] = useState(false);
  const [showShare, setShowShare] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="border-t-accent-blue h-8 w-8 animate-spin rounded-full border-4 border-white/20" />
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="glass glow-border text-text-secondary rounded-2xl p-12 text-center">
        Collection not found.
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl space-y-8 pb-12"
    >
      <CollectionHeader collection={collection} />

      <div className="flex flex-wrap items-center gap-4 border-b border-white/10 pb-6">
        <button
          onClick={() => setShowImport(true)}
          className="bg-accent-blue hover:bg-accent-blue/80 hover:shadow-accent-blue/20 flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Import to Fabric
        </button>

        <button
          onClick={forkCollection}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
          </svg>
          Fork Collection
        </button>

        <button
          onClick={() => setShowShare(true)}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <motion.div
            variants={fadeInUp}
            className="glass glow-border rounded-2xl p-6"
          >
            <h3 className="text-text-primary mb-4 font-semibold">
              Categories & Tags
            </h3>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="bg-accent-blue/20 text-accent-blue border-accent-blue/20 rounded-md border px-2 py-1 text-xs font-medium">
                {collection.category}
              </span>
              {collection.tags.map((t) => (
                <span
                  key={t}
                  className="text-text-secondary rounded-md bg-white/5 px-2 py-1 text-xs"
                >
                  #{t}
                </span>
              ))}
            </div>

            <h3 className="text-text-primary mb-4 font-semibold">
              Version History
            </h3>
            <div className="relative ml-2 space-y-4 border-l border-white/10 pb-2">
              <div className="relative pl-4">
                <div className="bg-accent-blue absolute top-1.5 -left-[5px] h-2 w-2 rounded-full ring-4 ring-[#0f1115]" />
                <p className="text-text-primary text-sm font-medium">
                  v{collection.version}
                </p>
                <p className="text-text-secondary mt-1 text-xs">
                  Latest release. Added new insights.
                </p>
              </div>
              <div className="relative pl-4 opacity-50">
                <div className="absolute top-1.5 -left-[5px] h-2 w-2 rounded-full bg-white/20" />
                <p className="text-sm font-medium text-white">v1.0.0</p>
                <p className="text-text-secondary mt-1 text-xs">
                  Initial publication.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2">
          <ChatPanel
            collectionId={collection.id}
            collectionTitle={collection.title}
          />
        </div>
      </div>

      <AnimatePresence>
        {showImport && (
          <ImportDialog
            collectionTitle={collection.title}
            isImporting={isImporting}
            onCancel={() => setShowImport(false)}
            onConfirm={async () => {
              await importCollection();
              setShowImport(false);
            }}
          />
        )}
        {showShare && (
          <ShareDialog
            collectionId={collection.id}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
