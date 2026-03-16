import { useEffect, useRef, useState } from "react";
import "./App.css";
import profileImage from "./assets/profile.jpeg";
import resumePdf from "./assets/SaugatAdhikariResumeV2.pdf";
import { Analytics } from "@vercel/analytics/react";

const LINKS = {
  github: "https://github.com/adk-saugat",
  linkedin: "https://linkedin.com/in/sau-gat",
  instagram: "https://instagram.com/adhikari_saugat_",
};

const FALLBACK_PROJECTS = [
  {
    num: "01",
    name: "GharFix",
    tagline: "Home services, simplified.",
    desc: "A mobile-first platform that connects homeowners with trusted local service professionals. Focused on transparency, real reviews, and on-demand booking - built end-to-end in TypeScript.",
    stack: ["TypeScript", "React Native", "Node.js", "PostgreSQL"],
    url: "https://github.com/adk-saugat/GharFix",
    year: "2024",
  },
  {
    num: "02",
    name: "Stash",
    tagline: "Version control for everyone.",
    desc: "A lightweight CLI tool for file versioning and team collaboration. Snapshot your work, track changes, and sync with teammates - all from the terminal, built in Go for speed and portability.",
    stack: ["Go", "CLI", "File I/O"],
    url: "https://github.com/adk-saugat/Stash",
    year: "2024",
  },
  {
    num: "03",
    name: "Mini-LMS",
    tagline: "Teaching and learning, structured.",
    desc: "A full-stack learning management system with role-based dashboards for instructors and students. Clean REST API backed by Go and PostgreSQL, with a React frontend.",
    stack: ["React", "Go", "PostgreSQL", "REST API"],
    url: "https://github.com/adk-saugat/Mini-LMS",
    year: "2023",
  },
  {
    num: "04",
    name: "Gradual",
    tagline: "Your academic second brain.",
    desc: "A personal tracker and journal designed for college students to manage assignments, deadlines, study reflections, and project progress - all in one focused place.",
    stack: ["TypeScript", "React", "Tailwind CSS"],
    url: "https://github.com/adk-saugat/Gradual",
    year: "2023",
  },
];

const GITHUB_USERNAME = "adk-saugat";
const MAX_DISPLAY_PROJECTS = 6;
const PINNED_REPO_NAMES = ["GharFix", "Stash", "Mini-LMS", "Gradual"];
const PINNED_REPO_NAME_SET = new Set(
  PINNED_REPO_NAMES.map((repoName) => repoName.toLowerCase()),
);

function mapReposToProjects(repos) {
  return repos.slice(0, MAX_DISPLAY_PROJECTS).map((repo, index) => {
    const stack = [repo.language, ...(repo.topics ?? []).slice(0, 3)].filter(
      Boolean,
    );
    const description =
      repo.description ?? "Open-source project built and maintained on GitHub.";

    return {
      num: String(index + 1).padStart(2, "0"),
      name: repo.name,
      tagline:
        description.length > 58
          ? `${description.slice(0, 58)}...`
          : description,
      desc: description,
      stack: stack.length > 0 ? stack : ["GitHub"],
      url: repo.html_url,
      year: String(new Date(repo.updated_at).getFullYear()),
    };
  });
}

const SKILLS = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", icon: "TS", bg: "#3178c6", color: "#ffffff" },
      { name: "JavaScript", icon: "JS", bg: "#f7df1e", color: "#111111" },
      { name: "Go", icon: "Go", bg: "#00add8", color: "#ffffff" },
      { name: "Python", icon: "Py", bg: "#3776ab", color: "#ffffff" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", icon: "Re", bg: "#61dafb", color: "#111111" },
      { name: "React Native", icon: "RN", bg: "#111111", color: "#ffffff" },
      { name: "HTML & CSS", icon: "HC", bg: "#e34f26", color: "#ffffff" },
      { name: "Tailwind", icon: "Tw", bg: "#06b6d4", color: "#ffffff" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: "Nd", bg: "#339933", color: "#ffffff" },
      { name: "Go (Gin)", icon: "Gi", bg: "#00add8", color: "#ffffff" },
      { name: "REST APIs", icon: "API", bg: "#4b5563", color: "#ffffff" },
      { name: "PostgreSQL", icon: "Pg", bg: "#336791", color: "#ffffff" },
    ],
  },
  {
    label: "Tooling",
    items: [
      { name: "Git", icon: "Gt", bg: "#f05032", color: "#ffffff" },
      { name: "Docker", icon: "Dk", bg: "#2496ed", color: "#ffffff" },
      { name: "Linux", icon: "Lx", bg: "#111111", color: "#ffffff" },
      { name: "Figma", icon: "Fg", bg: "#a259ff", color: "#ffffff" },
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

  return (
    <div ref={ref} style={style}>
      <a
        className="project-row"
        href={project.url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          padding: "40px 0",
          textDecoration: "none",
          color: "inherit",
          borderBottom: "1px solid #f3f4f6",
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
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#d1d5db",
                    fontWeight: 500,
                  }}
                >
                  {project.year}
                </span>
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
      </a>
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
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [repoCount, setRepoCount] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGithubProjects() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          return;
        }

        const repos = await response.json();
        const publicRepos = repos.filter((repo) => !repo.fork);
        const pinnedRepos = publicRepos.filter((repo) =>
          PINNED_REPO_NAME_SET.has(repo.name.toLowerCase()),
        );
        setRepoCount(pinnedRepos.length);

        const mappedProjects = mapReposToProjects(pinnedRepos);
        if (mappedProjects.length > 0) {
          setProjects(mappedProjects);
        }
      } catch {
        // Keep fallback projects if GitHub API is unavailable.
      }
    }

    loadGithubProjects();
    return () => controller.abort();
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
                  Available for opportunities
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
                  , a developer based in Monroe, Louisiana. I build clean,
                  purposeful software - from mobile platforms to developer
                  tools.
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
                    download
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
                I build things that solve real problems.
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
                I&apos;m a full-stack developer who enjoys the entire process -
                from sketching a system design to shipping a polished user
                interface. I care about writing code that is readable,
                maintainable, and genuinely useful.
              </p>
              <p
                style={{
                  fontSize: "0.925rem",
                  color: "#4b5563",
                  lineHeight: 1.85,
                }}
              >
                My work spans developer tooling, web apps, mobile platforms, and
                APIs. I&apos;m comfortable across the stack - equally at home in
                a Go backend as in a React frontend.
              </p>
              <div
                className="about-links"
                style={{ display: "flex", gap: 20, paddingTop: 8 }}
              >
                {[
                  ["LinkedIn", LINKS.linkedin],
                  ["GitHub", LINKS.github],
                  ["Instagram", LINKS.instagram],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
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
              {`Pinned projects on GitHub${repoCount ? ` (${repoCount})` : ""}`}
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
            {projects.map((project, i) => (
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
              Open to freelance work, full-time roles, and interesting
              collaborations. Drop me a message - I usually reply quickly.
            </p>
            <div
              className="contact-actions"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              {[
                { label: "LinkedIn", href: LINKS.linkedin, primary: true },
                { label: "GitHub", href: LINKS.github, primary: false },
                { label: "Instagram", href: LINKS.instagram, primary: false },
              ].map(({ label, href, primary }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
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
              ["GitHub", LINKS.github],
              ["LinkedIn", LINKS.linkedin],
              ["Instagram", LINKS.instagram],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
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
