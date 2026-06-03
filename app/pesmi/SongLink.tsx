"use client";

import Link from "next/link";

export default function SongLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        sessionStorage.setItem("scrollY", String(window.scrollY));
      }}
    >
      {children}
    </Link>
  );
}