"use client";

import { useMemo, useState } from "react";
import { routeQuery, type RouteResult } from "@/lib/route";
import type { Service } from "@/lib/types";

const EXAMPLES = [
  "There's a dead tree on my street",
  "My neighbor is building without a permit",
  "How do I get a trash bin?",
  "Pay a parking ticket",
  "Deck permit",
];

export default function AskPage() {
  const [query, setQuery] = useState("");
  const results = useMemo<RouteResult[]>(() => routeQuery(query), [query]);
  const hasQuery = query.trim().length > 0;

  return (
    <main className="page">
      <header className="mb-8">
        <h1 className="serif text-3xl font-bold leading-tight sm:text-4xl">
          What do you need?
        </h1>
        <p className="lead mt-3">
          Describe your problem in plain words. We&apos;ll explain it, name the
          city department that handles it, and give you the exact next step.
        </p>
      </header>

      <div>
        <label htmlFor="ask" className="sr-only">
          What do you need?
        </label>
        <input
          id="ask"
          type="text"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. there's a pothole on my street"
          className="field"
        />
      </div>

      {!hasQuery && (
        <div className="mt-5">
          <p className="label mb-2">Try one of these</p>
          <ul className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <li key={ex}>
                <button type="button" className="chip" onClick={() => setQuery(ex)}>
                  {ex}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8" aria-live="polite">
        {hasQuery && results.length > 0 && (
          <>
            <p className="label mb-3">
              {results.length === 1 ? "Here's who handles that" : "This looks like"}
            </p>
            <ul className="flex flex-col gap-4">
              {results.map(({ service }) => (
                <li key={service.id}>
                  <ServiceCard service={service} />
                </li>
              ))}
            </ul>
          </>
        )}

        {hasQuery && results.length === 0 && <NoMatch />}
      </div>
    </main>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card">
      <h2 className="text-lg font-semibold">{service.title}</h2>
      <p className="mt-1 text-[color:var(--muted)]">{service.explanation}</p>

      <p className="meta mt-3">
        <span className="label">Handled by</span> {service.department}
      </p>

      <a
        href={service.actionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary mt-4"
      >
        {service.actionLabel} <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

function NoMatch() {
  return (
    <article className="card">
      <h2 className="text-lg font-semibold">Not sure yet — here&apos;s where to start</h2>
      <p className="mt-1 text-[color:var(--muted)]">
        We couldn&apos;t match that to a specific service. To report a neighborhood
        problem, use Portland 311. Otherwise, browse the full list of city
        departments.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href="https://seeclickfix.com/portland_2/report"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Report a problem on 311 <span aria-hidden="true">→</span>
        </a>
        <a
          href="https://www.portlandmaine.gov/167/Departments"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Browse all departments
        </a>
      </div>
    </article>
  );
}
