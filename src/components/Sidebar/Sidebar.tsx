"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();
  const [activeLang, setActiveLang] = useState('en');

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        <div className={styles.avatar}>
          <img
            src="https://github.com/Ryuz-V.png"
            alt="Profile Picture"
            className={styles.avatarImage}
          />
        </div>
        <div className={styles.nameRow}>
          <h1 className={styles.name}>Jathniel Urdha</h1>
        </div>
        <p className={styles.username}>@Ryuz-V</p>
      </div>
      <nav className={styles.navigation}>
        <Link href="/" className={`${styles.navItem} ${pathname === "/" ? styles.activeNav : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>
          Feed
        </Link>
        <Link href="/about" className={`${styles.navItem} ${pathname === "/about" ? styles.activeNav : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          About
        </Link>
        <Link href="/achievements" className={`${styles.navItem} ${pathname === "/achievements" ? styles.activeNav : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          Achievements
        </Link>
        <Link href="/code" className={`${styles.navItem} ${pathname === "/code" ? styles.activeNav : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          Project
        </Link>
        <Link href="/resume" className={`${styles.navItem} ${pathname === "/resume" ? styles.activeNav : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
          Resume
        </Link>

        <Link href="/memory" className={`${styles.navItem} ${pathname === "/memory" ? styles.activeNav : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
          Memory
        </Link>
        <Link href="/contact" className={`${styles.navItem} ${pathname === "/contact" ? styles.activeNav : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          Social
        </Link>
        <div className={styles.divider}></div>
      </nav>
      <div className={styles.footer}>
        <p>COPYRIGHT © {new Date().getFullYear()}</p>
        <p>Ryuz-V. All rights reserved.</p>
      </div>
    </aside>
  );
}