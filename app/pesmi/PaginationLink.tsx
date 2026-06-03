"use client";

import { useRouter } from "next/navigation";

export default function PaginationLink({
  href,
  children,
  className = "",
  disabled = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        router.push(href);
      }}
      className={className}
    >
      {children}
    </button>
  );
}