"use client";

import { useMemo, useState } from "react";
import { categories, filterTools } from "@/lib/tools";
import type { PublicTool } from "@/lib/types";

const ALL = "All";

export default function ToolsPage() {
  const [category, setCategory] = useState<string>(ALL);
  const [search, setSearch] = useState("");

  const results = useMemo(() => filterTools(category, search), [category, search]);

  return (
    <main className="page page-wide">
      <header className="mb-6">
        <h1 className="serif text-3xl font-bold leading-tight sm:text-4xl">
          Public tools you can use
        </h1>
        <p className="lead mt-3">
          Free and low-cost public resources most residents don&apos;t know exist —
          things to borrow, places to go, and ways to get involved.
        </p>
      </header>

      <div>
        <label htmlFor="tool-search" className="sr-only">
          Search public tools
        </label>
        <input
          id="tool-search"
          type="search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search (e.g. tools, passes, gardens)"
          className="field"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[ALL, ...categories].map((cat) => {
          const active = cat === category;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(cat)}
              className={active ? "chip is-active" : "chip"}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <p className="meta mt-6" aria-live="polite">
        {results.length} {results.length === 1 ? "resource" : "resources"}
      </p>

      {results.length > 0 ? (
        <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {results.map((tool) => (
            <li key={tool.name}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="card mt-3 text-[color:var(--muted)]">
          No public tools match that. Try a different category or search term.
        </p>
      )}
    </main>
  );
}

function ToolCard({ tool }: { tool: PublicTool }) {
  return (
    <article className="card flex h-full flex-col">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold leading-tight">{tool.name}</h2>
        <span className="badge shrink-0">{tool.category}</span>
      </div>

      <p className="text-[color:var(--muted)]">{tool.whatItIs}</p>

      <dl className="mt-4 space-y-1.5 text-sm">
        <Row label="Who it's for" value={tool.whoItsFor} />
        <Row label="Cost" value={tool.cost} />
        <Row label="Where" value={tool.location} />
      </dl>

      <div className="mt-4 flex flex-1 flex-col justify-end">
        <p className="text-sm text-[color:var(--muted)]">{tool.howToAccess}</p>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-3 w-fit"
        >
          How to access <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="shrink-0 font-semibold text-[color:var(--faint)]">{label}:</dt>
      <dd className="text-[color:var(--muted)]">{value}</dd>
    </div>
  );
}
