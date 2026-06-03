export default function Loading() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center animate-pulse">
      <div className="mb-6 h-8 w-2/3 mx-auto rounded bg-zinc-200 dark:bg-zinc-700"></div>

      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded bg-zinc-200 dark:bg-zinc-700"
          ></div>
        ))}
      </div>
    </div>
  );
}