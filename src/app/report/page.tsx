"use client";

import dynamic from "next/dynamic";
import { issues, IS_MOCK, REPORT_URL, type Issue } from "@/lib/issues";

// Leaflet touches `window`, so load the map only on the client.
const IssuesMap = dynamic(() => import("./IssuesMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-[color:var(--faint)]">
      Loading map…
    </div>
  ),
});

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

export default function ReportPage() {
  return (
    <main className="page page-wide">
      <header className="mb-6">
        <h1 className="serif text-3xl font-bold leading-tight sm:text-4xl">
          Report &amp; track issues
        </h1>
        <p className="lead mt-3">
          See what neighbors have recently reported to the city&apos;s 311 system,
          and report something new.
        </p>
      </header>

      <a
        href={REPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-lg w-fit"
      >
        Report a new issue <span aria-hidden="true">→</span>
      </a>

      {IS_MOCK && (
        <p className="notice mt-4">
          <strong>Showing sample data.</strong>{" "}
          These issues are mock entries, not a live feed from SeeClickFix.
        </p>
      )}

      <div
        className="mt-6 h-80 overflow-hidden border border-[color:var(--border)] sm:h-96"
        style={{ borderRadius: "6px" }}
      >
        <IssuesMap issues={issues} />
      </div>

      <h2 className="label mt-8">{issues.length} recent open issues</h2>
      <ul className="mt-3 flex flex-col gap-3">
        {issues.map((issue) => (
          <li key={issue.id}>
            <IssueRow issue={issue} timeAgo={timeAgo(issue.createdAt)} />
          </li>
        ))}
      </ul>
    </main>
  );
}

function IssueRow({ issue, timeAgo }: { issue: Issue; timeAgo: string }) {
  return (
    <article className="card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">{issue.type}</h3>
        <StatusBadge status={issue.status} />
      </div>
      <p className="mt-1 text-sm text-[color:var(--muted)]">{issue.description}</p>
      <p className="meta mt-2">
        {issue.address} · {timeAgo}
      </p>
      <a
        href={issue.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link mt-2 inline-block text-sm"
      >
        View on SeeClickFix →
      </a>
    </article>
  );
}

function StatusBadge({ status }: { status: string }) {
  const open = status.toLowerCase() === "open";
  return (
    <span className={open ? "badge badge-open shrink-0" : "badge badge-pending shrink-0"}>
      {status}
    </span>
  );
}
