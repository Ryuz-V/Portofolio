"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./Achievements.module.css";

const PdfRenderer = dynamic(() => import("./PdfRenderer"), { ssr: false });

const isPdf = (url: string) => url.toLowerCase().endsWith(".pdf");

type Achievement = {
  id: string;
  title: string;
  date: string;
  image: string;
  descriptionEn?: string;
  descriptionId?: string;
  organizer?: string;
  location?: string;
  role?: string;
  topic?: string;
  duration?: string;
  documentation?: string[];
};

const achievements: Achievement[] = [
  {
    id: "azure-ai",
    title: "Preparation Course for Azure AI Fundamentals (AI-900)",
    date: "Fri, Jul 25, 2025",
    image: "/file/cer_4.pdf",
    descriptionEn: "Organized by Mereka Academy in collaboration with Komdigi and Microsoft, a seminar was held for all schools and the general public to discuss the use of Azure AI.",
    descriptionId: "Diselengarakan oleh Mereka Academy dan bekerja sama dengan Komdigi dan Microsoft melakukan seminar untuk seluruh Sekolah dan umum dengan membahas penggunaan Azure AI.",
    organizer: "Mereka Academy,Komdigi,Microsoft",
    location: "Online [Website]",
    role: "Participant",
    topic: "Azure AI Fundamentals (AI-900)",
    duration: "N/A",
  },
  {
    id: "Dilesin-git",
    title: "Dilesen Git For Beginer",
    date: "Oct 27, 2025",
    image: "/file/cer_5.pdf",
    descriptionEn: "This certificate was awarded for participating in the bust study.",
    descriptionId: "Sertifikat ini diberikan karena telah berpartisipasi dalam studi bust.",
    organizer: "Dilesin",
    location: "Online [Zoom]",
    role: "Participant",
    topic: "Git For Beginer",
    duration: "1 H 12 M 21 S",
  },
  {
    id: "jagoan-hosting-2025",
    title: "Jagoan Hosting Infra Competition 2025",
    date: "Dec 6, 2025",
    image: "/file/cer_6.pdf",
    descriptionEn: "This certificate was awarded for participating in the landscape study.",
    descriptionId: "Sertifikat ini diberikan karena telah berpartisipasi dalam studi lanskap.",
    organizer: "Jagoan Hosting",
    location: "N/A",
    role: "Participant",
    topic: "Infra Competition",
  },
  {
    id: "ai-asean",
    title: "AI For Asean",
    date: "Sep 19, 2026",
    image: "/file/cer_7.pdf",
    descriptionEn: "",
    descriptionId: "Ini adalah contoh untuk pencapaian keempat. Silakan perbarui dengan detail yang sebenarnya.",
    organizer: "AI Read ASEAN, ASEAN Foundation",
    location: "Online [Zoom, Webisite]",
    role: "Participant",
    topic: "AI",
    duration: "N/A",
  },
  {
    id: "forum-genre",
    title: "Pelantikan Dan Seminar Forum Genre Kabupaten Banyumas",
    date: "June 21, 2025",
    image: "/images/cer_1.png",
    descriptionEn: "This is a placeholder for the fifth achievement.",
    descriptionId: "Ini adalah contoh untuk pencapaian kelima.",
    organizer: "Nama Penyelenggara",
    location: "Lokasi",
    role: "Participant",
    topic: "Topik",
    duration: "N/A",
  },
  {
    id: "placeholder-6",
    title: "Pencapaian Baru (Contoh 6)",
    date: "TBD",
    image: "/images/cer_2.png",
    descriptionEn: "This is a placeholder for the sixth achievement.",
    descriptionId: "Ini adalah contoh untuk pencapaian keenam.",
    organizer: "Nama Penyelenggara",
    location: "Lokasi",
    role: "Participant",
    topic: "Topik",
    duration: "N/A",
  },
  {
    id: "placeholder-7",
    title: "Pencapaian Baru (Contoh 7)",
    date: "TBD",
    image: "/images/cer_3.png",
    descriptionEn: "This is a placeholder for the seventh achievement.",
    descriptionId: "Ini adalah contoh untuk pencapaian ketujuh.",
    organizer: "Nama Penyelenggara",
    location: "Lokasi",
    role: "Participant",
    topic: "Topik",
    duration: "N/A",
  },
];

