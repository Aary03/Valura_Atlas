export default function Footer() {
  return (
    <footer
      className="w-full flex items-center justify-between px-6 flex-wrap gap-y-2"
      style={{
        height: "60px",
        minHeight: "60px",
        backgroundColor: "#000D14",
        borderTop: "1px solid rgba(255,255,252,0.08)",
      }}
    >
      <p className="font-body text-xs" style={{ color: "rgba(255,255,252,0.30)" }}>
        <span className="font-title font-semibold">Atlas</span>
        {" "}by Valura
        <span className="mx-2 opacity-40">·</span>
        © {new Date().getFullYear()} Valura India IFSC Private Limited
      </p>

      <p className="font-body text-xs" style={{ color: "rgba(255,255,252,0.30)" }}>
        Regulated by IFSCA
        <span className="mx-1.5 opacity-40">·</span>
        GIFT City, Gandhinagar
      </p>
    </footer>
  );
}
