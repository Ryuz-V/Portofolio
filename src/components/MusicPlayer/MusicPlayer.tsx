"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./MusicPlayer.module.css";
import Script from "next/script";

const tracks = [
  { id: 1, title: "I Will Protect You -Reload-", scUrl: "https://soundcloud.com/persona3ost/because-i-will-protect-you-reload-persona-3-reload-ost?si=aae3f0d0ae8043118a51758ee3206eae&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" },
  { id: 2, title: "Memories of the school -Reload-", scUrl: "https://soundcloud.com/persona3ost/memories-of-school-persona-3-reload-ost?si=28cd26dc11e642b78ade0f094fecc9a3&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" },
  { id: 3, title: "Paulownia Mall -Reload-", scUrl: "https://soundcloud.com/lego-nightwing/persona-3-reload-paulownia?si=62337ab22ff14e169bdcc8f7a0cf1a77&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" },
  { id: 4, title: "Color Your Night", scUrl: "https://soundcloud.com/asfsdfgj/color-your-night?si=85bb58e4c8eb41bfad3d9ca9d5443ef3&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" },
  { id: 5, title: "Deep Breath Deep Breath -Reincarnation Reload-", scUrl: "https://soundcloud.com/persona3ost/deep-breath-deep-breath-reincarnation-reload-persona-3-reload-ost?si=37c9855beaa04fdaa6beca14858a847a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" },
  { id: 6, title: "Iwatodai Dorm -Reload-", scUrl: "https://soundcloud.com/lego-nightwing/persona-3-reload-iwatodai-dorm?si=dc2a795a6a194267af5a95af20bf2831&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" },
  { id: 7, title: "Memories of you -Reload-", scUrl: "https://soundcloud.com/persona3ost/memories-of-you-kimi-no-kioku-reload-persona-3-reload-ost?si=c0c6e04a442a4a9ba7fab2d741f17d77&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" },
  { id: 8, title: "Memories of you -Reload--Instrumental", scUrl: "https://soundcloud.com/animetypejoker/memories-of-you-reload-instrumental?si=2d93bd0c96aa4faeb6139aa805b49282&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" }
];

// Fallback track if fake URLs fail (menggunakan lagu bebas royalti acak di SC agar widget tidak error saat testing)
const defaultScUrl = "https://soundcloud.com/nocopyrightsounds/alan-walker-fade-ncs-release";

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // State untuk auto-hide judul musik
  const [isHovered, setIsHovered] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const widgetRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeSrc = useRef<string>("");

  useEffect(() => {
    // Pilih lagu acak saat mount (untuk menghindari SSR Hydration Mismatch)
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)] || tracks[0];
    setCurrentTrack(randomTrack);
    
    // Set URL iframe di sebuah ref yang tidak berubah meskipun currentTrack state berubah
    // Hal ini agar iframe TIDAK reload ulang yang akan memutuskan koneksi Widget API.
    iframeSrc.current = `https://w.soundcloud.com/player/?url=${encodeURIComponent(randomTrack.scUrl)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`;
    setIsMounted(true);
  }, []);

  // Fungsi mengkoneksikan SoundCloud Widget API dengan iframe kita
  const initSoundCloudWidget = () => {
    if (typeof window !== "undefined" && (window as any).SC && iframeRef.current && !widgetRef.current) {
      const widget = (window as any).SC.Widget(iframeRef.current);
      widgetRef.current = widget;

      // Event listener saat dimainkan
      widget.bind((window as any).SC.Widget.Events.PLAY, () => {
        setIsPlaying(true);
      });

      // Event listener saat di-pause
      widget.bind((window as any).SC.Widget.Events.PAUSE, () => {
        setIsPlaying(false);
      });

      // Saat selesai, acak lagu berikutnya
      // Memuat memakai widget.load() TANPA me-reload iframe
      widget.bind((window as any).SC.Widget.Events.FINISH, () => {
        const nextTrack = tracks[Math.floor(Math.random() * tracks.length)] || tracks[0];
        setCurrentTrack(nextTrack);
        widget.load(nextTrack.scUrl, {
          auto_play: true,
          hide_related: true,
          show_comments: false,
          show_user: false,
          show_reposts: false,
          visual: false
        });
      });
    }
  };

  useEffect(() => {
    if (isMounted) {
      initSoundCloudWidget();
    }

  }, [isMounted]);

  const togglePlay = () => {
    if (!widgetRef.current) return;
    widgetRef.current.toggle();
  };

  // Effect untuk mengontrol kapan Title Musik muncul/menghilang (Auto-hide logic)
  useEffect(() => {
    if (isPlaying) {
      setIsInfoVisible(true); // Akan muncul saat pertama kali memutar atau mouse masuk
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      
      // Jika kursor TIDAK ada di atas pemutar musik, mulai hitung mundur 3 detik untuk di-hide
      if (!isHovered) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsInfoVisible(false);
        }, 3000); 
      }
    } else {
      // Saat Pause, info hanya muncul kalau mouse ditahan di sana (Hovered)
      setIsInfoVisible(isHovered);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    }

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isPlaying, isHovered]);

  if (!isMounted) return null;
  return (
    <>
      <Script 
        src="https://w.soundcloud.com/player/api.js" 
        onLoad={initSoundCloudWidget}
      />

      <div
        className={styles.playerContainer}
        onClick={togglePlay}
      >
        <iframe
          ref={iframeRef}
          className={styles.hiddenIframe}
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={iframeSrc.current}
        ></iframe>

        {/* Kontainer Teks Hitam (Merespon State auto-hide isInfoVisible) */}
        <div className={`${styles.textContainer} ${isInfoVisible ? styles.textVisible : ""}`}>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeWrapper}>
              <p className={styles.scrollText}>
                {currentTrack?.title} by ATLUS Sound Team from Persona 3 Reload. All rights reserved to ATLUS / SEGA.
              </p>
              {/* Duplikat elemen teks untuk menciptakan trik Infinite Seamless Scroll */}
              <p className={styles.scrollText}>
                {currentTrack?.title} by ATLUS Sound Team from Persona 3 Reload. All rights reserved to ATLUS / SEGA.
              </p>
            </div>
          </div>
          <span className={styles.playStatus}>
            {isPlaying ? "(Now Playing)" : "(Paused)"}
          </span>
        </div>

        {/* Piringan Hitam Vinyl (Gambar WebP) */}
        <div
          className={styles.vinylContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img 
            src="/icon/Vinyl.webp" 
            alt="Vinyl Player Record"
            className={`${styles.vinylImage} ${isPlaying ? styles.spinning : ""}`} 
          />
          
          {/* Not Balok Animasi (Hanya muncul saat main) */}
          {isPlaying && (
            <>
              <div className={`${styles.musicNote} ${styles.note1}`}>♪</div>
              <div className={`${styles.musicNote} ${styles.note2}`}>♫</div>
              <div className={`${styles.musicNote} ${styles.note3}`}>♪</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
