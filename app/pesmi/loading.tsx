export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">Seznam pesmi</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700"></div>
            <div className="mt-2 h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
}