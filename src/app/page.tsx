"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/ask");
  }, [router]);

  return (
    <main className="page">
      <p className="lead">
        Redirecting to{" "}
        <Link className="link" href="/ask">
          the Ask &amp; route page
        </Link>
        …
      </p>
    </main>
  );
}
