import { useEffect, useRef, useState } from "react";
import "./App.css";
import profileImage from "./assets/profile.jpeg";
import resumePdf from "./assets/SaugatAdhikariResume.pdf";
import { Analytics } from "@vercel/analytics/react";

const LINKS = {
  email: "mailto:adhikarisaugat34@gmail.com",
  github: "https://github.com/adk-saugat",
  linkedin: "https://linkedin.com/in/sau-gat",
  instagram: "https://instagram.com/adhikari_saugat_",
};

const PROJECTS = [
  {
    num: "01",
    name: "Rally",
    detail: "Real-time location sharing",
    desc: "A group location-sharing app built as Go microservices. gRPC and Protocol Buffers handle service communication, a WebSocket gateway streams live location to a React Native map, and PostgreSQL, Redis, and JWT cover persistence, pub/sub, and authentication. Docker Compose runs the services locally.",
    stack: [
      "Go",
      "gRPC",
      "Protocol Buffers",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "React Native",
      "Docker",
    ],
  },
  {
    num: "02",
    name: "JobSync",
    detail: "Job application tracker",
    desc: "A full-stack tracker with a Go backend and React interface that organizes job applications from Gmail. The Gmail API and Gemini classify messages into statuses such as applied, interview, and rejected. Google Sign-In controls access, and Neon PostgreSQL stores each application.",
    stack: [
      "Go",
      "React",
      "PostgreSQL",
      "Gmail API",
      "Gemini API",
      "Google OAuth",
    ],
    url: "https://github.com/adk-saugat/JobSync",
  },
  {
    num: "03",
    name: "Stash",
    detail: "Git-like version control",
    desc: "A command-line version control system in Go for creating snapshots, tracking file history, and restoring earlier states. Remote push and pull keep versions synchronized across environments, with project setup and configuration included.",
    stack: ["Go", "Gin", "PostgreSQL"],
    url: "https://github.com/adk-saugat/Stash",
  },
];

const HACKATHONS = [
  {
    num: "01",
    name: "Litmus",
    detail: "AI hiring pipeline",
    desc: "An AI pipeline that compares a candidate's GitHub activity, LinkedIn experience, and portfolio projects with a job description to judge real coding habits and stack fit. Groq writes role-specific technical assessments, sent through token-gated email. Built with FastAPI, JWT auth, AWS S3, PostgreSQL, and a React 19 frontend.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "AWS S3", "Groq"],
    url: "https://github.com/adk-saugat/Litmus",
    year: "April 2026",
  },
  {
    num: "02",
    name: "Mindcare",
    detail: "NLN Hackathon",
    desc: "A mental wellbeing check-in platform for the Nepali Leaders Network hackathon. React and Go sit in front of ML-powered insights that offer supportive, non-diagnostic daily assessments, personalized tasks, and streak-based engagement.",
    stack: ["React", "Go", "Machine Learning"],
    url: "https://github.com/adk-saugat/Mindcare",
    year: "March 2026",
  },
];

const SKILLS = [
  {
    label: "Languages",
    items: [
      { name: "Go", icon: "Go", bg: "#00add8", color: "#ffffff" },
      { name: "Java", icon: "Jv", bg: "#e76f00", color: "#ffffff" },
      { name: "JavaScript", icon: "JS", bg: "#f7df1e", color: "#111111" },
      { name: "TypeScript", icon: "TS", bg: "#3178c6", color: "#ffffff" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "Gin", icon: "Gi", bg: "#00add8", color: "#ffffff" },
      { name: "React", icon: "Re", bg: "#61dafb", color: "#111111" },
      { name: "Next.js", icon: "Nx", bg: "#111111", color: "#ffffff" },
      { name: "Node.js", icon: "Nd", bg: "#339933", color: "#ffffff" },
      { name: "gRPC", icon: "gR", bg: "#244c5a", color: "#ffffff" },
      { name: "Protocol Buffers", icon: "Pb", bg: "#4b5563", color: "#ffffff" },
      { name: "REST APIs", icon: "API", bg: "#374151", color: "#ffffff" },
      { name: "WebSockets", icon: "Ws", bg: "#0f766e", color: "#ffffff" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", icon: "Pg", bg: "#336791", color: "#ffffff" },
      { name: "SQLite", icon: "Sq", bg: "#003b57", color: "#ffffff" },
      { name: "MongoDB", icon: "Mg", bg: "#47a248", color: "#ffffff" },
      { name: "Redis", icon: "Rd", bg: "#dc382d", color: "#ffffff" },
    ],
  },
  {
    label: "Cloud & Tools",
    items: [
      { name: "AWS", icon: "AWS", bg: "#ff9900", color: "#111111" },
      { name: "Google Cloud", icon: "GCP", bg: "#4285f4", color: "#ffffff" },
      { name: "Docker", icon: "Dk", bg: "#2496ed", color: "#ffffff" },
      { name: "Git", icon: "Gt", bg: "#f05032", color: "#ffffff" },
      { name: "GitHub", icon: "Gh", bg: "#111111", color: "#ffffff" },
      { name: "Postman", icon: "Pm", bg: "#ff6c37", color: "#ffffff" },
    ],
  },
];

function useFade(delay = 0, rootMargin = "-60px") {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setOn(true), delay);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, rootMargin]);

  return [
    ref,
    {
      opacity: on ? 1 : 0,
      transform: on ? "none" : "translateY(24px)",
      transition: "opacity 0.65s ease, transform 0.65s ease",
    },
  ];
}

