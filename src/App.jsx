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
          borderBottom: "1px solid var(--line)",
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
              color: "var(--faint)",
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
                    color: "var(--text)",
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
                      color: "var(--muted)",
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
                      color: "var(--faint)",
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
                    border: `1px solid ${hovered ? "var(--text)" : "var(--line)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    background: hovered ? "var(--text)" : "transparent",
                    color: hovered ? "var(--bg)" : "var(--muted)",
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
                color: "var(--body)",
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
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    color: "var(--muted-2)",
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
          color: "var(--text)",
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
              color: "var(--body)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid var(--line)",
              background: "var(--surface)",
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

function fileToBase64(file) {
  return file.arrayBuffer().then((buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    const size = 0x8000;
    for (let index = 0; index < bytes.length; index += size) {
      binary += String.fromCharCode(...bytes.subarray(index, index + size));
    }
    return btoa(binary);
  });
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  const [resumeHref, setResumeHref] = useState(resumePdf);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [adminFile, setAdminFile] = useState(null);
  const [adminStatus, setAdminStatus] = useState("");
  const [adminBusy, setAdminBusy] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#101114" : "#ffffff");
  }, [theme]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/resume", { method: "HEAD", signal: controller.signal })
      .then((response) => {
        if (response.ok) setResumeHref("/api/resume");
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  async function uploadResume(event) {
    event.preventDefault();
    if (!adminFile) {
      setAdminStatus("Choose a PDF to upload.");
      return;
    }
    setAdminBusy(true);
    setAdminStatus("");
    try {
      const pdf = await fileToBase64(adminFile);
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: adminCode, pdf }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setAdminStatus(body.error || "Upload failed.");
        return;
      }
      setResumeHref(`/api/resume?v=${Date.now()}`);
      setAdminCode("");
      setAdminFile(null);
      setAdminStatus("Resume updated. Download now serves this PDF.");
    } catch {
      setAdminStatus("Upload failed. Deploy this site on Vercel and try again.");
    } finally {
      setAdminBusy(false);
    }
  }

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
          background: scrolled ? "var(--header)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--line)"
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
              color: "var(--text)",
            }}
          >
            Saugat Adhikari
          </a>
          <div className="header-actions">
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
                    color: "var(--muted-2)",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted-2)")
                  }
                >
                  {label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="theme-toggle"
              aria-label={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              onClick={() =>
                setTheme((current) => (current === "dark" ? "light" : "dark"))
              }
            >
              {theme === "dark" ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
                </svg>
              )}
            </button>
          </div>
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
            borderBottom: "1px solid var(--line)",
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
                    color: "var(--muted-2)",
                    marginBottom: 32,
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
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
                    color: "var(--text)",
                    marginBottom: 28,
                  }}
                >
                  Backend
                  <br />
                  <span style={{ color: "var(--muted)" }}>developer.</span>
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
                      background: "var(--surface)",
                      border: "3px solid var(--line)",
                      boxShadow: "0 12px 32px rgba(28, 27, 25, 0.08)",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--body)",
                    lineHeight: 1.75,
                    maxWidth: 520,
                    marginBottom: 40,
                  }}
                >
                  I&apos;m{" "}
                  <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                    Saugat Adhikari
                  </strong>
                  , a computer science student at the University of Louisiana
                  Monroe. I build backend systems in Go, from real-time
                  services to the tools I use myself, and reach for React when
                  a product needs an interface.
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
                      background: "var(--primary-bg)",
                      color: "var(--primary-text)",
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
                    href={resumeHref}
                    download="SaugatAdhikariResume.pdf"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "transparent",
                      color: "var(--secondary-text)",
                      padding: "13px 26px",
                      borderRadius: 10,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      border: "1px solid var(--line)",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "var(--muted)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "var(--line)")
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
                      background: "transparent",
                      color: "var(--secondary-text)",
                      padding: "13px 26px",
                      borderRadius: 10,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      border: "1px solid var(--line)",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "var(--muted)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "var(--line)")
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
                    background: "var(--surface)",
                    border: "3px solid var(--line)",
                    boxShadow: "0 12px 32px rgba(28, 27, 25, 0.08)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="section-block"
          style={{ padding: "100px 0", borderBottom: "1px solid var(--line)" }}
        >
          <p
            ref={aboutRef}
            style={{
              ...aboutStyle,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
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
                  color: "var(--text)",
                }}
              >
                I build systems that have to hold up in real use.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <p
                style={{
                  fontSize: "0.925rem",
                  color: "var(--body)",
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
                  color: "var(--body)",
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
                      border: "1px solid var(--line)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      background: "var(--surface)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        color: "var(--text)",
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
                      color: "var(--text)",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                      textDecorationColor: "var(--line)",
                      transition: "text-decoration-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecorationColor = "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecorationColor = "var(--line)")
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
          style={{ padding: "100px 0", borderBottom: "1px solid var(--line)" }}
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
                color: "var(--muted)",
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
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                gap: 5,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
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
          <div style={{ borderTop: "1px solid var(--line)" }}>
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
              color: "var(--muted)",
              marginTop: 56,
              marginBottom: 8,
            }}
          >
            Hackathons
          </p>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {HACKATHONS.map((project, i) => (
              <ProjectRow key={project.name} project={project} index={i} />
            ))}
          </div>
        </section>

        <section
          id="skills"
          className="section-block"
          style={{ padding: "100px 0", borderBottom: "1px solid var(--line)" }}
        >
          <p
            ref={skillRef}
            style={{
              ...skillStyle,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
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
                color: "var(--muted)",
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
                color: "var(--text)",
                marginBottom: 20,
              }}
            >
              Let&apos;s build
              <br />
              <span style={{ color: "var(--muted)" }}>something great.</span>
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--muted-2)",
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
                    background: primary ? "var(--primary-bg)" : "transparent",
                    color: primary ? "var(--primary-text)" : "var(--secondary-text)",
                    border: primary ? "1px solid var(--primary-bg)" : "1px solid var(--line)",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = primary ? "0.82" : "1";
                    if (!primary) {
                      e.currentTarget.style.borderColor = "var(--muted)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    if (!primary) {
                      e.currentTarget.style.borderColor = "var(--line)";
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

      <footer style={{ borderTop: "1px solid var(--line)" }}>
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
            style={{ fontSize: "0.78rem", color: "var(--faint)", fontWeight: 500 }}
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
                  color: "var(--muted)",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              className="admin-button"
              onClick={() => {
                setAdminStatus("");
                setAdminOpen(true);
              }}
            >
              Admin
            </button>
          </div>
        </div>
      </footer>
      {adminOpen ? (
        <div
          className="admin-backdrop"
          onClick={() => {
            if (!adminBusy) setAdminOpen(false);
          }}
        >
          <form
            className="admin-panel"
            onClick={(event) => event.stopPropagation()}
            onSubmit={uploadResume}
          >
            <h2>Update resume</h2>
            <p>Enter your admin code, then choose the PDF visitors should download.</p>
            <label>
              Code
              <input
                type="password"
                name="code"
                autoComplete="current-password"
                value={adminCode}
                onChange={(event) => setAdminCode(event.target.value)}
                required
              />
            </label>
            <label>
              PDF
              <input
                type="file"
                name="resume"
                accept="application/pdf,.pdf"
                onChange={(event) =>
                  setAdminFile(event.target.files?.[0] ?? null)
                }
                required
              />
            </label>
            {adminStatus ? <p className="admin-status">{adminStatus}</p> : null}
            <div className="admin-actions">
              <button
                type="button"
                onClick={() => setAdminOpen(false)}
                disabled={adminBusy}
              >
                Cancel
              </button>
              <button type="submit" disabled={adminBusy}>
                {adminBusy ? "Uploading" : "Upload"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
