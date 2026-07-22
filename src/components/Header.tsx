"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/ask", label: "Ask & route" },
  { href: "/tools", label: "Public tools" },
  { href: "/report", label: "Report an issue" },
  { href: "/permits", label: "Permits" },
  { href: "/meetings", label: "Meetings" },
  { href: "/reps", label: "Your reps" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/ask">
          <span className="brand serif">Portland Civic Front Door</span>
          <span className="brand-sub" style={{ display: "block" }}>
            An unofficial guide to city services
          </span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
