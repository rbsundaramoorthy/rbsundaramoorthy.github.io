import { useState } from "react";

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 32px",
        borderRadius: "12px",
        background: hovered ? "#FFFFFF" : "transparent",
        border: `1px solid ${hovered ? "#E5DDD3" : "transparent"}`,
        cursor: "pointer",
        transition: "all 0.3s ease",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <div style={{ flex: "1 1 300px" }}>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "22px",
            fontWeight: 600,
            marginBottom: "6px",
          }}
        >
          {project.name}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#7A6F64",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          {project.description}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "#7A6F64",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {project.tech}
        </span>
        <span
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color:
              project.status === "Active"
                ? "#4A8C5E"
                : project.status === "In Progress"
                ? "#C0754A"
                : "#7A6F64",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          ● {project.status}
        </span>
      </div>
    </div>
  );
}
