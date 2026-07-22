"use client";

import { useState } from "react";
import { lookupDistrict, type Lookup } from "@/lib/districts";

export default function RepsPage() {
  const [address, setAddress] = useState("");
  const [lookup, setLookup] = useState<Lookup | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    setLookup(lookupDistrict(address));
  }

  return (
    <main className="page">
      <header className="mb-6">
        <h1 className="serif text-3xl font-bold leading-tight sm:text-4xl">
          Who represents you?
        </h1>
        <p className="lead mt-3">
          Enter your address to find your city councilor, school board member,
          state legislators, polling place, and trash day.
        </p>
      </header>

      <p className="notice mb-4">
        <strong>Sample data.</strong>{" "}
        This is a demo lookup, not a real district match yet — a live version will
        geocode your address against Portland&apos;s ArcGIS district maps.
      </p>

      <form onSubmit={onSubmit}>
        <label htmlFor="address" className="sr-only">
          Your address
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="address"
            type="text"
            autoComplete="off"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. 123 Congress St"
            className="field"
          />
          <button
            type="submit"
            disabled={address.trim().length === 0}
            className="btn btn-primary btn-lg shrink-0 justify-center"
          >
            Look up
          </button>
        </div>
      </form>

      {lookup && (
        <div className="mt-8" aria-live="polite">
          {!lookup.matched && (
            <p className="meta mb-3">
              Showing a general sample (address didn&apos;t match a sample
              neighborhood). Try one with &quot;Munjoy&quot;, &quot;West End&quot;,
              or &quot;Deering&quot; to see a specific district.
            </p>
          )}

          <Section title="Your representatives">
            <Row label="City Councilor" value={lookup.result.councilor} />
            <Row label="Council district" value={lookup.result.councilDistrict} />
            <Row label="At-large" value={lookup.result.atLarge} />
            <Row label="School Board" value={lookup.result.schoolBoardRep} />
            <Row label="State Senator" value={lookup.result.stateSenator} />
            <Row label="State Representative" value={lookup.result.stateRep} />
          </Section>

          <Section title="Voting">
            <Row label="Polling place" value={lookup.result.pollingPlace} />
          </Section>

          <Section title="City services">
            <Row label="Trash day" value={lookup.result.trashDay} />
            <Row label="Recycling" value={lookup.result.recyclingNote} />
          </Section>
        </div>
      )}
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card mb-4">
      <h2 className="label mb-3">{title}</h2>
      <dl className="flex flex-col gap-2.5">{children}</dl>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="shrink-0 text-sm font-medium text-[color:var(--muted)]">
        {label}
      </dt>
      <dd className="font-medium sm:text-right">{value}</dd>
    </div>
  );
}
