export default function ExploreLoading() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero skeleton */}
      <div className="mb-10 space-y-3 animate-pulse">
        <div className="h-3 w-24 bg-line rounded-full" />
        <div className="h-10 w-96 bg-line rounded-xl" />
        <div className="h-5 w-72 bg-line rounded-lg" />
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-7 w-20 bg-line rounded-full" />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="h-7 w-36 bg-line rounded-lg mb-5 animate-pulse" />
      <div className="grid md:grid-cols-2 gap-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-line overflow-hidden animate-pulse"
          >
            <div className="h-2 bg-surface-2" />
            <div className="p-6 space-y-3">
              <div className="h-5 w-20 bg-surface-2 rounded-full" />
              <div className="h-5 w-3/4 bg-surface-2 rounded-lg" />
              <div className="h-4 w-full bg-surface-2 rounded-lg" />
              <div className="h-4 w-2/3 bg-surface-2 rounded-lg" />
              <div className="h-10 w-full bg-surface-2 rounded-xl mt-2" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
