"use client";

import React, { useState } from "react";
import styles from "./Code.module.css";

// ─── PROJECT DATA ──────────────────────────────────────────────────────────────
const projects = [
  {
    id: "portfolio",
    name: "portfolio",
    subtitle: "Personal Website & Portfolio",
    tag: "Live",
    type: "code",
    language: "tsx",
    code: `// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'github.com',
      'flagcdn.com',
    ],
  },
};

export default config;`,
    color: "#7c3aed",
  },
  {
    id: "discord-bot",
    name: "melodix",
    subtitle: "Discord Music Bot",
    tag: "Preview",
    type: "code",
    language: "py",
    code: `# bot.py — Melodix Discord Bot
import discord
from discord.ext import commands
import yt_dlp as youtube_dl

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(
  command_prefix='!',
  intents=intents
)

@bot.command()
async def play(ctx, *, query):
  """Stream audio from YouTube."""
  voice = ctx.author.voice
  if not voice:
    return await ctx.send('Join a VC first.')
  vc = await voice.channel.connect()
  await ctx.send(f'🎵 Playing: {query}')`,
    color: "#3b82f6",
  },
  {
    id: "ryuz-api",
    name: "ryuz-api",
    subtitle: "REST API with Go & Fiber",
    tag: "WIP",
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
    color: "#10b981",
  },
  {
    id: "jukendo-club",
    name: "jukendo-club",
    subtitle: "Club Website / Ippon!",
    tag: "Preview",
    type: "preview",
    previewBg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    previewContent: "Jukendo & Tankendo Club\nWebsite",
    color: "#f59e0b",
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
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className={styles.card}>
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
        {project.type === "code" ? (
          <div className={styles.codeBlock}>
            {project.code!.split("\n").map((line, i) =>
              renderCodeLine(line, project.language!, i)
            )}
          </div>
        ) : (
          <div
            className={styles.previewBlock}
            style={{ background: project.previewBg }}
          >
            <div className={styles.previewText}>{project.previewContent}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Code() {
  const [lang, setLang] = useState<"EN" | "ID">("EN");

  const aboutText =
    lang === "EN"
      ? {
          p1: "This section contains most of the coding projects I worked on, along with explanations, images, examples, and sometimes live demos.",
          p2: "Use the sidebar to navigate to project details. The featured projects are my personal favorites and the ones I'm most proud of.",
          p3: "The feed below is an aggregation of hand-picked projects. Click on any card to view details.",
        }
      : {
          p1: "Bagian ini berisi sebagian besar proyek coding yang pernah saya kerjakan, lengkap dengan penjelasan, gambar, contoh, dan terkadang demo langsung.",
          p2: "Gunakan sidebar untuk melihat detail proyek. Proyek unggulan adalah favorit pribadi saya dan yang paling membanggakan.",
          p3: "Feed di bawah adalah kumpulan proyek pilihan. Klik kartu mana saja untuk melihat detailnya.",
        };

  return (
    <div className={styles.wrapper}>
      {/* ── Kotak khusus untuk pilihan bahasa di atas (Seperti Gambar 3) ── */}
      <div className={styles.topBar}>
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

      {/* ── About Panel ── */}
      <div className={styles.aboutPanel}>
        <div className={styles.aboutHeader}>
          <span className={styles.aboutIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
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
            <svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg" className={styles.illSvg}>
              {/* Monitor */}
              <rect x="20" y="10" width="80" height="60" rx="4" fill="none" stroke="rgba(124,58,237,0.6)" strokeWidth="2"/>
              <rect x="20" y="10" width="80" height="12" rx="4" fill="rgba(124,58,237,0.3)"/>
              <line x1="58" y1="70" x2="58" y2="85" stroke="rgba(124,58,237,0.5)" strokeWidth="2"/>
              <rect x="44" y="85" width="28" height="4" rx="2" fill="rgba(124,58,237,0.4)"/>
              {/* Code lines on monitor */}
              <rect x="28" y="28" width="40" height="2" rx="1" fill="rgba(124,58,237,0.8)"/>
              <rect x="28" y="34" width="28" height="2" rx="1" fill="rgba(59,130,246,0.8)"/>
              <rect x="28" y="40" width="50" height="2" rx="1" fill="rgba(59,130,246,0.6)"/>
              <rect x="28" y="46" width="35" height="2" rx="1" fill="rgba(124,58,237,0.7)"/>
              <rect x="28" y="52" width="42" height="2" rx="1" fill="rgba(59,130,246,0.5)"/>
              {/* Keyboard */}
              <rect x="10" y="92" width="100" height="50" rx="6" fill="none" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5"/>
              {[0,1,2].map(row => (
                [0,1,2,3,4,5,6,7,8].map(col => (
                  <rect
                    key={`${row}-${col}`}
                    x={18 + col*11}
                    y={99 + row*13}
                    width="8" height="8"
                    rx="2"
                    fill="rgba(255,255,255,0.07)"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="0.5"
                  />
                ))
              ))}
              {/* Server towers right side */}
              <rect x="130" y="60" width="40" height="80" rx="3" fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5"/>
              {[0,1,2,3,4].map(i => (
                <rect key={i} x="134" y={68 + i*14} width="32" height="10" rx="2" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8"/>
              ))}
              <circle cx="158" cy="73" r="2" fill="rgba(16,185,129,0.8)"/>
              <circle cx="158" cy="87" r="2" fill="rgba(16,185,129,0.6)"/>
              <circle cx="158" cy="101" r="2" fill="rgba(245,158,11,0.8)"/>
              {/* Cables */}
              <path d="M100 115 Q115 115 115 130 Q115 150 130 150" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
              <path d="M100 125 Q120 125 120 140 Q120 155 130 155" stroke="rgba(59,130,246,0.4)" strokeWidth="1" fill="none" strokeDasharray="3 2"/>
              {/* Floppy disks */}
              <rect x="155" y="148" width="20" height="18" rx="2" fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="1"/>
              <rect x="159" y="150" width="8" height="6" rx="1" fill="rgba(59,130,246,0.2)"/>
              {/* Floating particles */}
              <circle cx="190" cy="30" r="3" fill="rgba(124,58,237,0.5)"/>
              <circle cx="205" cy="55" r="2" fill="rgba(59,130,246,0.4)"/>
              <circle cx="195" cy="80" r="1.5" fill="rgba(16,185,129,0.5)"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Project Grid ── */}
      <div className={styles.grid}>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}