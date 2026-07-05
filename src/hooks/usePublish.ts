import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { PublishInput } from "@/services/exchange/publish.service";

export function usePublish() {
  const [isPublishing, setIsPublishing] = useState(false);
  const { success, error } = useToast();

  const publishCollection = async (input: PublishInput) => {
    setIsPublishing(true);
    try {
      const res = await fetch("/api/exchange/publish", {
        method: "POST",
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        success(data.message);
        return true;
      } else {
        error(data.error || "Failed to publish collection.");
        return false;
      }
    } catch {
      error("Network error while publishing.");
      return false;
    } finally {
      setIsPublishing(false);
    }
  };

  return { publishCollection, isPublishing };
}
