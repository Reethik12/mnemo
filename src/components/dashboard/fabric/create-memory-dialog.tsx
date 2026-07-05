"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createMemoryAction } from "@/actions/memory.actions";
import type { MemoryInput } from "@/services/memory.service";

interface CreateMemoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateMemoryDialog({
  isOpen,
  onClose,
  onSuccess,
}: CreateMemoryDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<MemoryInput>({
    title: "",
    content: "",
    tags: [],
    category: "General",
    source: "Manual Entry",
  });
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const result = await createMemoryAction(payload);
      if (result.success) {
        onSuccess();
        onClose();
        setFormData({
          title: "",
          content: "",
          tags: [],
          category: "General",
          source: "Manual Entry",
        });
        setTagsInput("");
      } else {
        setError(result.error || "Failed to create memory.");
      }
    } catch (_err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Create Memory Dialog">
      <div className="p-6">
        <h2 className="text-text-primary mb-4 text-xl font-semibold">
          Add to Memory Fabric
        </h2>
        {error && (
          <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            placeholder="E.g., Meeting notes with Alex"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            disabled={loading}
          />
          <div>
            <label className="text-text-secondary mb-1 block text-sm font-medium">
              Content
            </label>
            <textarea
              className="border-border text-text-primary focus:border-accent-purple/50 focus:ring-accent-purple/20 w-full rounded-lg border bg-black/20 p-3 text-sm focus:ring-2 focus:outline-none disabled:opacity-50"
              rows={4}
              placeholder="What do you want to remember?"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>
          <Input
            label="Tags (comma separated)"
            placeholder="E.g., meeting, project-x, alex"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            disabled={loading}
          />
          <Input
            label="Category"
            placeholder="General"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            disabled={loading}
          />
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={loading}>
              Remember
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
