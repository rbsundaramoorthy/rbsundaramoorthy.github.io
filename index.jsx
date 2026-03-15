import { useState, useEffect, useRef } from "react";

const SECTIONS = ["home", "musings", "projects", "perspectives", "about"];

const POSTS = [
  {
    id: 1,
    category: "Observation",
    title: "The Beauty of Unfinished Things",
    excerpt: "Why the Japanese concept of wabi-sabi has more to teach us about innovation than any Silicon Valley playbook ever could.",
    date: "Mar 12, 2026",
    readTime: "5 min",
    tag: "Philosophy",
  },
  {
    id: 2,
    category: "Side Project",
    title: "Building a CLI That Thinks Differently",
    excerpt: "What happens when you design developer tools with the assumption that the user is brilliant but busy? A weekend experiment turned ongoing obsession.",
    date: "Mar 8, 2026",
    readTime: "8 min",
    tag: "Engineering",
  },
  {
    id: 3,
    category: "Perspective",
    title: "Two Cultures, One Kitchen",
    excerpt: "How cooking taught me that the best solutions come from holding two contradictory ideas at once — and being comfortable with both.",
    date: "Feb 28, 2026",
    readTime: "4 min",
    tag: "Culture",
  },
  {
    id: 4,
    category: "Not Obvious",
    title: "The Hidden Math in Tamil Poetry",
    excerpt: "Ancient Sangam literature wasn't just beautiful — it encoded mathematical patterns that modern linguists are only now beginning to decode.",
    date: "Feb 20, 2026",
    readTime: "6 min",
    tag: "Discovery",
  },
];

const PROJECTS = [
  {
    name: "Threadbare",
    desc: "A minimal journaling app that asks one unexpected question a day.",
    status: "Active",
    tech: "Astro, SQLite",
  },
  {
    name: "Parallax",
    desc: "Tool for viewing any news story from three different cultural perspectives.",
    status: "In Progress",
    tech: "React, Claude API",
  },
  {
    name: "Cadence",
    desc: "A CLI for developers who think in rhythms, not sprints.",
    status: "Idea Stage",
    tech: "Rust",
  },
];

const NAV_LABELS = {
  home: "Home",
  musings: "Musings",
  projects: "Projects",
  perspectives: "Perspectives",
  about: "About",
};

