import toolsData from "@data/public-tools.json";
import type { PublicTool } from "./types";

export const publicTools = toolsData as PublicTool[];

/** Unique categories in first-appearance order, for the filter chips. */
export const categories: string[] = publicTools.reduce<string[]>((acc, tool) => {
  if (!acc.includes(tool.category)) acc.push(tool.category);
  return acc;
}, []);

/**
 * Filter the directory by category and a free-text search.
 * Search matches the resource name and its description (whatItIs).
 * `category` of null (or "All") means no category filter.
 */
export function filterTools(category: string | null, search: string): PublicTool[] {
  const q = search.trim().toLowerCase();
  return publicTools.filter((tool) => {
    const matchesCategory = !category || category === "All" || tool.category === category;
    const matchesSearch =
      q.length === 0 ||
      tool.name.toLowerCase().includes(q) ||
      tool.whatItIs.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}
