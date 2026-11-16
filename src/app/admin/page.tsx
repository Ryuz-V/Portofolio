"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import styles from "./admin.module.css";
import dashStyles from "@/components/DashboardGrid/DashboardGrid.module.css";

interface FeedPost {
  id: number;
  title: string;
  date: string;
  langs: string[];
  image: string | null;
  soundcloud?: string | null;
  body: string | null;
  quote: string | null;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getTodayFormatted = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");

  // Feeds data
  const { data: feeds, mutate } = useSWR<FeedPost[]>("/api/feeds", fetcher);

  // Form state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getTodayFormatted());
  const [langEN, setLangEN] = useState(true);
  const [langID, setLangID] = useState(true);
  const [body, setBody] = useState("");
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState("");
  const [soundcloud, setSoundcloud] = useState("");

  // Upload & UI status
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check login from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("ryuzv_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("ryuzv_admin_auth", "true");
      } else {
        setAuthError(data.error || "Password salah!");
      }
    } catch {
      setAuthError("Gagal menghubungi server");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ryuzv_admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDate(getTodayFormatted());
    setLangEN(true);
    setLangID(true);
    setBody("");
    setQuote("");
    setImage("");
    setSoundcloud("");
  };

  // Image upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
        setStatusMessage({ type: "success", text: "Gambar berhasil diunggah!" });
      } else {
        setStatusMessage({ type: "error", text: data.error || "Gagal mengunggah gambar" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Terjadi kesalahan saat upload" });
    } finally {
      setIsUploading(false);
    }
  };

  // Submit create or edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatusMessage({ type: "error", text: "Judul feed wajib diisi!" });
      return;
    }

    const langs: string[] = [];
    if (langEN) langs.push("EN");
    if (langID) langs.push("ID");
    if (langs.length === 0) langs.push("EN");

    setIsSubmitting(true);
    setStatusMessage(null);

    const payload = {
      id: editingId,
      title: title.trim(),
      date: date.trim(),
      langs,
      image: image.trim() || null,
      soundcloud: soundcloud.trim() || null,
      body: body.trim() || null,
      quote: quote.trim() || null,
    };

    try {
      const isEdit = editingId !== null;
      const res = await fetch("/api/feeds", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await mutate();
        setStatusMessage({
          type: "success",
          text: isEdit ? "Feed berhasil diperbarui!" : "Feed baru berhasil dipublikasikan!",
        });
        resetForm();
        if (isEdit) {
          setActiveTab("manage");
        }
      } else {
        setStatusMessage({ type: "error", text: data.error || "Gagal menyimpan feed" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan feed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit existing
  const handleStartEdit = (post: FeedPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setDate(post.date);
    setLangEN(post.langs.includes("EN"));
    setLangID(post.langs.includes("ID"));
    setBody(post.body || "");
    setQuote(post.quote || "");
    setImage(post.image || "");
    setSoundcloud(post.soundcloud || "");
    setActiveTab("create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete existing
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah kamu yakin ingin menghapus feed ini?")) return;

    try {
      const res = await fetch(`/api/feeds?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await mutate();
        setStatusMessage({ type: "success", text: "Feed berhasil dihapus!" });
      } else {
        setStatusMessage({ type: "error", text: data.error || "Gagal menghapus feed" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Terjadi kesalahan saat menghapus feed" });
    }
  };

  // Download backup JSON
  const handleDownloadBackup = () => {
    if (!feeds) return;
    const blob = new Blob([JSON.stringify(feeds, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feeds-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Render 1: Lock Screen ──────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className={styles.adminWrapper}>
        <div className={styles.lockScreen}>
          <div className={styles.lockCard}>
            <div className={styles.lockIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00bbfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className={styles.lockTitle}>Ryuz-V // Secret Admin</h1>
            <p className={styles.lockSubtitle}>
              Halaman rahasia untuk mengelola dan mempublikasikan feed.
            </p>

            {authError && <div className={styles.errorMessage}>{authError}</div>}

            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="adminPassword">Kunci Akses / Password</label>
                <input
                  id="adminPassword"
                  type="password"
                  className={styles.input}
                  placeholder="Masukkan password admin..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>

              <button type="submit" className={styles.primaryBtn} disabled={authLoading}>
                {authLoading ? "Memverifikasi..." : "Masuk ke Admin Console →"}
              </button>
            </form>

            <div style={{ marginTop: "1.5rem" }}>
              <Link href="/" style={{ color: "#71717a", fontSize: "0.8rem", textDecoration: "none" }}>
                ← Kembali ke Portofolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Render 2: Admin Dashboard ──────────────────────────────────────────────
  const activeLangs = [];
  if (langEN) activeLangs.push("EN");
  if (langID) activeLangs.push("ID");

  const soundcloudEmbedPreview = soundcloud
    ? soundcloud.includes("w.soundcloud.com/player")
      ? soundcloud
      : `https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloud)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false`
    : "";

  return (
    <div className={styles.adminWrapper}>
      <div className={styles.container}>

        {/* Dashboard Header */}
        <header className={styles.dashHeader}>
          <div>
            <h1 className={styles.dashTitle}>
              Feed Console
            </h1>
          </div>

          <div className={styles.headerActions}>
            <Link href="/" className={styles.secondaryBtn}>
              Lihat Website
            </Link>
            <button type="button" onClick={handleDownloadBackup} className={styles.secondaryBtn} title="Download Backup JSON">
              Backup JSON
            </button>
            <button type="button" onClick={handleLogout} className={styles.dangerBtn}>
              Keluar
            </button>
          </div>
        </header>

        {/* Status Notification */}
        {statusMessage && (
          <div className={statusMessage.type === "success" ? styles.successMessage : styles.errorMessage}>
            <span>{statusMessage.text}</span>
            <button
              onClick={() => setStatusMessage(null)}
              style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer", fontWeight: "bold" }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === "create" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("create")}
          >
            {editingId ? "Edit Feed Post" : "Buat Feed Baru"}
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === "manage" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("manage")}
          >
            Kelola Feed ({feeds?.length || 0})
          </button>
        </div>

        {/* TAB 1: CREATE / EDIT FEED */}
        {activeTab === "create" && (
          <div className={styles.createGrid}>

            {/* Left Column: Form */}
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>
                {editingId ? `Edit Post #${editingId}` : "Form Posting Feed Baru"}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="feedTitle">Judul Feed *</label>
                  <input
                    id="feedTitle"
                    type="text"
                    className={styles.input}
                    placeholder="Contoh: Chilling in the Forest..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="feedDate">Tanggal Posting</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      id="feedDate"
                      type="text"
                      className={styles.input}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      onClick={() => setDate(getTodayFormatted())}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Hari Ini
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Bahasa (Language Tags)</label>
                  <div className={styles.langCheckboxes}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={langEN}
                        onChange={(e) => setLangEN(e.target.checked)}
                      />
                      EN (English)
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={langID}
                        onChange={(e) => setLangID(e.target.checked)}
                      />
                      ID (Indonesia)
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="feedBody">Isi Cerita / Teks Feed</label>
                  <textarea
                    id="feedBody"
                    className={styles.textarea}
                    placeholder="Tuliskan cerita, update status, atau progress project kamu..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="feedQuote">Kutipan / Quote (Opsional)</label>
                  <input
                    id="feedQuote"
                    type="text"
                    className={styles.input}
                    placeholder="Contoh: The sadness of having lost everything..."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Gambar Feed (Opsional)</label>
                  <div className={styles.uploadBox}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className={styles.fileInput}
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <div
                      className={styles.uploadTrigger}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {isUploading ? "Mengunggah gambar..." : "Klik untuk Upload Gambar dari Komputer"}
                    </div>
                    <div style={{ textAlign: "center", color: "#555", fontSize: "0.75rem" }}>— atau masukkan link URL —</div>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="https://... atau /images/..."
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>

                  {image && (
                    <div className={styles.imagePreview}>
                      <img src={image} alt="Preview" />
                      <button
                        type="button"
                        className={styles.removeImageBtn}
                        onClick={() => setImage("")}
                        title="Hapus Gambar"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="feedSoundcloud">Musik SoundCloud (Opsional)</label>
                  <input
                    id="feedSoundcloud"
                    type="text"
                    className={styles.input}
                    placeholder="Paste link lagu SoundCloud (misal: https://soundcloud.com/...)"
                    value={soundcloud}
                    onChange={(e) => setSoundcloud(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "1.5rem" }}>
                  <button type="submit" className={styles.primaryBtn} disabled={isSubmitting || isUploading}>
                    {isSubmitting ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Publikasikan Feed"}
                  </button>
                  {editingId && (
                    <button type="button" className={styles.secondaryBtn} onClick={resetForm}>
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Right Column: Live Preview */}
            <div className={styles.previewSticky}>
              <div className={styles.previewHeading}>
                <span>Live Card Preview</span>
              </div>

              <article className={dashStyles.card} style={{ margin: "0 auto" }}>
                <div className={dashStyles.cardHeader}>
                  <div className={dashStyles.headerLeft}>
                    <span className={dashStyles.headerDot} />
                    <div className={dashStyles.headerTitleGroup}>
                      <span className={dashStyles.cardTitle}>{title || "Judul Postingan Preview"}</span>
                      <span className={dashStyles.cardDate}>{date}</span>
                    </div>
                  </div>

                  <div className={dashStyles.headerRight}>
                    <div className={dashStyles.langToggle}>
                      {(activeLangs.length > 0 ? activeLangs : ["EN"]).map((lang, idx) => (
                        <span
                          key={lang}
                          className={`${dashStyles.langTag} ${idx === 0 ? dashStyles.langTagActive : ""}`}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {image && (
                  <div className={dashStyles.thumbnail}>
                    <img
                      src={image}
                      alt={title || "Preview"}
                      className={dashStyles.thumbImg}
                      style={{ width: "100%", height: "270px", objectFit: "cover" }}
                    />
                  </div>
                )}

                {(body || quote) && (
                  <div className={dashStyles.content}>
                    {body && <p className={dashStyles.body}>{body}</p>}
                    {quote && <blockquote className={dashStyles.quote}>{quote}</blockquote>}
                  </div>
                )}

                {soundcloud && soundcloudEmbedPreview && (
                  <div className={dashStyles.soundcloudEmbed}>
                    <iframe
                      src={soundcloudEmbedPreview}
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                    />
                  </div>
                )}
              </article>
            </div>

          </div>
        )}

        {/* TAB 2: MANAGE FEEDS */}
        {activeTab === "manage" && (
          <div className={styles.manageList}>
            {!feeds || feeds.length === 0 ? (
              <div className={styles.emptyState}>Belum ada feed yang dipublikasikan.</div>
            ) : (
              feeds.map((post) => (
                <div key={post.id} className={styles.feedItemRow}>
                  <div className={styles.feedItemInfo}>
                    <div className={styles.feedItemHeader}>
                      <span style={{ color: "#00bbfa", fontSize: "0.8rem", fontWeight: "bold" }}>
                        #{post.id}
                      </span>
                      <h3 className={styles.feedItemTitle}>{post.title}</h3>
                      <span className={styles.feedItemDate}>{post.date}</span>
                    </div>
                    <div className={styles.feedItemSnippet}>
                      {post.body || post.quote || "(Hanya media gambar/musik)"}
                    </div>
                  </div>

                  <div className={styles.feedItemActions}>
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      onClick={() => handleStartEdit(post)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={styles.dangerBtn}
                      onClick={() => handleDelete(post.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

