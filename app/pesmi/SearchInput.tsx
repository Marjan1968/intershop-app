"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") || "");
  const sort = searchParams.get("sort") || "";

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (sort) params.set("sort", sort);

    startTransition(() => {
      router.push(`/pesmi?${params.toString()}`);
    });
  };

  return (
  <form onSubmit={handleSubmit} className="flex items-center gap-3">

    {/* ✅ SEARCH INPUT */}
    <div className="relative w-full">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Išči pesmi..."
        className="w-full rounded-xl border border-zinc-300 px-5 py-3 pr-12 text-base
          dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100
          focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* ✅ X BUTTON */}
      {q && (
        <button
          type="button"
          onClick={() => setQ("")}
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 
            flex items-center justify-center
            w-8 h-8 rounded-full
            text-zinc-400 text-xl
            hover:bg-zinc-200 hover:text-zinc-700
            dark:hover:bg-zinc-700 dark:hover:text-zinc-200
            transition"
        >
          ×
        </button>
      )}
    </div>

    {/* ✅ SEARCH BUTTON */}
    <button
      type="submit"
      disabled={isPending}
      className="flex items-center justify-center gap-2 cursor-pointer 
        rounded-xl bg-blue-600 px-6 py-3 text-base font-medium text-white 
        transition-all duration-150 ease-out 
        hover:bg-blue-700 hover:scale-105 active:scale-95"
    >
      {isPending ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        "Najdi"
      )}
    </button>

  </form>
);
}
