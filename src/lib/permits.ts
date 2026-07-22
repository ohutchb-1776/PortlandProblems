import permitsData from "@data/permits.json";

/** How likely a permit is required, used for the result badge. */
export type PermitLevel = "yes" | "maybe";

export interface PermitProject {
  id: string;
  label: string;
  emoji: string;
  level: PermitLevel;
  /** Headline verdict shown at the top of the result card */
  verdict: string;
  /** One-line plain-language explanation */
  summary: string;
  /** Fuller, in-depth explanation of what's necessary */
  details: string;
  /** Plain-language steps / what to prepare */
  checklist: string[];
  /** Rough timeline estimate */
  timeline: string;
  /** Optional caveat specific to this project type */
  note?: string;
}

interface PermitsData {
  portalUrl: string;
  portalLabel: string;
  projects: PermitProject[];
}

const data = permitsData as PermitsData;

export const permitProjects: PermitProject[] = data.projects;
export const PORTAL_URL = data.portalUrl;
export const PORTAL_LABEL = data.portalLabel;
