import Link from "next/link";

const SECTIONS = [
  {
    href: "/ask",
    title: "Ask & route",
    desc: "Describe your problem in plain words and get sent to the exact city service that handles it.",
  },
  {
    href: "/tools",
    title: "Public tools",
    desc: "Free and low-cost resources most residents don't know exist — things to borrow, places to go.",
  },
  {
    href: "/report",
    title: "Report an issue",
    desc: "See what neighbors have reported to 311 on a map, and report a pothole, light, or hazard.",
  },
  {
    href: "/permits",
    title: "Permits",
    desc: "“Do I even need a permit?” — a plain-language read on your project, plus where to apply.",
  },
  {
    href: "/meetings",
    title: "Meetings",
    desc: "Upcoming City Council and board meetings explained, with how and when to submit public comment.",
  },
  {
    href: "/reps",
    title: "Your reps",
    desc: "Type your address to find your council district, state legislators, and trash day.",
  },
];

export default function Home() {
  return (
    <main className="page page-wide">
      <section className="mb-10 border-b border-[color:var(--border)] pb-8">
        <h1 className="serif text-4xl font-bold leading-tight sm:text-5xl">
          Cut through the runaround.
        </h1>
        <p className="lead mt-4 max-w-2xl">
          Portland Problems is a plain-language guide to getting things done in
          Portland, Maine. No jargon, no dead ends — just your problem, who
          handles it, and the direct link to fix it. Pick where to start.
        </p>
      </section>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <li key={s.href}>
            <Link href={s.href} className="home-card">
              <span className="serif text-xl font-bold">{s.title}</span>
              <span className="mt-2 block text-[color:var(--muted)]">{s.desc}</span>
              <span className="mt-3 block font-semibold text-[color:var(--brand)]">
                Go <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
