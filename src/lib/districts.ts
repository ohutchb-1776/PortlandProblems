import districtsData from "@data/districts.json";

export interface DistrictResult {
  councilDistrict: string;
  councilor: string;
  atLarge: string;
  schoolBoardRep: string;
  stateSenator: string;
  stateRep: string;
  pollingPlace: string;
  trashDay: string;
  recyclingNote: string;
}

interface DistrictEntry {
  match: string[];
  result: DistrictResult;
}

interface DistrictsData {
  default: DistrictResult;
  districts: DistrictEntry[];
}

const data = districtsData as DistrictsData;

export interface Lookup {
  result: DistrictResult;
  /** false when we fell back to the default (no keyword matched) */
  matched: boolean;
}

/**
 * Stub lookup: crude keyword match on the typed address.
 * Always returns a sample result so any typed address renders something.
 * Replace with a real geocode + ArcGIS district query later.
 */
export function lookupDistrict(address: string): Lookup {
  const q = address.toLowerCase();
  for (const entry of data.districts) {
    if (entry.match.some((m) => q.includes(m))) {
      return { result: entry.result, matched: true };
    }
  }
  return { result: data.default, matched: false };
}
