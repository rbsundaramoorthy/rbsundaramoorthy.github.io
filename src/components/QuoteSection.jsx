import AnimatedEntry from "./AnimatedEntry";

export default function QuoteSection() {
  return (
    <section
      style={{
        background: "#1A1714",
        padding: "80px 32px",
      }}
    >
      <AnimatedEntry>
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "48px",
              color: "#C0754A",
              marginBottom: "24px",
              lineHeight: 1,
            }}
          >
            &ldquo;
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "#E8E0D6",
              marginBottom: "24px",
            }}
          >
            The most interesting things live at the intersection of what you know
            and what surprises you.
          </p>
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "#C0754A",
              margin: "0 auto",
            }}
          />
        </div>
      </AnimatedEntry>
    </section>
  );
}
