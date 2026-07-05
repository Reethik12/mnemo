"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemory } from "@/hooks/use-memory";
import { usePublish } from "@/hooks/usePublish";

export function PublishDialog({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const { memories, isLoading: loadingMemories } = useMemory();
  const { publishCollection, isPublishing } = usePublish();

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technology");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState<
    "public" | "private" | "organization"
  >("public");
  const [license, setLicense] = useState("MIT");

  // Selection State
  const [selectedMemories, setSelectedMemories] = useState<Set<string>>(
    new Set(),
  );

  // Permissions State
  const [owner] = useState("Current User");
  const [editors, setEditors] = useState("");

  const toggleMemory = (id: string) => {
    setSelectedMemories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePublish = async () => {
    if (!title.trim() || selectedMemories.size === 0) return;

    // Map selected memories to the correct format for the API
    const selectedData = Array.from(selectedMemories).map((id) => {
      const mem = memories.find((m) => m.id === id);
      return { id, text: mem?.content || "No content" };
    });

    const success = await publishCollection({
      title,
      description,
      category,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      visibility,
      license,
      memories: selectedData,
    });

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass glow-border flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#0a0a0a]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-6">
          <div>
            <h2 className="text-text-primary text-xl font-bold">
              Publish Memory Collection
            </h2>
            <p className="text-text-secondary text-sm">
              Share your compiled knowledge graph with the community.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-white/10"
          >
            <svg
              className="text-text-secondary h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="min-h-[500px] flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-text-primary text-lg font-semibold">
                  Step 1: Collection Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-text-secondary mb-1 block text-sm font-medium">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="focus:border-accent-blue/50 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:outline-none"
                      placeholder="e.g., Advanced React Patterns"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary mb-1 block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="focus:border-accent-blue/50 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:outline-none"
                      placeholder="What is this collection about?"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-text-secondary mb-1 block text-sm font-medium">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="focus:border-accent-blue/50 w-full rounded-xl border border-white/10 bg-[#12141a] p-3 text-sm text-white focus:outline-none"
                      >
                        <option>Technology</option>
                        <option>Science</option>
                        <option>Education</option>
                        <option>Career</option>
                        <option>Music</option>
                        <option>Healthcare</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-text-secondary mb-1 block text-sm font-medium">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="focus:border-accent-blue/50 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:outline-none"
                        placeholder="react, typescript, ui"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-text-secondary mb-1 block text-sm font-medium">
                        Visibility
                      </label>
                      <select
                        value={visibility}
                        onChange={(e) =>
                          setVisibility(
                            e.target.value as
                              "public" | "private" | "organization",
                          )
                        }
                        className="focus:border-accent-blue/50 w-full rounded-xl border border-white/10 bg-[#12141a] p-3 text-sm text-white focus:outline-none"
                      >
                        <option value="public">Public</option>
                        <option value="organization">Organization Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-text-secondary mb-1 block text-sm font-medium">
                        License
                      </label>
                      <select
                        value={license}
                        onChange={(e) => setLicense(e.target.value)}
                        className="focus:border-accent-blue/50 w-full rounded-xl border border-white/10 bg-[#12141a] p-3 text-sm text-white focus:outline-none"
                      >
                        <option>MIT</option>
                        <option>Apache 2.0</option>
                        <option>CC-BY-4.0</option>
                        <option>Proprietary</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex h-full flex-col space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-text-primary text-lg font-semibold">
                    Step 2: Select Memories
                  </h3>
                  <div className="text-text-secondary rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                    {selectedMemories.size} selected
                  </div>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-4 overflow-y-auto pr-2 pb-4">
                  {loadingMemories ? (
                    <div className="col-span-2 flex justify-center py-12">
                      <div className="border-t-accent-blue h-8 w-8 animate-spin rounded-full border-4 border-white/20" />
                    </div>
                  ) : memories.length === 0 ? (
                    <div className="text-text-secondary col-span-2 py-12 text-center">
                      No memories found in your fabric.
                    </div>
                  ) : (
                    memories.map((mem) => {
                      const isSelected = selectedMemories.has(mem.id);
                      return (
                        <div
                          key={mem.id}
                          onClick={() => toggleMemory(mem.id)}
                          className={`cursor-pointer rounded-xl border p-4 transition-all ${isSelected ? "border-accent-blue bg-accent-blue/10" : "border-white/10 bg-white/5 hover:border-white/30"}`}
                        >
                          <h4 className="truncate font-medium text-white">
                            {mem.title}
                          </h4>
                          <p className="text-text-secondary mt-1 line-clamp-2 text-xs">
                            {mem.content}
                          </p>
                          <div className="mt-3 flex gap-2">
                            {mem.tags?.slice(0, 2).map((t: string) => (
                              <span
                                key={t}
                                className="text-text-secondary rounded bg-white/10 px-2 py-0.5 text-[10px]"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-text-primary text-lg font-semibold">
                  Step 3: Permissions
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-text-secondary mb-1 block text-sm font-medium">
                      Owner
                    </label>
                    <input
                      type="text"
                      value={owner}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/50"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary mb-1 block text-sm font-medium">
                      Editors (comma separated emails)
                    </label>
                    <input
                      type="text"
                      value={editors}
                      onChange={(e) => setEditors(e.target.value)}
                      className="focus:border-accent-blue/50 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:outline-none"
                      placeholder="colleague@example.com"
                    />
                  </div>
                  <div className="border-accent-blue/20 bg-accent-blue/5 text-text-primary rounded-xl border p-4 text-sm">
                    <h4 className="text-accent-blue mb-1 flex items-center gap-2 font-medium">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Access Level: {visibility}
                    </h4>
                    <p className="text-text-secondary mt-1">
                      {visibility === "public" &&
                        "This collection will be indexed on the community exchange and available for anyone to fork or chat with."}
                      {visibility === "organization" &&
                        "This collection will only be visible to members of your current organization."}
                      {visibility === "private" &&
                        "This collection will remain private to you and any explicitly added editors."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-text-primary text-lg font-semibold">
                  Step 4: Review & Publish
                </h3>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-6 flex items-start justify-between border-b border-white/10 pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {title || "Untitled Collection"}
                      </h4>
                      <p className="text-text-secondary mt-1 text-sm">
                        {description || "No description provided."}
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                      {category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="text-text-secondary mb-1">Visibility</p>
                      <p className="font-medium text-white capitalize">
                        {visibility}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary mb-1">License</p>
                      <p className="font-medium text-white">{license}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary mb-1">
                        Memories Selected
                      </p>
                      <p className="text-accent-blue text-xl font-medium">
                        {selectedMemories.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary mb-1">Estimated Size</p>
                      <p className="font-medium text-white">
                        ~{(selectedMemories.size * 2.4).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-500/80">
                  <svg
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p>
                    Publishing will isolate these memories into a new dataset in
                    Cognee and perform the <code>improve()</code> process to
                    generate graph intelligence.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-white/5 p-6">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 w-12 rounded-full transition-colors ${step >= i ? "bg-accent-blue" : "bg-white/10"}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {step > 1 && (
              <button
                disabled={isPublishing}
                onClick={() => setStep((s) => s - 1)}
                className="rounded-xl bg-white/5 px-6 py-2.5 font-medium text-white transition-colors hover:bg-white/10"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 1 && !title.trim()}
                className="bg-accent-blue hover:bg-accent-blue/80 rounded-xl px-6 py-2.5 font-medium text-white transition-colors disabled:opacity-50"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={isPublishing || selectedMemories.size === 0}
                className="bg-accent-blue hover:bg-accent-blue/80 flex items-center gap-2 rounded-xl px-6 py-2.5 font-medium text-white transition-colors disabled:opacity-50"
              >
                {isPublishing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
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
                    Publish Collection
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
