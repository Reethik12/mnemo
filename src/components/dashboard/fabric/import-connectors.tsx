"use client";

import { useState } from "react";
import { importMockAction } from "@/actions/memory.actions";
import { cn } from "@/lib/cn";

const CONNECTORS = [
  { id: "pdf", label: "PDF", icon: "document" },
  { id: "github", label: "GitHub", icon: "code" },
  { id: "notes", label: "Notes", icon: "document-text" },
  { id: "website", label: "Website", icon: "globe" },
  { id: "email", label: "Email", icon: "mail" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "voice", label: "Voice Notes", icon: "microphone" },
  { id: "youtube", label: "YouTube", icon: "video-camera" },
];

export function ImportConnectors({ onSuccess }: { onSuccess: () => void }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleImport = async (id: string, label: string) => {
    console.log(`[UI] Button clicked for ${label}`);
    setLoadingId(id);
    try {
      // Provide mock content for the hackathon demonstration
      const mockContent = `This is simulated extracted content from a ${label} connection. It contains important insights and metadata.`;
      console.log(`[UI] Calling importMockAction for ${label}`);
      const res = await importMockAction(label, mockContent);
      console.log(`[UI] importMockAction returned:`, res);
      if (res.success) {
        onSuccess();
      } else {
        alert(`Failed to import from ${label}: ${res.error}`);
      }
    } catch (_err) {
      console.error(`[UI] Exception in handleImport:`, _err);
      alert("An error occurred during import.");
    } finally {
      console.log(`[UI] Finished handleImport for ${label}`);
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-text-primary text-sm font-semibold">
        Import Connectors (Mock)
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {CONNECTORS.map((connector) => (
          <button
            key={connector.id}
            onClick={() => handleImport(connector.id, connector.label)}
            disabled={loadingId !== null}
            className={cn(
              "glass glow-border group relative flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all hover:bg-white/5",
              loadingId === connector.id && "opacity-50",
              loadingId !== null && loadingId !== connector.id && "opacity-50",
            )}
          >
            {loadingId === connector.id ? (
              <svg
                className="text-accent-purple h-6 w-6 animate-spin"
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
            ) : (
              <div className="bg-surface/50 text-text-secondary flex h-10 w-10 items-center justify-center rounded-lg transition-colors group-hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            )}
            <span className="text-text-secondary group-hover:text-text-primary text-xs font-medium">
              {connector.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
