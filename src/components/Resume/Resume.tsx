"use client";

import React from "react";
import styles from "./Resume.module.css";
import resumeData from "@/data/resume.json";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function dateRange(start?: string, end?: string): string {
  return formatDate(start) + " - " + formatDate(end);
}


// ── Types ─────────────────────────────────────────────────────────────────────

type ResumeData = {
  basics: {
    name: string;
    label: string;
    email?: string;
    phone?: string;
    url?: string;
    summary?: string;
    location?: { city?: string; region?: string; countryCode?: string };
    profiles?: { network: string; username: string; url: string }[];
  };
  work?: { name: string; position: string; location?: string; startDate?: string; endDate?: string; summary?: string; highlights?: string[]; keywords?: string[] }[];
  education?: { institution: string; area: string; studyType: string; startDate?: string; endDate?: string; score?: string; courses?: string[] }[];
  skills?: { name: string; keywords: string[] }[];
  projects?: { name: string; description?: string; url?: string; startDate?: string; endDate?: string; entity?: string; highlights?: string[]; keywords?: string[] }[];
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Resume() {
  const { basics, work, education, skills, projects } = resumeData as ResumeData;
  const githubProfile = basics.profiles?.find((p) => p.network.toLowerCase() === "github");

  return (
    <div className={styles.wrapper}>
      <div className={styles.viewerContainer}>

        {/* Top Bar */}
        <div className={styles.viewerHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.icon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </span>
            <span className={styles.headerTitle}>Resume</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.openText}>Open in new tab</span>
            <a href={basics.url || "#"} className={styles.iconLink} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Viewer Body */}
        <div className={styles.viewerBody}>
          <div className={styles.paper}>

            {/* Resume Header */}
            <header className={styles.resumeHeader}>
              <h1 className={styles.name}>
                {basics.name}{" "}
                <span className={styles.subtitle}>— {basics.label}</span>
              </h1>
              <div className={styles.contactInfo}>
                {githubProfile && (
                  <a href={githubProfile.url} target="_blank" rel="noopener noreferrer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    {" "}github.com/{githubProfile.username}
                  </a>
                )}
                {basics.url && (
                  <a href={basics.url} target="_blank" rel="noopener noreferrer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    {" "}{basics.url.replace(/^https?:\/\//, "")}
                  </a>
                )}
                {basics.email && (
                  <span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    {" "}{basics.email}
                  </span>
                )}
                {basics.location && (
                  <span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {" "}{basics.location.city}, {basics.location.region}
                  </span>
                )}
              </div>
            </header>

            {/* Work Experience */}
            {work && work.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Work Experience</h2>
                {work.map((job, i) => (
                  <div className={styles.entry} key={i}>
                    <div className={styles.entryHeader}>
                      <h3 className={styles.entryTitle}>{job.position}</h3>
                      <span className={styles.entryDate}>{dateRange(job.startDate, job.endDate)}</span>
                    </div>
                    <div className={styles.entrySubtitle}>{job.name}{job.location ? " • " + job.location : ""}</div>
                    {job.highlights && job.highlights.length > 0 && (
                      <ul className={styles.entryList}>
                        {job.highlights.map((h, j) => <li key={j}>{h}</li>)}
                      </ul>
                    )}
                    {job.keywords && job.keywords.length > 0 && (
                      <div className={styles.badges}>
                        {job.keywords.map((kw, k) => <span key={k}>{kw}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Projects</h2>
                {projects.map((proj, i) => (
                  <div className={styles.entry} key={i}>
                    <div className={styles.entryHeader}>
                      <h3 className={styles.entryTitle}>
                        {proj.url ? <a href={proj.url} target="_blank" rel="noopener noreferrer">{proj.name}</a> : proj.name}
                      </h3>
                      {(proj.startDate || proj.endDate) && (
                        <span className={styles.entryDate}>{dateRange(proj.startDate, proj.endDate)}</span>
                      )}
                    </div>
                    {proj.entity && <div className={styles.entrySubtitle}>{proj.entity}</div>}
                    {proj.description && <p style={{ margin: "4px 0 8px", fontSize: "0.85rem", opacity: 0.8 }}>{proj.description}</p>}
                    {proj.highlights && proj.highlights.length > 0 && (
                      <ul className={styles.entryList}>
                        {proj.highlights.map((h, j) => <li key={j}>{h}</li>)}
                      </ul>
                    )}
                    {proj.keywords && proj.keywords.length > 0 && (
                      <div className={styles.badges}>
                        {proj.keywords.map((kw, k) => <span key={k}>{kw}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Education</h2>
                {education.map((edu, i) => (
                  <div className={styles.entry} key={i}>
                    <div className={styles.entryHeader}>
                      <h3 className={styles.entryTitle}>{edu.studyType} in {edu.area}</h3>
                      <span className={styles.entryDate}>{dateRange(edu.startDate, edu.endDate)}</span>
                    </div>
                    <div className={styles.entrySubtitle}>
                      {edu.institution}{edu.score ? " • GPA: " + edu.score : ""}
                    </div>
                    {edu.courses && edu.courses.length > 0 && (
                      <ul className={styles.entryList}>
                        {edu.courses.map((c, j) => <li key={j}>{c}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                {skills.map((skill, i) => (
                  <div className={styles.skillCategory} key={i}>
                    <strong>{skill.name}:</strong>
                    <div className={styles.badges}>
                      {skill.keywords.map((kw, j) => <span key={j}>{kw}</span>)}
                    </div>
                  </div>
                ))}
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
