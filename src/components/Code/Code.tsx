"use client";

import React, { useState } from "react";
import styles from "./Code.module.css";

// ─── PROJECT DATA ──────────────────────────────────────────────────────────────
export type Project = {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  color: string;
  thumbnail: string;
  type?: "code" | "preview";
  code?: string;
  language?: string;
  description: { EN: string; ID: string };
  tags: string[];
  github: {
    repo: string;
    docs: string;
    language: string;
    commits: string;
    stargazers: string;
    created: string;
  };
  personalComment: { EN: string; ID: string };
  liveDemoUrl?: string;
};

const projects: Project[] = [
  {
    id: "Lacelux",
    name: "Lacelux",
    subtitle: "Shoe Store Website",
    tag: "Website",
    color: "#7c3aed",
    thumbnail: "/images/unnamed.webp",
    description: {
      EN: "This is my personal website and portfolio, designed to showcase my projects, skills, and experience as a developer. Built with modern web technologies, it focuses on performance, accessibility, and a clean user interface.",
      ID: "Ini adalah situs web dan portofolio pribadi saya, dirancang untuk menampilkan proyek, keterampilan, dan pengalaman saya sebagai pengembang. Dibangun dengan teknologi web modern, situs ini berfokus pada performa, aksesibilitas, dan antarmuka pengguna yang bersih."
    },
    tags: ["web", "typescript", "react"],
    github: {
      repo: "Ryuz-V/Portofolio",
      docs: "N/A",
      language: "TypeScript",
      commits: "N/A",
      stargazers: "N/A",
      created: "N/A"
    },
    personalComment: {
      EN: "I built this portfolio to have a central place for my work. I chose to build it from scratch to have full control over the design and functionality.",
      ID: "Saya membangun portofolio ini agar memiliki tempat terpusat untuk karya saya. Saya memilih untuk membangunnya dari awal agar memiliki kontrol penuh atas desain dan fungsionalitas."
    },
    liveDemoUrl: "https://example.com"
  },
  {
    id: "discord-bot",
    name: "Discord Bot",
    subtitle: "Discord Music Bot",
    tag: "Automation",
    color: "#3b82f6",
    thumbnail: "/images/unnamed.webp",
    description: {
      EN: "Melodix is a robust Discord music bot written in Python using discord.py and yt-dlp. It provides high-quality audio streaming from various sources with a rich set of playback commands.",
      ID: "Melodix adalah bot musik Discord tangguh yang ditulis dengan Python menggunakan discord.py dan yt-dlp. Bot ini menyediakan streaming audio berkualitas tinggi dari berbagai sumber dengan serangkaian perintah pemutaran yang lengkap."
    },
    tags: ["python", "discord", "bot"],
    github: {
      repo: "Ryuz-V/melodix",
      docs: "N/A",
      language: "Python",
      commits: "N/A",
      stargazers: "N/A",
      created: "N/A"
    },
    personalComment: {
      EN: "Creating a music bot was a fun challenge to understand asynchronous programming in Python and interacting with voice channels.",
      ID: "Membuat bot musik adalah tantangan yang menyenangkan untuk memahami pemrograman asinkron dalam Python dan berinteraksi dengan saluran suara."
    }
  },
  {
    id: "ryuz-api",
    name: "ryuz-api",
    subtitle: "REST API with Go & Fiber",
    tag: "WIP",
    color: "#10b981",
    thumbnail: "/images/unnamed.webp",
    type: "code",
    language: "go",
    code: `// main.go — Ryuz API
package main

import (
  "github.com/gofiber/fiber/v2"
  "github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
  app := fiber.New()
  app.Use(cors.New())

  app.Get("/health", func(c *fiber.Ctx) error {
    return c.JSON(fiber.Map{
      "status":  "ok",
      "version": "1.0.0",
    })
  })

  app.Listen(":3001")
}`,
    description: {
      EN: "A fast and lightweight REST API built with Go and the Fiber framework. It serves as the backend for several of my personal projects, handling user authentication, data storage, and business logic.",
      ID: "REST API yang cepat dan ringan dibangun dengan Go dan kerangka kerja Fiber. Ini berfungsi sebagai backend untuk beberapa proyek pribadi saya, menangani autentikasi pengguna, penyimpanan data, dan logika bisnis."
    },
    tags: ["go", "api", "backend"],
    github: {
      repo: "Ryuz-V/ryuz-api",
      docs: "N/A",
      language: "Go",
      commits: "N/A",
      stargazers: "N/A",
      created: "N/A"
    },
    personalComment: {
      EN: "Go's performance and simplicity make it my go-to choice for building APIs. Fiber provides an Express-like experience which made the transition very smooth.",
      ID: "Performa dan kesederhanaan Go menjadikannya pilihan utama saya untuk membangun API. Fiber memberikan pengalaman mirip Express yang membuat transisi menjadi sangat lancar."
    }
  },
  {
    id: "jukendo-club",
    name: "jukendo-club",
    subtitle: "Club Website / Ippon!",
    tag: "Preview",
    color: "#f59e0b",
    thumbnail: "/images/unnamed.webp",
    description: {
      EN: "A promotional and informational website for a local Jukendo and Tankendo club. Features include class schedules, membership information, and a gallery of events.",
      ID: "Situs web promosi dan informasi untuk klub Jukendo dan Tankendo lokal. Fiturnya meliputi jadwal kelas, informasi keanggotaan, dan galeri acara."
    },
    tags: ["web", "design", "frontend"],
    github: {
      repo: "Ryuz-V/jukendo-club",
      docs: "N/A",
      language: "HTML/CSS",
      commits: "N/A",
      stargazers: "N/A",
      created: "N/A"
    },
    personalComment: {
      EN: "This project allowed me to work closely with a community group to meet their specific needs for an online presence.",
      ID: "Proyek ini memungkinkan saya bekerja sama erat dengan kelompok komunitas untuk memenuhi kebutuhan spesifik mereka akan kehadiran daring."
    }
  },
];

