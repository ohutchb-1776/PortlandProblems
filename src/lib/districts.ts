// Live, free address -> districts lookup for Portland, Maine.
//
// 1. Geocode the typed address with OpenStreetMap / Nominatim (free, CORS-enabled).
// 2. Point-in-polygon queries against the City of Portland's public ArcGIS
//    services (gis.portlandmaine.gov) for council district, state house &
//    senate districts, and the trash/recycling collection day.
//
// No API key and no cost. All requests run in the browser.

const GIS = "https://gis.portlandmaine.gov/maps/rest/services";

// Official pages to send people to for the person who currently holds each seat.
export const COUNCIL_URL = "https://www.portlandmaine.gov/723/City-Council";
export const HOUSE_URL =
  "https://legislature.maine.gov/house/house/MemberProfiles/ListDistrict";
export const SENATE_URL =
  "https://legislature.maine.gov/senate-home-page/find-your-state-senator";

export interface RepResult {
  councilDistrict: string;
  houseDistrict: string | null;
  senateDistrict: string | null;
  trashDay: string | null;
  matchedAddress: string;
}

/** Thrown for expected, user-facing problems (no match, outside Portland, offline). */
export class LookupError extends Error {}

/** fetch with a hard timeout so a slow service can never hang the lookup. */
async function fetchTimeout(url: string, ms: number): Promise<Response> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(id);
  }
}

async function pointField(
  layerUrl: string,
  lon: number,
  lat: number,
  field: string,
): Promise<string | null> {
  const url =
    `${layerUrl}/query?geometry=${lon},${lat}` +
    `&geometryType=esriGeometryPoint&inSR=4326` +
    `&spatialRel=esriSpatialRelIntersects&outFields=${field}` +
    `&returnGeometry=false&f=json`;
  try {
    const res = await fetchTimeout(url, 8000);
    const data = await res.json();
    const val = data?.features?.[0]?.attributes?.[field];
    return val == null ? null : String(val).trim();
  } catch {
    return null;
  }
}

export async function lookupReps(address: string): Promise<RepResult> {
  const query = /portland/i.test(address) ? address : `${address}, Portland, ME`;
  const geoUrl =
    `https://nominatim.openstreetmap.org/search?format=json&limit=1` +
    `&countrycodes=us&q=${encodeURIComponent(query)}`;

  let geo: Array<{ lat: string; lon: string; display_name: string }>;
  try {
    geo = await fetchTimeout(geoUrl, 8000).then((r) => r.json());
  } catch {
    throw new LookupError(
      "Couldn't reach the address lookup service. Check your connection and try again.",
    );
  }
  if (!Array.isArray(geo) || geo.length === 0) {
    throw new LookupError(
      'We couldn\'t find that address. Try adding more detail, e.g. "123 Congress St, Portland, ME".',
    );
  }

  const lat = parseFloat(geo[0].lat);
  const lon = parseFloat(geo[0].lon);
  const matchedAddress = geo[0].display_name;

  const [councilDistrict, houseDistrict, senateDistrict, trashDay] =
    await Promise.all([
      pointField(`${GIS}/Political/Council_Districts/FeatureServer/112`, lon, lat, "NAME"),
      pointField(`${GIS}/Political/State_House_Districts/FeatureServer/6`, lon, lat, "DISTRICT"),
      pointField(`${GIS}/Political/State_Senate_Districts/FeatureServer/8`, lon, lat, "DISTRICT"),
      pointField(`${GIS}/City_of_Portland_Trash_and_Recycling/MapServer/1`, lon, lat, "Trash_Route"),
    ]);

  if (!councilDistrict) {
    throw new LookupError(
      `That address (${matchedAddress}) doesn't appear to be inside Portland's city limits, so it isn't in a Portland council district.`,
    );
  }

  return { councilDistrict, houseDistrict, senateDistrict, trashDay, matchedAddress };
}
