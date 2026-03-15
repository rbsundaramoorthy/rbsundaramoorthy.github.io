import { useState } from "react";
import TagPill from "./TagPill";

export default function PostCard({ post, slug }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/musings/${slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#FFFFFF",
          borderRadius: "12px",
          padding: "32px",
          cursor: "pointer",
          border: `1px solid ${hovered ? "#E8CDB5" : "#E5DDD3"}`,
          transition: "all 0.4s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 12px 40px rgba(44,37,32,0.08)"
            : "0 2px 8px rgba(44,37,32,0.03)",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#C0754A",
              fontWeight: 500,
            }}
          >
            {post.category}
          </span>
          <TagPill label={post.tag} />
        </div>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "22px",
            fontWeight: 600,
            lineHeight: 1.3,
            marginBottom: "12px",
            color: "#2C2520",
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#7A6F64",
            marginBottom: "20px",
            fontWeight: 300,
          }}
        >
          {post.excerpt}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#7A6F64",
            fontWeight: 400,
          }}
        >
          <span>{post.formattedDate || post.date}</span>
          <span>{post.readTime} read</span>
        </div>
      </article>
    </a>
  );
}