function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, style] = useFade(index * 80);
  const linked = Boolean(project.url);
  const Row = linked ? "a" : "div";

  return (
    <div ref={ref} style={style}>
      <Row
        className="project-row"
        {...(linked
          ? { href: project.url, target: "_blank", rel: "noreferrer" }
          : {})}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          padding: "40px 0",
          textDecoration: "none",
          color: "inherit",
          borderBottom: "1px solid #f3f4f6",
          cursor: linked ? "pointer" : "default",
        }}
      >
        <div
          className="project-row-inner"
          style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}
        >
          <span
            className="project-number"
            style={{
              fontSize: "0.7rem",
              color: "#d1d5db",
              fontWeight: 600,
              paddingTop: "6px",
              minWidth: "24px",
              letterSpacing: "0.04em",
            }}
          >
            {project.num}
          </span>

          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: "10px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    color: "#111",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {project.name}
                </h3>
                {project.detail ? (
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      color: "#9ca3af",
                    }}
                  >
                    {project.detail}
                  </p>
                ) : null}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {project.year ? (
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "#d1d5db",
                      fontWeight: 500,
                    }}
                  >
                    {project.year}
                  </span>
                ) : null}
                {linked ? (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: `1px solid ${hovered ? "#111" : "#e5e7eb"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                      background: hovered ? "#111" : "transparent",
                      color: hovered ? "#fff" : "#9ca3af",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                ) : null}
              </div>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#4b5563",
                lineHeight: 1.8,
                marginBottom: "16px",
                maxWidth: "600px",
              }}
            >
              {project.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    padding: "3px 10px",
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    color: "#6b7280",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
}

function SkillGroup({ label, items, index }) {
  const [ref, style] = useFade(index * 70);

  return (
    <div ref={ref} style={style}>
      <p
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#111",
          marginBottom: 16,
        }}
      >
        {label}
      </p>
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((item) => (
          <div
            key={item.name}
            style={{
              fontSize: "0.9rem",
              color: "#4b5563",
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid #e5e7eb",
              background: "#fcfcfd",
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                minWidth: 26,
                height: 26,
                borderRadius: 7,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
                background: item.bg,
                color: item.color,
                border: "1px solid rgba(0,0,0,0.06)",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [heroRef, heroStyle] = useFade(0, "0px");
  const [aboutRef, aboutStyle] = useFade(0);
  const [aboutRef2, aboutStyle2] = useFade(100);
  const [workRef, workStyle] = useFade(0);
  const [skillRef, skillStyle] = useFade(0);
  const [ctaRef, ctaStyle] = useFade(0);

  return (
    <>
      <Analytics />
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid #f3f4f6"
            : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="header-shell"
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "0 32px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            className="brand-name"
            href="#"
            style={{
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "-0.02em",
              color: "#111",
            }}
          >
            Saugat Adhikari
          </a>
          <nav
            className="top-nav"
            style={{ display: "flex", gap: "28px", alignItems: "center" }}
          >
            {[
              ["About", "#about"],
              ["Work", "#work"],
              ["Skills", "#skills"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  color: "#6b7280",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main
        className="page-shell"
        style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px" }}
      >
        <section
          className="hero-section"
          style={{
            minHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: 80,
            paddingBottom: 60,
            borderBottom: "1px solid #f3f4f6",
          }}
        >
          <div ref={heroRef} style={heroStyle}>
            <div
              className="hero-layout"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) 360px",
                alignItems: "center",
                gap: 48,
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "#6b7280",
                    marginBottom: 32,
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    padding: "6px 14px",
                    borderRadius: 100,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#22c55e",
                    }}
                  />
                  Open to roles · graduating May 2027
                </div>
                <h1
                  className="hero-name"
                  style={{
                    fontSize: "clamp(3.6rem, 8vw, 6.4rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.05,
                    color: "#111",
                    marginBottom: 28,
                  }}
                >
                  Full-stack
                  <br />
                  <span style={{ color: "#9ca3af" }}>developer.</span>
                </h1>
                <div className="hero-inline-image-wrap">
                  <img
                    className="hero-image"
                    src={profileImage}
                    alt="Saugat Adhikari"
                    style={{
                      width: 260,
                      height: 260,
                      borderRadius: "50%",
                      objectFit: "contain",
                      background: "#f9fafb",
                      border: "3px solid #e5e7eb",
                      boxShadow: "0 12px 36px rgba(17, 24, 39, 0.08)",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "#4b5563",
                    lineHeight: 1.75,
                    maxWidth: 520,
                    marginBottom: 40,
                  }}
                >
                  I&apos;m{" "}
                  <strong style={{ color: "#111", fontWeight: 600 }}>
                    Saugat Adhikari
                  </strong>
                  , a computer science student at the University of Louisiana
                  Monroe. I build full-stack software in Go and React, from
                  real-time services to the tools I use myself.
                </p>
                <div
                  className="hero-cta"
                  style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
                >
                  <a
                    href="#work"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#111",
                      color: "#fff",
                      padding: "13px 26px",
                      borderRadius: 10,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.82")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    See my work
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href={resumePdf}
                    download="SaugatAdhikariResume.pdf"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#fff",
                      color: "#374151",
                      padding: "13px 26px",
                      borderRadius: 10,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      border: "1px solid #e5e7eb",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#9ca3af")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#e5e7eb")
                    }
                  >
                    Download Resume
                  </a>
                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#fff",
                      color: "#374151",
                      padding: "13px 26px",
                      borderRadius: 10,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      border: "1px solid #e5e7eb",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#9ca3af")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#e5e7eb")
                    }
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div
                className="hero-image-wrap"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <img
                  className="hero-image"
                  src={profileImage}
                  alt="Saugat Adhikari"
                  style={{
                    width: 340,
                    height: 340,
                    borderRadius: "50%",
                    objectFit: "contain",
                    background: "#f9fafb",
                    border: "3px solid #e5e7eb",
                    boxShadow: "0 12px 36px rgba(17, 24, 39, 0.08)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="section-block"
          style={{ padding: "100px 0", borderBottom: "1px solid #f3f4f6" }}
        >
          <p
            ref={aboutRef}
            style={{
              ...aboutStyle,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: 40,
            }}
          >
            About
          </p>
          <div
            ref={aboutRef2}
            style={{
              ...aboutStyle2,
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: 56,
            }}
            className="about-grid"
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  color: "#111",
                }}
              >
                I build systems that have to hold up in real use.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <p
                style={{
                  fontSize: "0.925rem",
                  color: "#4b5563",
                  lineHeight: 1.85,
                }}
              >
                I&apos;m finishing a B.S. in Computer Science at the University
                of Louisiana Monroe in May 2027, with a 3.97 GPA. Coursework
                includes artificial intelligence, data structures and
                algorithms, files and databases, and operating systems.
              </p>
              <p
                style={{
                  fontSize: "0.925rem",
                  color: "#4b5563",
                  lineHeight: 1.85,
                }}
              >
                Most of that work is a Go service behind a React or React
                Native client: live location streaming, a job tracker wired to
                Gmail and Gemini, and a Git-like CLI. I&apos;m also an AWS
                Certified AI Practitioner.
              </p>
              <div
                className="edu-stats"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 12,
                  paddingTop: 8,
                }}
              >
                {[
                  ["School", "University of Louisiana Monroe"],
                  ["Degree", "B.S. Computer Science"],
                  ["GPA", "3.97 / 4.0"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      padding: "12px 14px",
                      background: "#fcfcfd",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#9ca3af",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        color: "#111",
                        lineHeight: 1.4,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="about-links"
                style={{ display: "flex", gap: 20, paddingTop: 8 }}
              >
                {[
                  ["Email", LINKS.email],
                  ["LinkedIn", LINKS.linkedin],
                  ["GitHub", LINKS.github],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noreferrer" })}
                    style={{
                      fontSize: "0.83rem",
                      fontWeight: 600,
                      color: "#111",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                      textDecorationColor: "#e5e7eb",
                      transition: "text-decoration-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecorationColor = "#111")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecorationColor = "#e5e7eb")
                    }
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="section-block"
          style={{ padding: "100px 0", borderBottom: "1px solid #f3f4f6" }}
        >
          <div
            className="work-head"
            ref={workRef}
            style={{
              ...workStyle,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9ca3af",
              }}
            >
              Selected Work
            </p>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "#9ca3af",
                display: "flex",
                alignItems: "center",
                gap: 5,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
            >
              More on GitHub
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div style={{ borderTop: "1px solid #f3f4f6" }}>
            {PROJECTS.map((project, i) => (
              <ProjectRow key={project.name} project={project} index={i} />
            ))}
          </div>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginTop: 56,
              marginBottom: 8,
            }}
          >
            Hackathons
          </p>
          <div style={{ borderTop: "1px solid #f3f4f6" }}>
            {HACKATHONS.map((project, i) => (
              <ProjectRow key={project.name} project={project} index={i} />
            ))}
          </div>
        </section>

        <section
          id="skills"
          className="section-block"
          style={{ padding: "100px 0", borderBottom: "1px solid #f3f4f6" }}
        >
          <p
            ref={skillRef}
            style={{
              ...skillStyle,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: 48,
            }}
          >
            Skills
          </p>
          <div
            className="skills-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "40px 32px",
            }}
          >
            {SKILLS.map((group, index) => (
              <SkillGroup
                key={group.label}
                label={group.label}
                items={group.items}
                index={index}
              />
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="section-block"
          style={{ padding: "100px 0" }}
        >
          <div ref={ctaRef} style={ctaStyle}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9ca3af",
                marginBottom: 24,
              }}
            >
              Contact
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "#111",
                marginBottom: 20,
              }}
            >
              Let&apos;s build
              <br />
              <span style={{ color: "#9ca3af" }}>something great.</span>
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6b7280",
                lineHeight: 1.75,
                maxWidth: 420,
                marginBottom: 40,
              }}
            >
              Open to new-grad roles and internships. The fastest way to
              reach me is email.
            </p>
            <div
              className="contact-actions"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              {[
                { label: "Email", href: LINKS.email, primary: true },
                { label: "LinkedIn", href: LINKS.linkedin, primary: false },
                { label: "GitHub", href: LINKS.github, primary: false },
              ].map(({ label, href, primary }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noreferrer" })}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "12px 22px",
                    borderRadius: 10,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    background: primary ? "#111" : "#fff",
                    color: primary ? "#fff" : "#374151",
                    border: primary ? "1px solid #111" : "1px solid #e5e7eb",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = primary ? "0.82" : "1";
                    if (!primary) {
                      e.currentTarget.style.borderColor = "#9ca3af";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    if (!primary) {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                    }
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid #f3f4f6" }}>
        <div
          className="footer-shell"
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "28px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span
            style={{ fontSize: "0.78rem", color: "#d1d5db", fontWeight: 500 }}
          >
            © 2026 Saugat Adhikari - Monroe, Louisiana
          </span>
          <div className="footer-links" style={{ display: "flex", gap: 20 }}>
            {[
              ["Email", LINKS.email],
              ["GitHub", LINKS.github],
              ["LinkedIn", LINKS.linkedin],
              ["Instagram", LINKS.instagram],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noreferrer" })}
                style={{
                  fontSize: "0.78rem",
                  color: "#9ca3af",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
