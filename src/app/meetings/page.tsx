import {
  meetings,
  OFFICIAL_CALENDAR_URL,
  formatMeetingDate,
  type Meeting,
} from "@/lib/meetings";

export const metadata = {
  title: "Meetings — Portland Civic Front Door",
};

export default function MeetingsPage() {
  return (
    <main className="page">
      <header className="mb-6">
        <h1 className="serif text-3xl font-bold leading-tight sm:text-4xl">
          City meetings, in plain English
        </h1>
        <p className="lead mt-3">
          What&apos;s coming up at City Council and its boards — what each meeting
          is, why it matters, and how to have your say.
        </p>
      </header>

      <p className="notice">
        <strong>Sample schedule.</strong>{" "}
        These are example listings. Always confirm dates and agendas on the{" "}
        <a href={OFFICIAL_CALENDAR_URL} target="_blank" rel="noopener noreferrer">
          city&apos;s official meetings portal
        </a>
        .
      </p>

      <ul className="mt-6 flex flex-col gap-4">
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            <MeetingCard meeting={meeting} />
          </li>
        ))}
      </ul>
    </main>
  );
}

function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <article className="card">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold">{meeting.body}</h2>
        <span className="badge">{meeting.type}</span>
      </div>
      <p className="meta mt-1 font-medium">
        {formatMeetingDate(meeting.dateTime)} · {meeting.location}
      </p>

      <p className="mt-3 text-[color:var(--muted)]">{meeting.whatItIs}</p>

      <p className="mt-3 text-sm text-[color:var(--muted)]">
        <span className="font-semibold text-[color:var(--ink)]">Why it matters:</span>{" "}
        {meeting.whyItMatters}
      </p>

      <div className="panel mt-4">
        <p>
          <span className="font-semibold text-[color:var(--ink)]">Have your say:</span>{" "}
          {meeting.howToComment}
        </p>
        <p className="mt-1">
          <span className="font-medium">Deadline:</span> {meeting.commentDeadline}
        </p>
      </div>

      <a
        href={meeting.agendaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link mt-4 inline-block text-sm"
      >
        View the agenda →
      </a>
    </article>
  );
}