// ─── CODE BLOCK WITH SYNTAX COLOURS ───────────────────────────────────────────
function renderCodeLine(line: string, lang: string, i: number) {
  const keyword =
    lang === "py"
      ? /\b(import|from|def|async|await|if|not|return|class)\b/g
      : lang === "go"
      ? /\b(package|import|func|return|var|const|type|struct|interface)\b/g
      : /\b(import|export|default|from|const|let|var|type|interface|return|async|await|function)\b/g;

  const comment = /\/\/.*$|#.*$/;
  const string = /"([^"]*)"|'([^']*)'/g;

  if (comment.test(line)) {
    return (
      <div key={i} className={styles.codeLine}>
        <span className={styles.lineNum}>{i + 1}</span>
        <span className={styles.codeComment}>{line}</span>
      </div>
    );
  }

  const parts: React.ReactNode[] = [];
  let last = 0;
  const allMatches: { start: number; end: number; type: string; text: string }[] = [];

  let m: RegExpExecArray | null;
  const kw = new RegExp(keyword.source, "g");
  while ((m = kw.exec(line)) !== null) {
    allMatches.push({ start: m.index, end: m.index + m[0].length, type: "kw", text: m[0] });
  }
  const str = new RegExp(string.source, "g");
  while ((m = str.exec(line)) !== null) {
    allMatches.push({ start: m.index, end: m.index + m[0].length, type: "str", text: m[0] });
  }
  allMatches.sort((a, b) => a.start - b.start);

  for (const match of allMatches) {
    if (match.start < last) continue;
    if (match.start > last) parts.push(<span key={last}>{line.slice(last, match.start)}</span>);
    if (match.type === "kw")
      parts.push(<span key={match.start} className={styles.codeKeyword}>{match.text}</span>);
    else
      parts.push(<span key={match.start} className={styles.codeString}>{match.text}</span>);
    last = match.end;
  }
  if (last < line.length) parts.push(<span key={last}>{line.slice(last)}</span>);

  return (
    <div key={i} className={styles.codeLine}>
      <span className={styles.lineNum}>{i + 1}</span>
      <span>{parts}</span>
    </div>
  );
}

