"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PageLink({
  page,
  currentPage,
}: {
  page: number;
  currentPage: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isActive = page === currentPage;

  return (
    <button
      onClick={() => {
        if (page === currentPage) return;
        setLoading(true);
        router.push(`/pesmi?page=${page}`);
      }}
      className={`px-3 py-1 rounded border text-sm
        ${isActive ? "bg-black text-white" : "bg-white text-black"}
        hover:bg-gray-100 disabled:opacity-50`}
      disabled={isActive}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-gray-400 border-t-black" />
        </span>
      ) : (
        page
      )}
    </button>
  );
}