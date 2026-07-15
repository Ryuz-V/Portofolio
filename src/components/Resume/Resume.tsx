"use client";

import React from "react";
import styles from "./Resume.module.css";

export default function Resume() {
  return (
    <div className={styles.wrapper}>
      {/* ── Document Viewer Container ── */}
      <div className={styles.viewerContainer}>
        
        {/* ── Top Bar / Header ── */}
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
            <a href="#" className={styles.iconLink} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* ── Viewer Body (Scrollable) ── */}
        <div className={styles.viewerBody}>
          
          {/* ── The "Paper" ── */}
          <div className={styles.paper}>
            
            {/* Resume Header */}
            <header className={styles.resumeHeader}>
              <h1 className={styles.name}>Your Name <span className={styles.subtitle}>— Fullstack Developer & Designer</span></h1>
              <div className={styles.contactInfo}>
                <a href="#"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> github.com/username</a>
                <a href="#"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> yourwebsite.com</a>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> email@example.com</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Jakarta, Indonesia</span>
              </div>
            </header>

            {/* Work Experience */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Work Experience</h2>
              
              <div className={styles.entry}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Frontend Engineer</h3>
                  <span className={styles.entryDate}>Jan 2024 - Present</span>
                </div>
                <div className={styles.entrySubtitle}>Tech Company • Remote / Indonesia</div>
                <ul className={styles.entryList}>
                  <li>Developed and maintained user interfaces for high-traffic web applications using React and Next.js.</li>
                  <li>Improved website performance and SEO scores, resulting in a 20% increase in organic traffic.</li>
                  <li>Collaborated closely with designers to implement pixel-perfect, accessible UI components.</li>
                </ul>
                <div className={styles.badges}>
                  <span>React</span><span>Next.js</span><span>TypeScript</span><span>Tailwind CSS</span>
                </div>
              </div>

              <div className={styles.entry}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Freelance Web Developer</h3>
                  <span className={styles.entryDate}>Mar 2022 - Dec 2023</span>
                </div>
                <div className={styles.entrySubtitle}>Self-employed • Jakarta</div>
                <ul className={styles.entryList}>
                  <li>Built responsive landing pages and portfolio websites for local clients and businesses.</li>
                  <li>Created custom Discord bots and integrated third-party APIs for community servers.</li>
                </ul>
                <div className={styles.badges}>
                  <span>HTML/CSS</span><span>JavaScript</span><span>Python</span><span>Node.js</span>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Projects</h2>
              
              <div className={styles.entry}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Melodix Discord Bot</h3>
                  <span className={styles.entryDate}>2023 - Present</span>
                </div>
                <div className={styles.entrySubtitle}>Personal Project</div>
                <ul className={styles.entryList}>
                  <li>A feature-rich music bot serving multiple Discord servers with high-quality audio streaming.</li>
                  <li>Implemented slash commands and an interactive UI using Discord.py.</li>
                </ul>
                <div className={styles.badges}>
                  <span>Python</span><span>Discord.py</span><span>yt-dlp</span>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              
              <div className={styles.entry}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Bachelor's degree in Computer Science</h3>
                  <span className={styles.entryDate}>2019 - 2023</span>
                </div>
                <div className={styles.entrySubtitle}>University Name • Indonesia</div>
              </div>
            </section>

            {/* Skills */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Skills</h2>
              
              <div className={styles.skillCategory}>
                <strong>Programming & Scripting:</strong>
                <div className={styles.badges}>
                  <span>TypeScript</span><span>JavaScript</span><span>Python</span><span>Go</span><span>HTML</span><span>CSS</span>
                </div>
              </div>
              
              <div className={styles.skillCategory}>
                <strong>Tools & Frameworks:</strong>
                <div className={styles.badges}>
                  <span>React</span><span>Next.js</span><span>Git</span><span>VS Code</span><span>Figma</span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}