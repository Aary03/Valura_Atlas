export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      {/* Subtle radial glow behind the card */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(5,160,73,0.06) 0%, transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
