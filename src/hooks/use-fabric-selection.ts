import { useCallback } from "react";
import { useFabricContext } from "@/providers/fabric-provider";
import { MemoryNode } from "@/types/fabric";

export function useFabricSelection() {
  const { selectedNode, setSelectedNode } = useFabricContext();

  const selectNode = useCallback(
    (node: MemoryNode | null) => {
      setSelectedNode(node);
    },
    [setSelectedNode],
  );

  const clearSelection = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return {
    selectedNode,
    selectNode,
    clearSelection,
  };
}
