"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { PORTLAND_CENTER, type Issue } from "@/lib/issues";

// Leaflet's default icon URLs don't survive bundling — point them at the imported assets.
// Turbopack may hand back a plain URL string or a StaticImageData object, so handle both.
const assetSrc = (asset: string | { src: string }): string =>
  typeof asset === "string" ? asset : asset.src;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: assetSrc(markerIcon2x),
  iconUrl: assetSrc(markerIcon),
  shadowUrl: assetSrc(markerShadow),
});

export default function IssuesMap({ issues }: { issues: Issue[] }) {
  return (
    <MapContainer
      center={PORTLAND_CENTER}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {issues.map((issue) => (
        <Marker key={issue.id} position={[issue.lat, issue.lng]}>
          <Popup>
            <strong>{issue.type}</strong>
            <br />
            <span>{issue.status}</span>
            <br />
            <span>{issue.address}</span>
            <br />
            <a href={issue.url} target="_blank" rel="noopener noreferrer">
              View on SeeClickFix →
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
