export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 shadow-xl dark:bg-zinc-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
        <div className="text-gray-700 dark:text-gray-300">
          Nalagam...
        </div>
      </div>
    </div>
  );
}