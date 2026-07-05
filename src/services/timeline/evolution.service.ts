import { EvolutionDataPoint } from "./types";
import { MOCK_EVOLUTION_DATA } from "./mock-data";

export async function getEvolutionData(): Promise<EvolutionDataPoint[]> {
  await new Promise((res) => setTimeout(res, 300));
  return MOCK_EVOLUTION_DATA;
}
