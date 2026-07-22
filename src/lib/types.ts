/**
 * A single civic service entry, maintained by hand in data/services.json.
 * Flat by design so the JSON stays easy to edit.
 */
export interface Service {
  id: string;
  /** Plain-language terms a resident might type, used by the intent matcher */
  keywords: string[];
  /** Short heading shown on the result card */
  title: string;
  /** Plain-language explanation of the issue and who handles it */
  explanation: string;
  /** The responsible city department */
  department: string;
  /** Label for the primary call-to-action button */
  actionLabel: string;
  /** URL the call-to-action links to (a real, existing city service) */
  actionUrl: string;
}

/**
 * An underused public resource shown in the /tools directory.
 * Maintained by hand in data/public-tools.json.
 */
export interface PublicTool {
  name: string;
  /** Grouping used for the filter chips */
  category: string;
  /** Plain-language description (also searched) */
  whatItIs: string;
  whoItsFor: string;
  cost: string;
  /** Plain-language instructions for the "How to access" step */
  howToAccess: string;
  /** Real, existing link for accessing the resource */
  url: string;
  location: string;
}