// ─── SINGLE PROJECT CARD ───────────────────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div className={styles.card} onClick={onClick}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        </span>
        <span className={styles.cardName} style={{ color: project.color }}>
          {project.name}
        </span>
        <span className={styles.cardDot}>·</span>
        <span className={styles.cardSubtitle}>{project.subtitle}</span>
        <span className={styles.cardDot}>/</span>
        <span className={styles.cardTag}>{project.tag}</span>
      </div>

      {/* Card Body */}
      <div className={styles.cardBody}>
        {project.type === "code" && project.code && project.language ? (
          <div className={styles.codeBlock}>
            {project.code.split("\n").map((line, i) =>
              renderCodeLine(line, project.language!, i)
            )}
          </div>
        ) : (
          <div className={styles.thumbnailWrapper}>
            <img src={project.thumbnail} alt={project.name} className={styles.thumbnailImg} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PROJECT DETAIL VIEW ───────────────────────────────────────────────────────
function ProjectDetail({ project, lang }: { project: Project; lang: "EN" | "ID" }) {
  const desc = project.description[lang];
  const comment = project.personalComment[lang];

  return (
    <div className={styles.detailContainer}>
      {/* About Box */}
      <div className={styles.detailBox}>
        <div className={styles.boxHeader}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
             <circle cx="12" cy="12" r="10" />
             <line x1="12" y1="16" x2="12" y2="12" />
             <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className={styles.boxTitle}>About</span>
        </div>
        <div className={styles.boxContent}>
          <p className={styles.detailDesc}>{desc}</p>
          <div className={styles.tagList}>
            {project.tags.map(t => (
              <span key={t} className={styles.detailTag}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.twoColumn}>
        {/* GitHub Box */}
        <div className={styles.detailBox}>
          <div className={styles.boxHeader}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <span className={styles.boxTitle}>GitHub</span>
          </div>
          <div className={styles.boxContent}>
            <table className={styles.githubTable}>
              <tbody>
                <tr><td>Repository</td><td className={styles.alignRight}><a href={`https://github.com/${project.github.repo}`} target="_blank" rel="noreferrer" className={styles.link}>{project.github.repo}</a></td></tr>
                <tr><td>Documentation</td><td className={styles.alignRight}>{project.github.docs}</td></tr>
                <tr className={styles.spacer}></tr>
                <tr><td>Language</td><td className={styles.alignRight}>{project.github.language}</td></tr>
                <tr><td>Commits</td><td className={styles.alignRight}>{project.github.commits}</td></tr>
                <tr><td>Stargazers</td><td className={styles.alignRight}>{project.github.stargazers}</td></tr>
                <tr className={styles.spacer}></tr>
                <tr><td>Created</td><td className={styles.alignRight}>{project.github.created}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Preview Box */}
        <div className={styles.detailBox}>
          <div className={styles.boxHeader}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span className={styles.boxTitle}>Preview</span>
          </div>
          <div className={styles.previewImageContent}>
             <img src={project.thumbnail} alt={project.name} className={styles.previewImg} />
          </div>
        </div>
      </div>

      {/* Personal Comment Box */}
      <div className={styles.detailBox}>
        <div className={styles.boxHeader}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
             <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span className={styles.boxTitle}>Personal comment</span>
        </div>
        <div className={styles.boxContent}>
          <p className={styles.detailDesc}>{comment}</p>
        </div>
      </div>

      {/* Live demo Box */}
      <div className={styles.detailBox}>
        <div className={styles.boxHeader}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <span className={styles.boxTitle}>Live demo</span>
        </div>
        <div className={styles.boxContent}>
          {project.liveDemoUrl ? (
            <div className={styles.demoNotice}>
               <span className={styles.demoNoticeTitle}>[Notice]</span>
               <p className={styles.demoNoticeText}>This tile has not been loaded automatically to save up resources.<br/>Click to boot it.</p>
               <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className={styles.bootLink}>Boot Live Demo</a>
            </div>
          ) : (
             <p className={styles.detailDesc}>No live demo available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Code() {
  const [lang, setLang] = useState<"EN" | "ID">("EN");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const aboutText =
    lang === "EN"
      ? {
          p1: "This section showcases most of the projects I’ve worked on, featuring detailed explanations, visual previews, examples, and, when available, live demos. Each project reflects my experience in exploring ideas, solving problems, and turning concepts into functional and engaging digital experiences. From web development and UI/UX design to experimental and personal projects, this collection highlights my process, creativity, and continuous growth as a developer.",
          p2: "This section features some of my standout projects, including personal favorites and work I’m especially proud of. Each one represents my creativity, skills, and the progress I’ve made along the way.",
          p3: "The feed below is an aggregation of hand picked projects. Click on any card to view details.",
        }
      : {
          p1: "Bagian ini menampilkan sebagian besar proyek yang pernah saya kerjakan, lengkap dengan penjelasan terperinci, pratinjau visual, contoh, dan jika tersedia demo langsung. Setiap proyek mencerminkan pengalaman saya dalam mengeksplorasi ide, memecahkan masalah, serta mengubah konsep menjadi pengalaman digital yang fungsional dan menarik. Mulai dari pengembangan web dan desain UI/UX hingga proyek eksperimental dan pribadi, kumpulan ini menyoroti proses kerja, kreativitas, dan perkembangan berkelanjutan saya sebagai seorang pengembang.",
          p2: "Bagian ini menampilkan beberapa proyek unggulan saya, termasuk favorit pribadi dan karya yang sangat saya banggakan. Masing-masing proyek mewakili kreativitas, keterampilan, dan kemajuan yang telah saya capai selama ini.",
          p3: "Umpan di bawah ini merupakan kumpulan proyek yang dipilih secara khusus. Klik kartu mana pun untuk melihat detailnya.",
        };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        {selectedProject && (
          <button className={styles.backButton} onClick={() => setSelectedProject(null)}>
            ← Back to Projects
          </button>
        )}
        <div className={styles.langToggle}>
          <button
            className={`${styles.langBtn} ${lang === "EN" ? styles.langActive : ""}`}
            onClick={() => setLang("EN")}
          >
            EN
          </button>
          <button
            className={`${styles.langBtn} ${lang === "ID" ? styles.langActive : ""}`}
            onClick={() => setLang("ID")}
          >
            ID
          </button>
        </div>
      </div>
      
      {/* ── Content Area ── */}
      {selectedProject ? (
        <ProjectDetail 
          project={selectedProject} 
          lang={lang} 
        />
      ) : (
        <>
          {/* ── About Panel ── */}
          <div className={styles.aboutPanel}>
            <div className={styles.aboutHeader}>
              <span className={styles.aboutIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </span>
              <span className={styles.aboutTitle}>About</span>
            </div>

            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <p>{aboutText.p1}</p>
                <p>{aboutText.p2}</p>
                <p>{aboutText.p3}</p>
              </div>
              {/* Decorative illustration */}
              <div className={styles.aboutIllustration}>
                <img src="/images/tiredzani-zani.gif" alt="illustration" className={styles.illSvg} />
              </div>
            </div>
          </div>

          {/* ── Project Grid ── */}
          <div className={styles.grid}>
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}