// ✅ STRAN: SEZNAM PESMI (/pesmi)
// ✅ Server Component
// ✅ WordPress API + search + pagination + sorting
// ✅ prikaz samo naslovov

import Link from "next/link";
import SearchInput from "./SearchInput";
import ScrollRestore from "./ScrollRestore";
import SongLink from "./SongLink";
type WpPost = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
};

type PageToken = number | "...";

function getVisiblePages(current: number, total: number): PageToken[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }

  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
}

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

  if (q?.trim()) params.set("q", q.trim());
  if (sort && sort !== "title-asc") params.set("sort", sort);
  if (page && page > 1) params.set("page", String(page));

  const qs = params.toString();
  return qs ? `/pesmi?${qs}` : "/pesmi";
}

async function getSongs({
  q,
  sort,
  page,
  perPage,
}: {
  q: string;
  sort: string;
  page: number;
  perPage: number;
}) {
  const params = new URLSearchParams();
  params.set("categories", "3"); 
  params.set("page", String(page));
  params.set("per_page", String(perPage));
  params.set("_fields", "id,slug,title,content");

  if (q.trim()) {
    params.set("search", q.trim());
  }

  // WordPress sorting
  if (sort === "title-asc") {
    params.set("orderby", "title");
    params.set("order", "asc");
  } else if (sort === "title-desc") {
    params.set("orderby", "title");
    params.set("order", "desc");
  }

  const url = `https://narodne-pesmi.si/wp-json/wp/v2/posts?${params.toString()}`

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`API napaka: ${res.status}`);
  }

  const posts: WpPost[] = await res.json();
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "1");
  const totalItems = Number(res.headers.get("X-WP-Total") ?? "0");

  return {
    posts,
    totalPages: Math.max(1, totalPages),
    totalItems: Math.max(0, totalItems),
  };
}

export default async function PesmiPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; sort?: string }>;
}) {
  const sp = await searchParams;

  const q = sp.q ?? "";
  const sort = sp.sort ?? "title-asc";
  const rawPage = Number(sp.page ?? "1");
  const pageParam = sp.page ?? "1";
  const currentPage = Number.isFinite(rawPage) ? Math.max(1, rawPage) : 1;

  const itemsPerPage = 24;

  let posts: WpPost[] = [];
  let totalPages = 1;
  let totalItems = 0;
  let error = "";

  try {
    const result = await getSongs({
      q,
      sort,
      page: currentPage,
      perPage: itemsPerPage,
    });

    posts = result.posts;
    totalPages = result.totalPages;
    totalItems = result.totalItems;
  } catch (e) {
    console.error(e);
    error = "Podatkov iz WordPressa ni bilo mogoče prebrati.";
  }

  const safePage = Math.min(currentPage, totalPages);
  const visiblePages = getVisiblePages(safePage, totalPages);

    return (
      <>
        <ScrollRestore />

        <div className="mx-auto w-full max-w-[1600px] px-6 py-16">
          <h1 className="mb-8 text-center text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Seznam pesmi
          </h1>

          {/* SEARCH */}
      
     
    <div className="mb-6 w-full md:w-[30%] md:mx-auto">
      <SearchInput />
    </div>

      {/* SORT */}
      <div className="mb-8 flex gap-4">
        <Link
          href={buildPesmiUrl({ q, sort: "title-asc" })}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
            sort === "title-asc"
              ? "bg-blue-600 text-white"
              : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          }`}
        >
          A → Ž
        </Link>

        <Link
          href={buildPesmiUrl({ q, sort: "title-desc" })}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
            sort === "title-desc"
              ? "bg-blue-600 text-white"
              : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          }`}
        >
          Ž → A
        </Link>
      </div>

      {/* STATUS / ERROR */}
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
            Napaka
          </h2>
          <p className="mt-2 text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Ni rezultatov
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Za iskalni niz <span className="font-medium">"{q}"</span> nisem našel nobene pesmi.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Najdenih pesmi: <span className="font-semibold">{totalItems}</span>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
  const paramsObj: Record<string, string> = {};

  if (q) {
    paramsObj.q = q;
  }

  if (sort) {
    paramsObj.sort = sort;
  }

  if (pageParam !== "1") {
    paramsObj.page = pageParam;
  }

  const href = `/pesmi/${post.slug}?${new URLSearchParams(paramsObj).toString()}`;

  return (
    
      
<SongLink
  key={post.id}
  href={href}
  className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
>

          <h3
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </SongLink>
      );
    })}
          </div>


          {/* PAGINATION */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <Link
              href={buildPesmiUrl({
                q,
                sort,
                page: Math.max(safePage - 1, 1),
              })}
              aria-disabled={safePage === 1}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                safePage === 1
                  ? "cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600"
                  : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              ← Prejšnja
            </Link>

            {visiblePages.map((p, i) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="px-2 text-sm text-zinc-500 dark:text-zinc-400"
                >
                  …
                </span>
              ) : (
                <Link
                  key={p}
                  href={buildPesmiUrl({ q, sort, page: p })}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    p === safePage
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                  }`}
                >
                  {p}
                </Link>
              )
            )}

            <Link
              href={buildPesmiUrl({
                q,
                sort,
                page: Math.min(safePage + 1, totalPages),
              })}
              aria-disabled={safePage === totalPages}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                safePage === totalPages
                  ? "cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600"
                  : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              Naslednja →
            </Link>
          </div>

          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Stran {safePage} od {totalPages}
          </p>
        </>
      )}
    </div>
    </>
  );
}