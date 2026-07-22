import sampleData from "@data/sample-issues.json";

/** Raw shape as returned by the SeeClickFix v2 /issues endpoint (subset we use). */
interface RawIssue {
  id: number;
  status: string;
  summary: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  created_at: string;
  html_url: string;
  request_type?: { id: number; title: string; organization: string };
  media?: { representative_image_url?: string | null };
}

interface IssuesResponse {
  issues: RawIssue[];
}

/** Normalized issue used by the /report UI. */
export interface Issue {
  id: number;
  /** request_type.title — the category shown as the card title */
  type: string;
  status: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  createdAt: string;
  /** html_url — link to the issue on SeeClickFix */
  url: string;
}

/** True because this build reads the local mock, not the live API. */
export const IS_MOCK = true;

export const issues: Issue[] = (sampleData as IssuesResponse).issues.map((r) => ({
  id: r.id,
  type: r.request_type?.title ?? r.summary,
  status: r.status,
  description: r.description,
  address: r.address,
  lat: r.lat,
  lng: r.lng,
  createdAt: r.created_at,
  url: r.html_url,
}));

/** Map center — downtown Portland, Maine. */
export const PORTLAND_CENTER: [number, number] = [43.6591, -70.2568];

/** Deep link to the official SeeClickFix report flow for Portland, ME (portland_2). */
export const REPORT_URL = "https://seeclickfix.com/portland_2";
