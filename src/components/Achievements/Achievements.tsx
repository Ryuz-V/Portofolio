"use client";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./Achievements.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
    image: "/file/cer_4.pdf"
  },
  {
    id: "bust-study",
    title: "Bust study",
    date: "Aug 7, 2026",
    image: "/file/cer_5.pdf"
  },
  {
    id: "landscape-study",
    title: "Landscape study (Mountain)",
    date: "Jul 24, 2026",
    image: "/file/cer_6.pdf"
  }
];

export default function Achievements() {
  const [lang, setLang] = useState<"EN" | "ID">("EN");

  const introText = lang === "EN" 
    ? (
      <>
        This section showcases the awards I’ve received from seminars and competitions I’ve participated in from high school to the present.
        <br/>
        <br/>Tap the card to view full details and documentation.
      </>
    ) : (
      <>
        Bagian ini menampilkan penghargaan yang telah saya terima dari seminar dan kompetisi yang pernah saya ikuti, mulai dari masa SMA hingga saat ini.
        <br/>
        <br/>Ketuk kartu tersebut untuk melihat detail lengkap dan dokumentasinya.
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
              <Document 
                file={item.image} 
                className={styles.pdfWrapper}
                loading={<div style={{ padding: '20px', color: '#a1a1aa', fontSize: '0.8rem' }}>Loading PDF...</div>}
              >
                <Page 
                  pageNumber={1} 
                  renderTextLayer={false} 
                  renderAnnotationLayer={false}
                />
              </Document>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

