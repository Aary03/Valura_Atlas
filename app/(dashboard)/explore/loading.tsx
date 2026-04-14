export default function ExploreLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <section
        className="w-full px-6 py-16"
        style={{
          background: "linear-gradient(135deg, #00111B 0%, #0D2D45 100%)",
          borderBottom: "1px solid rgba(255,255,252,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto space-y-4 animate-pulse">
          <div className="h-3 w-24 rounded-full bg-white/8" />
          <div className="h-10 w-96 max-w-full rounded-xl bg-white/8" />
          <div className="h-4 w-80 max-w-full rounded-lg bg-white/6" />
          <div className="flex gap-3 pt-2">
            {[80, 96, 72].map((w) => (
              <div key={w} className="h-8 rounded-full bg-white/6" style={{ width: w }} />
            ))}
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="h-6 w-32 rounded-lg bg-white/8 animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden animate-pulse"
              style={{
                backgroundColor: "#0A2236",
                border: "1px solid rgba(255,255,252,0.08)",
              }}
            >
              {/* Image area */}
              <div className="h-[200px] bg-white/5" />
              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded-lg bg-white/8" />
                <div className="h-3.5 w-full rounded bg-white/6" />
                <div className="h-3.5 w-5/6 rounded bg-white/6" />
                {/* Meta row */}
                <div className="flex gap-4 pt-1">
                  {[60, 80, 72].map((w) => (
                    <div key={w} className="h-3 rounded bg-white/5" style={{ width: w }} />
                  ))}
                </div>
                {/* Button */}
                <div className="h-11 w-full rounded-xl bg-white/8 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
