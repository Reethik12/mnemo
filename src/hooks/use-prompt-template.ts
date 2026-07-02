import { usePromptContext } from "@/providers/prompt-provider";

export function usePromptTemplate() {
  const {
    templates,
    categories,
    activeTemplateId,
    setActiveTemplate,
    saveTemplate,
    duplicateTemplate,
    deleteTemplate,
  } = usePromptContext();

  const activeTemplate = templates.find((t) => t.id === activeTemplateId);

  return {
    templates,
    categories,
    activeTemplate,
    activeTemplateId,
    setActiveTemplate,
    saveTemplate,
    duplicateTemplate,
    deleteTemplate,
  };
}
