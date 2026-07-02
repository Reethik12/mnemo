import { memo } from "react";
import { usePromptTemplate } from "@/hooks/use-prompt-template";
import { usePrompt } from "@/hooks/use-prompt";

export const PromptActions = memo(function PromptActions() {
  const { activeTemplate, saveTemplate, duplicateTemplate, deleteTemplate } =
    usePromptTemplate();
  const { rawContent, setRawContent } = usePrompt();

  return (
    <div className="flex items-center gap-3">
      {activeTemplate ? (
        <>
          <button
            onClick={() =>
              saveTemplate({
                id: activeTemplate.id,
                title: activeTemplate.title,
                content: rawContent,
              })
            }
            className="bg-primary hover:bg-primary-hover rounded px-4 py-2 text-xs font-medium text-white transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={() => duplicateTemplate(activeTemplate.id)}
            className="bg-bg-secondary border-border-subtle text-text-primary hover:bg-bg-tertiary rounded border px-4 py-2 text-xs font-medium transition-colors"
          >
            Duplicate
          </button>
          <button
            onClick={() => deleteTemplate(activeTemplate.id)}
            className="bg-bg-secondary border-border-subtle text-error hover:bg-error/10 ml-auto rounded border px-4 py-2 text-xs font-medium transition-colors"
          >
            Delete
          </button>
        </>
      ) : (
        <button
          onClick={() =>
            saveTemplate({ title: "New Template", content: rawContent })
          }
          className="bg-primary hover:bg-primary-hover rounded px-4 py-2 text-xs font-medium text-white transition-colors"
        >
          Save as New Template
        </button>
      )}
      <button
        onClick={() => setRawContent("")}
        className="bg-bg-secondary border-border-subtle text-text-primary hover:bg-bg-tertiary rounded border px-4 py-2 text-xs font-medium transition-colors"
      >
        Clear
      </button>
    </div>
  );
});
