import { useRelationshipFilter } from "@/hooks/use-relationship-filter";
import {
  RelationshipCategory,
  RelationshipStrength,
  RelationshipDirection,
} from "@/types/relationship";
import { GlassContainer } from "@/components/shared/glass-container";
import { memo } from "react";

const CATEGORIES: RelationshipCategory[] = [
  "parent",
  "child",
  "reference",
  "similar",
  "related",
  "dependency",
];
const STRENGTHS: RelationshipStrength[] = ["strong", "medium", "weak"];
const DIRECTIONS: RelationshipDirection[] = ["bidirectional", "unidirectional"];

export const RelationshipFilterComponent = memo(
  function RelationshipFilterComponent() {
    const { filters, setFilters } = useRelationshipFilter();

    const toggleCategory = (cat: RelationshipCategory) => {
      const current = filters.categories || [];
      const newCategories = current.includes(cat)
        ? current.filter((c) => c !== cat)
        : [...current, cat];
      setFilters({ ...filters, categories: newCategories });
    };

    const toggleStrength = (str: RelationshipStrength) => {
      const current = filters.strengths || [];
      const newStrengths = current.includes(str)
        ? current.filter((s) => s !== str)
        : [...current, str];
      setFilters({ ...filters, strengths: newStrengths });
    };

    const toggleDirection = (dir: RelationshipDirection) => {
      const current = filters.directions || [];
      const newDirections = current.includes(dir)
        ? current.filter((d) => d !== dir)
        : [...current, dir];
      setFilters({ ...filters, directions: newDirections });
    };

    return (
      <GlassContainer className="animate-in fade-in flex flex-col gap-4 p-4 duration-300">
        <h3 className="text-sm font-semibold">Filters</h3>

        <div className="flex flex-col gap-2">
          <span className="text-text-secondary text-xs">Category</span>
          <div className="flex flex-wrap gap-1">
            {CATEGORIES.map((cat) => {
              const isActive = filters.categories?.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`rounded px-2 py-1 text-xs capitalize transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-text-secondary text-xs">Strength</span>
          <div className="flex flex-wrap gap-1">
            {STRENGTHS.map((str) => {
              const isActive = filters.strengths?.includes(str);
              return (
                <button
                  key={str}
                  onClick={() => toggleStrength(str)}
                  className={`rounded px-2 py-1 text-xs capitalize transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary"
                  }`}
                >
                  {str}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-text-secondary text-xs">Direction</span>
          <div className="flex flex-wrap gap-1">
            {DIRECTIONS.map((dir) => {
              const isActive = filters.directions?.includes(dir);
              return (
                <button
                  key={dir}
                  onClick={() => toggleDirection(dir)}
                  className={`rounded px-2 py-1 text-xs capitalize transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary"
                  }`}
                >
                  {dir}
                </button>
              );
            })}
          </div>
        </div>
      </GlassContainer>
    );
  },
);
