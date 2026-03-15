export default function TagPill({ label }) {
  const colors = {
    Philosophy: { bg: "#E8DDD3", text: "#6B4F3A" },
    Engineering: { bg: "#D4E4DB", text: "#2D5F40" },
    Culture: { bg: "#E0D6E8", text: "#5B3D6E" },
    Discovery: { bg: "#D9E3EE", text: "#2E4A6B" },
  };
  const c = colors[label] || { bg: "#eee", text: "#555" };
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        padding: "4px 14px",
        borderRadius: "20px",
        fontSize: "12px",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}
