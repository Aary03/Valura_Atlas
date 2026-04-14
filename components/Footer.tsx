export default function Footer() {
  return (
    <footer className="bg-white border-t border-line mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="font-title text-sm font-bold text-navy">Atlas</span>
          <span className="text-ink-3 text-xs">by Valura</span>
          <span className="text-line-2 text-xs mx-1">·</span>
          <span className="text-ink-3 text-xs">© 2025 Valura India IFSC Pvt. Ltd.</span>
        </div>
        <span className="text-ink-3 text-xs">
          Regulated by IFSCA · GIFT City, Gandhinagar
        </span>
      </div>
    </footer>
  );
}
