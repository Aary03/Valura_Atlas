export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-line h-14 flex items-center px-6">
        <div className="flex items-center gap-1.5">
          <span className="font-title text-lg font-bold text-navy">Atlas</span>
          <span
            className="text-xs font-medium px-1.5 py-0.5 rounded"
            style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
          >
            by Valura
          </span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
