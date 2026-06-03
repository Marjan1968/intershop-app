"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Props = {
  q?: string;
  sort?: string;
  safePage: number;
  totalPages: number;
  visiblePages: Array<number | "...">;
};

function buildPesmiUrl({
  q,
  sort,
  page,
}: {
  q?: string;
  sort?: string;
  page?: number;
}) {
  const params = new URLSearchParams();

  if (q) params.set("q", q);
  if (sort) params.set("sort", sort);
  if (page && page > 1) params.set("page", String(page));

  const qs = params.toString();
  return qs ? `/pesmi?${qs}` : "/pesmi";
}

function CenterLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 shadow-xl dark:bg-zinc-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-300 border-t-black dark:border-zinc-700 dark:border-t-white"></div>
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Nalagam stran ...
        </div>
      </div>
    </div>
  );
}

export default function PaginationControls({
  q,
  sort,
  safePage,
  totalPages,
  visiblePages,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const goTo = (href: string, disabled?: boolean) => {
    if (disabled) return;

    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <>
      {isPending && <CenterLoader />}

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {/* PREVIOUS */}
        <button
          onClick={() =>
            goTo(
              buildPesmiUrl({
                q,
                sort,
                page: Math.max(safePage - 1, 1),
              }),
              safePage === 1
            )
          }
          disabled={safePage === 1}
          
        className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-transform duration-150 
        hover:scale-105 active:scale-95 ${
            safePage === 1
            ? "cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600"
            : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        }`}

        >
          ← Prejšnja
        </button>

        {/* PAGE NUMBERS */}
        {visiblePages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 text-sm text-zinc-500 dark:text-zinc-400"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() =>
                goTo(buildPesmiUrl({ q, sort, page: p }), p === safePage)
              }
              disabled={p === safePage}
              
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-transform duration-150 
                hover:scale-105 active:scale-95 ${
                    p === safePage
                    ? "cursor-default bg-blue-600 text-white"
                    : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                }`}

            >
              {p}
            </button>
          )
        )}

        {/* NEXT */}
        <button
          onClick={() =>
            goTo(
              buildPesmiUrl({
                q,
                sort,
                page: Math.min(safePage + 1, totalPages),
              }),
              safePage === totalPages
            )
          }
          disabled={safePage === totalPages}
          
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-transform duration-150 
            hover:scale-105 active:scale-95 ${
                safePage === 1
                ? "cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600"
                : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            }`}

        >
          Naslednja →
        </button>
      </div>
    </>
  );
}