function TagPill({ label }) {
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

function AnimatedEntry({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function PersonalSite() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap";
  fontLink.rel = "stylesheet";
  if (!document.head.querySelector(`link[href="${fontLink.href}"]`)) {
    document.head.appendChild(fontLink);
  }

  const colors = {
    bg: "#FAF7F2",
    bgAlt: "#F2EDE5",
    text: "#2C2520",
    textMuted: "#7A6F64",
    accent: "#C0754A",
    accentSoft: "#E8CDB5",
    border: "#E5DDD3",
    cardBg: "#FFFFFF",
    dark: "#1A1714",
  };

  const fonts = {
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'DM Sans', sans-serif",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        fontFamily: fonts.body,
        overflowX: "hidden",
      }}
    >
      {/* Texture overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Navigation */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: `${colors.bg}ee`,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: "24px",
              fontWeight: 700,
              color: colors.text,
              cursor: "pointer",
              letterSpacing: "-0.5px",
            }}
            onClick={() => setActiveSection("home")}
          >
            r<span style={{ color: colors.accent }}>.</span>s
          </div>

          {/* Desktop nav */}
          <div
            style={{
              display: "flex",
              gap: "36px",
              alignItems: "center",
            }}
          >
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: fonts.body,
                  fontSize: "14px",
                  fontWeight: activeSection === s ? 600 : 400,
                  color: activeSection === s ? colors.accent : colors.textMuted,
                  cursor: "pointer",
                  padding: "4px 0",
                  borderBottom:
                    activeSection === s
                      ? `2px solid ${colors.accent}`
                      : "2px solid transparent",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                  textTransform: "lowercase",
                }}
              >
                {NAV_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 1 }}>
        {/* HERO */}
        {activeSection === "home" && (
          <div>
            <section
              style={{
                maxWidth: 1100,
                margin: "0 auto",
                padding: "100px 32px 80px",
              }}
            >
              <AnimatedEntry>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: "13px",
                    color: colors.accent,
                    textTransform: "uppercase",
                    letterSpacing: "3px",
                    marginBottom: "24px",
                    fontWeight: 500,
                  }}
                >
                  Welcome, Curious Mind
                </p>
              </AnimatedEntry>

              <AnimatedEntry delay={150}>
                <h1
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "clamp(42px, 6vw, 72px)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    maxWidth: 800,
                    marginBottom: "32px",
                    color: colors.text,
                  }}
                >
                  Things that make me{" "}
                  <span
                    style={{
                      fontStyle: "italic",
                      color: colors.accent,
                      fontWeight: 600,
                    }}
                  >
                    pause
                  </span>
                  ,{" "}
                  <span
                    style={{
                      fontStyle: "italic",
                      color: colors.accent,
                      fontWeight: 600,
                    }}
                  >
                    think
                  </span>
                  , and{" "}
                  <span
                    style={{
                      fontStyle: "italic",
                      color: colors.accent,
                      fontWeight: 600,
                    }}
                  >
                    look again
                  </span>
                  .
                </h1>
              </AnimatedEntry>

              <AnimatedEntry delay={300}>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: "18px",
                    lineHeight: 1.7,
                    color: colors.textMuted,
                    maxWidth: 560,
                    fontWeight: 300,
                  }}
                >
                  A small corner of the internet where I explore the interesting,
                  the non-obvious, and the beautifully different — through code,
                  culture, and curiosity.
                </p>
              </AnimatedEntry>

              {/* Decorative line */}
              <AnimatedEntry delay={450}>
                <div
                  style={{
                    width: "80px",
                    height: "2px",
                    background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
                    marginTop: "48px",
                  }}
                />
              </AnimatedEntry>
            </section>

            {/* Recent writings */}
            <section
              style={{
                maxWidth: 1100,
                margin: "0 auto",
                padding: "0 32px 80px",
              }}
            >
              <AnimatedEntry>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "48px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: fonts.display,
                      fontSize: "32px",
                      fontWeight: 400,
                    }}
                  >
                    Recently{" "}
                    <span style={{ fontStyle: "italic", color: colors.accent }}>
                      thinking about
                    </span>
                  </h2>
                  <button
                    onClick={() => setActiveSection("musings")}
                    style={{
                      background: "none",
                      border: "none",
                      fontFamily: fonts.body,
                      fontSize: "13px",
                      color: colors.accent,
                      cursor: "pointer",
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                    }}
                  >
                    View all →
                  </button>
                </div>
              </AnimatedEntry>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "24px",
                }}
              >
                {POSTS.map((post, i) => (
                  <AnimatedEntry key={post.id} delay={i * 120}>
                    <article
                      onMouseEnter={() => setHoveredPost(post.id)}
                      onMouseLeave={() => setHoveredPost(null)}
                      style={{
                        background: colors.cardBg,
                        borderRadius: "12px",
                        padding: "32px",
                        cursor: "pointer",
                        border: `1px solid ${
                          hoveredPost === post.id
                            ? colors.accentSoft
                            : colors.border
                        }`,
                        transition: "all 0.4s ease",
                        transform:
                          hoveredPost === post.id
                            ? "translateY(-4px)"
                            : "translateY(0)",
                        boxShadow:
                          hoveredPost === post.id
                            ? "0 12px 40px rgba(44,37,32,0.08)"
                            : "0 2px 8px rgba(44,37,32,0.03)",
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
                            color: colors.accent,
                            fontWeight: 500,
                          }}
                        >
                          {post.category}
                        </span>
                        <TagPill label={post.tag} />
                      </div>

                      <h3
                        style={{
                          fontFamily: fonts.display,
                          fontSize: "22px",
                          fontWeight: 600,
                          lineHeight: 1.3,
                          marginBottom: "12px",
                          color: colors.text,
                        }}
                      >
                        {post.title}
                      </h3>

                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.7,
                          color: colors.textMuted,
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
                          color: colors.textMuted,
                          fontWeight: 400,
                        }}
                      >
                        <span>{post.date}</span>
                        <span>{post.readTime} read</span>
                      </div>
                    </article>
                  </AnimatedEntry>
                ))}
              </div>
            </section>

            {/* Quote / Ethos */}
            <section
              style={{
                background: colors.dark,
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
                      fontFamily: fonts.display,
                      fontSize: "48px",
                      color: colors.accent,
                      marginBottom: "24px",
                      lineHeight: 1,
                    }}
                  >
                    "
                  </div>
                  <p
                    style={{
                      fontFamily: fonts.display,
                      fontSize: "clamp(22px, 3vw, 30px)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      lineHeight: 1.6,
                      color: "#E8E0D6",
                      marginBottom: "24px",
                    }}
                  >
                    The most interesting things live at the intersection of what
                    you know and what surprises you.
                  </p>
                  <div
                    style={{
                      width: "40px",
                      height: "2px",
                      background: colors.accent,
                      margin: "0 auto",
                    }}
                  />
                </div>
              </AnimatedEntry>
            </section>

            {/* Projects preview */}
            <section
              style={{
                maxWidth: 1100,
                margin: "0 auto",
                padding: "80px 32px",
              }}
            >
              <AnimatedEntry>
                <h2
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "32px",
                    fontWeight: 400,
                    marginBottom: "48px",
                  }}
                >
                  Side{" "}
                  <span style={{ fontStyle: "italic", color: colors.accent }}>
                    projects
                  </span>
                </h2>
              </AnimatedEntry>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {PROJECTS.map((proj, i) => (
                  <AnimatedEntry key={proj.name} delay={i * 100}>
                    <div
                      onMouseEnter={() => setHoveredProject(proj.name)}
                      onMouseLeave={() => setHoveredProject(null)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "28px 32px",
                        borderRadius: "12px",
                        background:
                          hoveredProject === proj.name
                            ? colors.cardBg
                            : "transparent",
                        border: `1px solid ${
                          hoveredProject === proj.name
                            ? colors.border
                            : "transparent"
                        }`,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        flexWrap: "wrap",
                        gap: "12px",
                      }}
                    >
                      <div style={{ flex: "1 1 300px" }}>
                        <h3
                          style={{
                            fontFamily: fonts.display,
                            fontSize: "22px",
                            fontWeight: 600,
                            marginBottom: "6px",
                          }}
                        >
                          {proj.name}
                        </h3>
                        <p
                          style={{
                            fontSize: "14px",
                            color: colors.textMuted,
                            fontWeight: 300,
                            lineHeight: 1.6,
                          }}
                        >
                          {proj.desc}
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
                            color: colors.textMuted,
                            fontFamily: fonts.body,
                          }}
                        >
                          {proj.tech}
                        </span>
                        <span
                          style={{
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            color:
                              proj.status === "Active"
                                ? "#4A8C5E"
                                : proj.status === "In Progress"
                                ? colors.accent
                                : colors.textMuted,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          ● {proj.status}
                        </span>
                      </div>
                    </div>
                  </AnimatedEntry>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* MUSINGS PAGE */}
        {activeSection === "musings" && (
          <section
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "80px 32px",
            }}
          >
            <AnimatedEntry>
              <h1
                style={{
                  fontFamily: fonts.display,
                  fontSize: "48px",
                  fontWeight: 400,
                  marginBottom: "16px",
                }}
              >
                Musings
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: colors.textMuted,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  marginBottom: "60px",
                  maxWidth: 500,
                }}
              >
                The interesting, the non-obvious, and the things that made me look
                at the world a little differently.
              </p>
            </AnimatedEntry>

            {POSTS.map((post, i) => (
              <AnimatedEntry key={post.id} delay={i * 100}>
                <article
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                    padding: "36px 0",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        color: colors.accent,
                        fontWeight: 500,
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ fontSize: "12px", color: colors.textMuted }}>
                      {post.date}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: fonts.display,
                      fontSize: "28px",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      marginBottom: "10px",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "15px",
                      color: colors.textMuted,
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      marginTop: "16px",
                    }}
                  >
                    <TagPill label={post.tag} />
                    <span style={{ fontSize: "12px", color: colors.textMuted }}>
                      {post.readTime} read
                    </span>
                  </div>
                </article>
              </AnimatedEntry>
            ))}
          </section>
        )}

        {/* PROJECTS PAGE */}
        {activeSection === "projects" && (
          <section
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "80px 32px",
            }}
          >
            <AnimatedEntry>
              <h1
                style={{
                  fontFamily: fonts.display,
                  fontSize: "48px",
                  fontWeight: 400,
                  marginBottom: "16px",
                }}
              >
                Projects
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: colors.textMuted,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  marginBottom: "60px",
                  maxWidth: 500,
                }}
              >
                Things I'm building, breaking, and learning from. Some are polished,
                most are experiments.
              </p>
            </AnimatedEntry>

            {PROJECTS.map((proj, i) => (
              <AnimatedEntry key={proj.name} delay={i * 120}>
                <div
                  style={{
                    background: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "12px",
                    padding: "36px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: fonts.display,
                        fontSize: "26px",
                        fontWeight: 600,
                      }}
                    >
                      {proj.name}
                    </h2>
                    <span
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        color:
                          proj.status === "Active"
                            ? "#4A8C5E"
                            : proj.status === "In Progress"
                            ? colors.accent
                            : colors.textMuted,
                        fontWeight: 600,
                        background:
                          proj.status === "Active"
                            ? "#D4E4DB"
                            : proj.status === "In Progress"
                            ? colors.accentSoft
                            : colors.bgAlt,
                        padding: "4px 12px",
                        borderRadius: "20px",
                      }}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      color: colors.textMuted,
                      lineHeight: 1.7,
                      fontWeight: 300,
                      marginBottom: "16px",
                    }}
                  >
                    {proj.desc}
                  </p>
                  <span
                    style={{
                      fontSize: "12px",
                      color: colors.accent,
                      fontWeight: 500,
                      fontFamily: fonts.body,
                    }}
                  >
                    {proj.tech}
                  </span>
                </div>
              </AnimatedEntry>
            ))}
          </section>
        )}

        {/* PERSPECTIVES PAGE */}
        {activeSection === "perspectives" && (
          <section
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "80px 32px",
            }}
          >
            <AnimatedEntry>
              <h1
                style={{
                  fontFamily: fonts.display,
                  fontSize: "48px",
                  fontWeight: 400,
                  marginBottom: "16px",
                }}
              >
                Perspectives
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: colors.textMuted,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  marginBottom: "60px",
                  maxWidth: 540,
                }}
              >
                A space for different angles. Your take might be nothing like mine —
                and that's exactly the point. Share a thought, challenge an idea, or
                just say hello.
              </p>
            </AnimatedEntry>

            <AnimatedEntry delay={150}>
              <div
                style={{
                  background: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "12px",
                  padding: "40px",
                  marginBottom: "40px",
                }}
              >
                <h3
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "24px",
                    fontWeight: 600,
                    marginBottom: "24px",
                  }}
                >
                  This month's question
                </h3>
                <p
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: colors.accent,
                    lineHeight: 1.6,
                    marginBottom: "28px",
                  }}
                >
                  "What's one thing you believed strongly five years ago that you've
                  since changed your mind about?"
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: colors.textMuted,
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  This is where a Tally or Typeform embed would go — visitors can
                  share their answers anonymously and see what others have said. A
                  simple embed keeps the site fully static.
                </p>
                <div
                  style={{
                    marginTop: "24px",
                    padding: "20px",
                    background: colors.bgAlt,
                    borderRadius: "8px",
                    border: `1px dashed ${colors.border}`,
                    textAlign: "center",
                    fontSize: "13px",
                    color: colors.textMuted,
                  }}
                >
                  [ Tally / Typeform embed goes here ]
                </div>
              </div>
            </AnimatedEntry>

            <AnimatedEntry delay={300}>
              <div
                style={{
                  background: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "12px",
                  padding: "40px",
                }}
              >
                <h3
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "24px",
                    fontWeight: 600,
                    marginBottom: "24px",
                  }}
                >
                  Quick poll
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: colors.textMuted,
                    lineHeight: 1.7,
                    fontWeight: 300,
                    marginBottom: "20px",
                  }}
                >
                  Light-hearted polls, rotating weekly. No logins, no fuss.
                </p>
                <div
                  style={{
                    padding: "20px",
                    background: colors.bgAlt,
                    borderRadius: "8px",
                    border: `1px dashed ${colors.border}`,
                    textAlign: "center",
                    fontSize: "13px",
                    color: colors.textMuted,
                  }}
                >
                  [ Poll embed goes here ]
                </div>
              </div>
            </AnimatedEntry>
          </section>
        )}

        {/* ABOUT PAGE */}
        {activeSection === "about" && (
          <section
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "80px 32px",
            }}
          >
            <AnimatedEntry>
              <h1
                style={{
                  fontFamily: fonts.display,
                  fontSize: "48px",
                  fontWeight: 400,
                  marginBottom: "40px",
                }}
              >
                About
              </h1>
            </AnimatedEntry>

            <AnimatedEntry delay={100}>
              <div
                style={{
                  display: "flex",
                  gap: "48px",
                  flexWrap: "wrap",
                  marginBottom: "48px",
                }}
              >
                {/* Photo placeholder */}
                <div
                  style={{
                    width: "200px",
                    height: "240px",
                    borderRadius: "12px",
                    background: `linear-gradient(145deg, ${colors.accentSoft}, ${colors.bgAlt})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    color: colors.textMuted,
                    border: `1px solid ${colors.border}`,
                    flexShrink: 0,
                  }}
                >
                  Your photo
                </div>

                <div style={{ flex: "1 1 300px" }}>
                  <p
                    style={{
                      fontSize: "17px",
                      lineHeight: 1.8,
                      color: colors.text,
                      fontWeight: 300,
                      marginBottom: "20px",
                    }}
                  >
                    Hi, I'm Raj. I'm an engineer who finds joy in the spaces between
                    disciplines — where code meets culture, where the obvious hides
                    something deeper, and where two people can look at the same thing
                    and see something completely different.
                  </p>
                  <p
                    style={{
                      fontSize: "17px",
                      lineHeight: 1.8,
                      color: colors.text,
                      fontWeight: 300,
                      marginBottom: "20px",
                    }}
                  >
                    This site is my notebook — a place for the things that don't fit
                    neatly into a LinkedIn post or a tweet. Side projects I'm
                    tinkering with, ideas I'm wrestling with, and the occasional
                    thing that just made me smile.
                  </p>
                  <p
                    style={{
                      fontSize: "17px",
                      lineHeight: 1.8,
                      color: colors.text,
                      fontWeight: 300,
                    }}
                  >
                    If something here sparks a thought, I'd love to hear it. The
                    whole point is the conversation.
                  </p>
                </div>
              </div>
            </AnimatedEntry>

            <AnimatedEntry delay={250}>
              <div
                style={{
                  background: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "12px",
                  padding: "36px",
                }}
              >
                <h3
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "22px",
                    fontWeight: 600,
                    marginBottom: "20px",
                  }}
                >
                  Say hello
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: colors.textMuted,
                    fontWeight: 300,
                    lineHeight: 1.7,
                    marginBottom: "16px",
                  }}
                >
                  Whether it's a project idea, a recommendation, or just a "hey, I
                  disagree with your take on X" — all welcome.
                </p>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <a
                    href="https://github.com/rbsundaramoorthy"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "10px 24px",
                      borderRadius: "8px",
                      background: colors.dark,
                      color: "#E8E0D6",
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                      fontFamily: fonts.body,
                      transition: "all 0.3s ease",
                    }}
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:hello@rajsundaramoorthy.com"
                    style={{
                      padding: "10px 24px",
                      borderRadius: "8px",
                      background: "transparent",
                      color: colors.accent,
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                      fontFamily: fonts.body,
                      border: `1px solid ${colors.accent}`,
                      transition: "all 0.3s ease",
                    }}
                  >
                    Email
                  </a>
                </div>
              </div>
            </AnimatedEntry>
          </section>
        )}

        {/* Footer */}
        <footer
          style={{
            borderTop: `1px solid ${colors.border}`,
            padding: "40px 32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: "13px",
              color: colors.textMuted,
              fontWeight: 300,
            }}
          >
            Made with curiosity & caffeine · rajsundaramoorthy.com
          </p>
        </footer>
      </main>
    </div>
  );
}
