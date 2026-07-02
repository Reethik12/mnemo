import { useFabricContext } from "@/providers/fabric-provider";

export function useFabricStatistics() {
  const { fabric, isLoading } = useFabricContext();

  return {
    statistics: fabric.statistics,
    isLoading,
  };
}
