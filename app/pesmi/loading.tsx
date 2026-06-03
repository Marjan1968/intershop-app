export default function Loading() {
  return (
    <div className="space-y-4 px-4 py-6">

      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      ))}

    </div>
  );
}
