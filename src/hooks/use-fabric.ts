import { useFabricContext } from "@/providers/fabric-provider";

export function useFabric() {
  const { fabric, isLoading, refreshFabric, generateSnapshot } =
    useFabricContext();

  return {
    nodes: fabric.nodes,
    edges: fabric.edges,
    clusters: fabric.clusters,
    snapshots: fabric.snapshots,
    statistics: fabric.statistics,
    isLoading,
    refreshFabric,
    generateSnapshot,
  };
}
