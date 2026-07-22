"use client";

import { useState } from "react";
import {
  lookupReps,
  LookupError,
  COUNCIL_URL,
  HOUSE_URL,
  SENATE_URL,
  type RepResult,
} from "@/lib/districts";

export default function RepsPage() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<RepResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const a = address.trim();
    if (!a) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await lookupReps(a));
    } catch (err) {
      setError(
        err instanceof LookupError
          ? err.message
          : "Something went wrong looking that up. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <header className="mb-6">
        <h1 className="serif text-3xl font-bold leading-tight sm:text-4xl">
          Who represents you?
        </h1>
        <p className="lead mt-3">
          Enter your Portland address to find your city council district, your
          state legislators&apos; districts, and your trash &amp; recycling day.
        </p>
      </header>

      <form onSubmit={onSubmit}>
        <label htmlFor="address" className="sr-only">
          Your address
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="address"
            type="text"
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. 389 Congress St"
            className="field"
          />
          <button
            type="submit"
            disabled={loading || address.trim().length === 0}
            className="btn btn-primary btn-lg shrink-0 justify-center"
          >
            {loading ? "Looking up…" : "Look up"}
          </button>
        </div>
      </form>

      <p className="meta mt-3">
        Matched from your address against the City of Portland&apos;s official GIS
        maps — free, and nothing is stored.
      </p>

      {loading && (
        <p className="mt-6 text-[color:var(--muted)]" aria-live="polite">
          Finding your districts…
        </p>
      )}

      {error && !loading && (
        <p className="notice mt-6" aria-live="polite">
          {error}
        </p>
      )}

      {result && !loading && (
        <div className="mt-8" aria-live="polite">
          <p className="meta mb-4">
            Matched address: {result.matchedAddress}
          </p>

          <div className="flex flex-col gap-4">
            <RepCard
              label="City Council"
              value={`District ${result.councilDistrict}`}
              linkLabel="See your councilor"
              url={COUNCIL_URL}
            />
            {result.senateDistrict && (
              <RepCard
                label="Maine State Senate"
                value={`District ${result.senateDistrict}`}
                linkLabel="See your senator"
                url={SENATE_URL}
              />
            )}
            {result.houseDistrict && (
              <RepCard
                label="Maine House of Representatives"
                value={`District ${result.houseDistrict}`}
                linkLabel="See your representative"
                url={HOUSE_URL}
              />
            )}
            {result.trashDay && (
              <RepCard
                label="Trash & recycling day"
                value={result.trashDay}
                linkLabel="Collection details"
                url="https://www.portlandmaine.gov/trash-recycling"
              />
            )}
          </div>

          <p className="meta mt-4">
            Districts come straight from the city&apos;s maps. Click each link to
            see the person who currently holds that seat on the official site.
          </p>
        </div>
      )}
    </main>
  );
}

function RepCard({
  label,
  value,
  linkLabel,
  url,
}: {
  label: string;
  value: string;
  linkLabel: string;
  url: string;
}) {
  return (
    <article className="card flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="label">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary w-fit shrink-0"
      >
        {linkLabel} <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
