"use client";

import { useState } from "react";
import {
  permitProjects,
  PORTAL_URL,
  PORTAL_LABEL,
  type PermitProject,
} from "@/lib/permits";

export default function PermitsPage() {
  const [selected, setSelected] = useState<PermitProject | null>(null);

  return (
    <main className="page">
      <header className="mb-6">
        <h1 className="serif text-3xl font-bold leading-tight sm:text-4xl">
          Do I even need a permit?
        </h1>
        <p className="lead mt-3">
          Pick what you&apos;re planning and we&apos;ll give you a plain-language
          read on whether a permit is likely, what to prepare, and where to apply.
        </p>
      </header>

      <Disclaimer />

      {!selected ? (
        <section className="mt-6" aria-label="Choose a project type">
          <p className="label mb-3">What are you planning?</p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {permitProjects.map((project) => (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="card w-full text-left font-semibold hover:border-[color:var(--brand)]"
                >
                  {project.label}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <ResultCard project={selected} onReset={() => setSelected(null)} />
      )}
    </main>
  );
}

function ResultCard({
  project,
  onReset,
}: {
  project: PermitProject;
  onReset: () => void;
}) {
  return (
    <section className="mt-6" aria-live="polite">
      <button type="button" onClick={onReset} className="link mb-4 text-sm">
        ← Choose a different project
      </button>

      <article className="card">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="serif text-xl font-bold">{project.label}</h2>
          <LevelBadge level={project.level} />
        </div>
        <p className="mt-1 font-semibold">{project.verdict}</p>
        <p className="mt-3 text-[color:var(--muted)]">{project.summary}</p>

        <h3 className="label mt-5">What&apos;s involved</h3>
        <p className="mt-2 leading-relaxed text-[color:var(--muted)]">
          {project.details}
        </p>

        <h3 className="label mt-5">Checklist</h3>
        <ul className="mt-2 flex flex-col gap-2">
          {project.checklist.map((item) => (
            <li key={item} className="flex gap-2 text-[color:var(--ink)]">
              <span aria-hidden="true" className="mt-0.5 text-[color:var(--brand)]">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="panel mt-5">
          <span className="font-semibold text-[color:var(--ink)]">Rough timeline:</span>{" "}
          {project.timeline}
        </div>

        {project.note && (
          <p className="meta mt-3">{project.note}</p>
        )}

        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg mt-5"
        >
          {PORTAL_LABEL} <span aria-hidden="true">→</span>
        </a>
      </article>
    </section>
  );
}

function LevelBadge({ level }: { level: PermitProject["level"] }) {
  const isYes = level === "yes";
  return (
    <span className={isYes ? "badge badge-pending" : "badge"}>
      {isYes ? "Permit likely" : "It depends"}
    </span>
  );
}

function Disclaimer() {
  return (
    <p className="notice">
      <strong>This is guidance, not an official determination.</strong>{" "}
      Only the City of Portland Permitting &amp; Inspections Department can confirm
      what your specific project requires.
    </p>
  );
}
