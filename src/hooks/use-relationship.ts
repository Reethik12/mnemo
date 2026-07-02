import { useMemo } from "react";
import { useRelationshipContext } from "@/providers/relationship-provider";

export function useRelationship(id: string | undefined) {
  const { relationships } = useRelationshipContext();

  const relationship = useMemo(() => {
    if (!id) return null;
    return relationships.find((r) => r.id === id) || null;
  }, [relationships, id]);

  return { relationship };
}
