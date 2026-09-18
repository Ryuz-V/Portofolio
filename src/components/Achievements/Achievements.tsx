"use client";

import React, { useState } from "react";
import styles from "./Achievements.module.css";

type Achievement = {
  id: string;
  title: string;
  date: string;
  image: string;
};

const achievements: Achievement[] = [
  {
    id: "sighting-study",
    title: "Sighting drawing study",
    date: "Aug 21, 2026",
    image: "/images/unnamed.webp"
  },
  {
    id: "bust-study",
    title: "Bust study",
    date: "Aug 7, 2026",
    image: "/images/unnamed.webp"
  },
  {
    id: "landscape-study",
    title: "Landscape study (Mountain)",
    date: "Jul 24, 2026",
    image: "/images/unnamed.webp"
  }
];

export default function Achievements() {
  const [lang, setLang] = useState<"EN" | "ID">("EN");

  const introText = lang === "EN" 
    ? (
      <>
        I started drawing recently and I'm not very good at it yet, but with more practice I would like to eventually be able to illustrate by myself the universe and stories I have in mind.<br/>
        Be indulgent, I'm doing my best!
      </>
    ) : (
      <>
        Saya baru-baru ini mulai menggambar dan saya belum terlalu mahir, tetapi dengan lebih banyak latihan, saya ingin pada akhirnya dapat mengilustrasikan sendiri alam semesta dan cerita yang ada di pikiran saya.<br/>
        Harap maklum, saya melakukan yang terbaik!
      </>
    );

  return (
    <div className={styles.wrapper}>
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
            <p>{introText}</p>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {achievements.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </span>
              <span className={styles.cardTitle}>
                {item.title} &middot; {item.date}
              </span>
            </div>
            <div className={styles.cardBody}>
              <img src={item.image} alt={item.title} className={styles.cardImg} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
