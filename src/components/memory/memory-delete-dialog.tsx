"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface MemoryDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function MemoryDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Memory",
  description = "Are you sure you want to delete this memory? This action cannot be undone.",
}: MemoryDeleteDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={title}
      className="max-w-sm"
    >
      <div className="space-y-6">
        <h3 className="text-text-primary text-xl font-bold">{title}</h3>
        <p className="text-text-secondary text-sm">{description}</p>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            // In a real app, variant destructive would be used here
            className="bg-red-500/20 text-red-500 shadow-none hover:bg-red-500/30"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