export default function Achievements() {
  const [lang, setLang] = useState<"EN" | "ID">("EN");
  const [selected, setSelected] = useState<Achievement | null>(null);

  const introText = lang === "EN"
    ? (
      <>
        This section showcases the awards I’ve received from seminars and competitions I’ve participated in from high school to the present.
        <br />
        <br />Tap the card to view full details and documentation.
      </>
    ) : (
      <>
        Bagian ini menampilkan penghargaan yang telah saya terima dari seminar dan kompetisi yang pernah saya ikuti, mulai dari masa SMA hingga saat ini.
        <br />
        <br />Ketuk kartu tersebut untuk melihat detail lengkap dan dokumentasinya.
      </>
    );

  if (selected) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.topBarDetail}>
          <button className={styles.backBtn} onClick={() => setSelected(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
              <line x1="22" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Achievements
          </button>
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
              <p>{lang === "EN" ? selected.descriptionEn : selected.descriptionId}</p>
            </div>
          </div>
        </div>

        <div className={styles.detailGrid}>
          <div className={styles.descPanel}>
            <div className={styles.panelHeader}>
              <span className={styles.aboutIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <span className={styles.panelTitle}>Description</span>
            </div>
            <div className={styles.panelContent}>
              <div className={styles.descList}>
                <div className={styles.descRow}>
                  <span className={styles.descLabel}>Name</span>
                  <span className={styles.descValue}>{selected.title}</span>
                </div>
                <div className={styles.descRow}>
                  <span className={styles.descLabel}>File</span>
                  <span className={styles.descValue}>N/A</span>
                </div>
                <div className={styles.descRow}>
                  <span className={styles.descLabel}>Date</span>
                  <span className={styles.descValue}>{selected.date}</span>
                </div>
                <div className={styles.descRow}>
                  <span className={styles.descLabel}>Organizer</span>
                  <span className={styles.descValue}>{selected.organizer || "N/A"}</span>
                </div>
                <div className={styles.descRow}>
                  <span className={styles.descLabel}>Location / Platform</span>
                  <span className={styles.descValue}>{selected.location || "N/A"}</span>
                </div>
                <div className={styles.descRow}>
                  <span className={styles.descLabel}>Role</span>
                  <span className={styles.descValue}>{selected.role || "N/A"}</span>
                </div>
                <div className={styles.descRow}>
                  <span className={styles.descLabel}>Topic</span>
                  <span className={styles.descValue}>{selected.topic || "N/A"}</span>
                </div>
                <div className={styles.descRow}>
                  <span className={styles.descLabel}>Duration</span>
                  <span className={styles.descValue}>{selected.duration || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.previewPanel}>
            <div className={styles.panelHeader}>
              <span className={styles.aboutIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </span>
              <span className={styles.panelTitle}>Preview</span>
            </div>
            <div className={styles.previewContent}>
              {isPdf(selected.image) ? (
                <PdfRenderer
                  file={selected.image}
                  className={styles.pdfWrapperDetail}
                  loading={<div style={{ padding: '20px', color: '#a1a1aa', fontSize: '0.8rem' }}>Loading PDF...</div>}
                />
              ) : (
                <img 
                  src={selected.image} 
                  alt={selected.title} 
                  className={styles.pdfWrapperDetail} 
                  style={{ objectFit: 'contain', width: '100%', height: '100%', backgroundColor: 'white' }} 
                />
              )}
            </div>
          </div>
        </div>

        <div className={styles.docPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.aboutIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span className={styles.panelTitle}>Documentation</span>
          </div>
          <div className={styles.panelContent}>
            {selected.documentation && selected.documentation.length > 0 ? (
              <div className={styles.docImages}>
                {selected.documentation.map((img, idx) => (
                  <img key={idx} src={img} alt="Documentation" className={styles.docImg} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyDoc}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" style={{ marginBottom: "4px" }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <p className={styles.noticeTitle}>[Notice]</p>
                <p className={styles.noticeText}>Look's Like I Don't Have Any DOC For This </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
          <div key={item.id} className={styles.card} onClick={() => setSelected(item)}>
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
              {isPdf(item.image) ? (
                <PdfRenderer
                  file={item.image}
                  className={styles.pdfWrapper}
                  loading={<div style={{ padding: '20px', color: '#a1a1aa', fontSize: '0.8rem' }}>Loading PDF...</div>}
                />
              ) : (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className={styles.pdfWrapper} 
                  style={{ objectFit: 'contain', width: '100%', height: '100%', backgroundColor: 'white' }} 
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

