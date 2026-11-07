"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./MusicPlayer.module.css";
import Script from "next/script";

export interface Track {
  id: number;
  title: string;
  scUrl: string;
  vinyl?: string; // Gambar kaset/vinyl untuk lagu ini (opsional per lagu)
}

export interface Album {
  id: number;
  name: string;
  series: string;
  artist: string;
  defaultVinyl: string;
  tracks: Track[];
}

// Album 1: Persona 3 Reload
export const album1Tracks: Track[] = [
  { id: 1, title: "I Will Protect You -Reload-", scUrl: "https://soundcloud.com/persona3ost/because-i-will-protect-you-reload-persona-3-reload-ost?si=aae3f0d0ae8043118a51758ee3206eae&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", vinyl: "/icon/vinyl.webp" },
  { id: 2, title: "Memories of the school -Reload-", scUrl: "https://soundcloud.com/persona3ost/memories-of-school-persona-3-reload-ost?si=28cd26dc11e642b78ade0f094fecc9a3&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", vinyl: "/icon/vinyl.webp" },
  { id: 3, title: "Paulownia Mall -Reload-", scUrl: "https://soundcloud.com/lego-nightwing/persona-3-reload-paulownia?si=62337ab22ff14e169bdcc8f7a0cf1a77&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", vinyl: "/icon/vinyl.webp" },
  { id: 4, title: "Color Your Night", scUrl: "https://soundcloud.com/asfsdfgj/color-your-night?si=85bb58e4c8eb41bfad3d9ca9d5443ef3&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", vinyl: "/icon/vinyl.webp" },
  { id: 5, title: "Deep Breath Deep Breath -Reincarnation Reload-", scUrl: "https://soundcloud.com/persona3ost/deep-breath-deep-breath-reincarnation-reload-persona-3-reload-ost?si=37c9855beaa04fdaa6beca14858a847a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", vinyl: "/icon/vinyl.webp" },
  { id: 6, title: "Iwatodai Dorm -Reload-", scUrl: "https://soundcloud.com/lego-nightwing/persona-3-reload-iwatodai-dorm?si=dc2a795a6a194267af5a95af20bf2831&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", vinyl: "/icon/vinyl.webp" },
  { id: 7, title: "Memories of you -Reload-", scUrl: "https://soundcloud.com/persona3ost/memories-of-you-kimi-no-kioku-reload-persona-3-reload-ost?si=c0c6e04a442a4a9ba7fab2d741f17d77&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", vinyl: "/icon/vinyl.webp" },
  { id: 8, title: "Memories of you -Reload--Instrumental", scUrl: "https://soundcloud.com/animetypejoker/memories-of-you-reload-instrumental?si=2d93bd0c96aa4faeb6139aa805b49282&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", vinyl: "/icon/vinyl.webp" }
];

// Album 2: Konstanta baru kosong dengan isi 8 slot lagu (default kaset: vinyl_2.webp / Persona 5 Royal)
export const album2Tracks: Track[] = [
  { id: 1, title: "MIRROR (instrumental)", scUrl: "https://soundcloud.com/looking_swager_than_don/umbeatable-ost-mirror?in=looking_swager_than_don/sets/unbeatable-ost&si=0b976f30cb9e4c22a056946f9d180d61&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", vinyl: "/icon/vinyl_2.webp" },
  { id: 2, title: "", scUrl: "", vinyl: "/icon/vinyl_2.webp" },
  { id: 3, title: "", scUrl: "", vinyl: "/icon/vinyl_2.webp" },
  { id: 4, title: "", scUrl: "", vinyl: "/icon/vinyl_2.webp" },
  { id: 5, title: "", scUrl: "", vinyl: "/icon/vinyl_2.webp" },
  { id: 6, title: "", scUrl: "", vinyl: "/icon/vinyl_2.webp" },
  { id: 7, title: "", scUrl: "", vinyl: "/icon/vinyl_2.webp" },
  { id: 8, title: "", scUrl: "", vinyl: "/icon/vinyl_2.webp" }
];

export const albums: Album[] = [
  {
    id: 1,
    name: "Persona 3 Reload",
    series: "Persona 3 Reload",
    artist: "ATLUS Sound Team",
    defaultVinyl: "/icon/vinyl.webp",
    tracks: album1Tracks
  },
  {
    id: 2,
    name: "Persona 5 Royal",
    series: "Persona 5 Royal",
    artist: "ATLUS Sound Team",
    defaultVinyl: "/icon/vinyl_2.webp",
    tracks: album2Tracks
  }
];

// Fallback track if needed
const defaultScUrl = "https://soundcloud.com/nocopyrightsounds/alan-walker-fade-ncs-release";

// SVG Icon Musik Bentuk Bulat (Universal Music Note)
const MusicIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

export default function MusicPlayer() {
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const currentAlbum = albums[currentAlbumIndex];

  const [currentTrack, setCurrentTrack] = useState<Track>(() => {
    const list = albums[0].tracks;
    return list[Math.floor(Math.random() * list.length)];
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // State untuk auto-hide judul musik & kontrol tombol bulat
  const [isHovered, setIsHovered] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const widgetRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Ref untuk menghindari stale closure pada SoundCloud widget event listeners
  const currentAlbumIndexRef = useRef(currentAlbumIndex);
  currentAlbumIndexRef.current = currentAlbumIndex;

  const currentTrackRef = useRef(currentTrack);
  currentTrackRef.current = currentTrack;

  const albumsRef = useRef(albums);
  albumsRef.current = albums;

  const iframeSrc = useRef<string>(
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(currentTrack?.scUrl || defaultScUrl)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`
  );

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  // Timer 10 detik agar tombol tidak cepat hilang
  const showControls = () => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
  };

  const startControlsHideTimer = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    // Minimal 10 detik sebelum tombol bulat menghilang
    controlsTimeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 10000);
  };

  const loadAndPlayTrack = (track: Track, autoPlay: boolean = true) => {
    setCurrentTrack(track);
    currentTrackRef.current = track;

    if (!widgetRef.current) return;

    if (track.scUrl && track.scUrl.trim() !== "") {
      widgetRef.current.load(track.scUrl, {
        auto_play: autoPlay,
        hide_related: true,
        show_comments: false,
        show_user: false,
        show_reposts: false,
        visual: false
      });
      if (autoPlay) {
        setIsPlaying(true);
      }
    } else {
      widgetRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playNextTrack = (random: boolean = false) => {
    const activeAlbum = albumsRef.current[currentAlbumIndexRef.current];
    const availableTracks = activeAlbum.tracks.filter(t => t.scUrl && t.scUrl.trim() !== "");

    if (availableTracks.length === 0) {
      const nextIndex = currentTrackRef.current ? (currentTrackRef.current.id % activeAlbum.tracks.length) : 0;
      const nextTrack = activeAlbum.tracks[nextIndex];
      setCurrentTrack(nextTrack);
      currentTrackRef.current = nextTrack;
      if (widgetRef.current) widgetRef.current.pause();
      setIsPlaying(false);
      return;
    }

    let nextTrack: Track;
    if (random && availableTracks.length > 1) {
      const otherTracks = availableTracks.filter(t => t.id !== currentTrackRef.current?.id);
      nextTrack = otherTracks[Math.floor(Math.random() * otherTracks.length)] || availableTracks[0];
    } else {
      const currentIndex = activeAlbum.tracks.findIndex(t => t.id === currentTrackRef.current?.id);
      const nextIndex = (currentIndex + 1) % activeAlbum.tracks.length;
      nextTrack = activeAlbum.tracks[nextIndex];
    }

    loadAndPlayTrack(nextTrack, true);
  };

  // Koneksi SoundCloud Widget API
  const initSoundCloudWidget = () => {
    if (typeof window !== "undefined" && (window as any).SC && iframeRef.current && !widgetRef.current) {
      const widget = (window as any).SC.Widget(iframeRef.current);
      widgetRef.current = widget;

      widget.bind((window as any).SC.Widget.Events.PLAY, () => {
        setIsPlaying(true);
      });

      widget.bind((window as any).SC.Widget.Events.PAUSE, () => {
        setIsPlaying(false);
      });

      widget.bind((window as any).SC.Widget.Events.FINISH, () => {
        playNextTrack(true);
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
    if (!currentTrack?.scUrl || currentTrack.scUrl.trim() === "") return;
    widgetRef.current.toggle();
  };

  // Ganti Kaset / Album Musik
  const handleSwitchAlbum = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextAlbumIndex = (currentAlbumIndex + 1) % albums.length;
    setCurrentAlbumIndex(nextAlbumIndex);
    currentAlbumIndexRef.current = nextAlbumIndex;

    const nextAlbum = albums[nextAlbumIndex];
    const firstTrack = nextAlbum.tracks[0];
    // Jika sedang memainkan musik, langsung putar lagu di album baru jika scUrl tersedia
    loadAndPlayTrack(firstTrack, isPlaying && Boolean(firstTrack.scUrl));

    // Reset hitungan 10 detik setelah klik ganti album
    startControlsHideTimer();
  };

  // Auto-hide marquee info logic (diberi waktu 10 detik juga saat kursor menjauh)
  useEffect(() => {
    if (isPlaying) {
      setIsInfoVisible(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      
      if (!isHovered) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsInfoVisible(false);
        }, 10000); 
      }
    } else {
      setIsInfoVisible(isHovered);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    }

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isPlaying, isHovered]);

  const currentVinyl = currentTrack?.vinyl || currentAlbum.defaultVinyl || "/icon/vinyl.webp";

  const getTrackDescription = () => {
    if (!currentTrack?.title) {
      return `[Kaset ${currentAlbum.id}: ${currentAlbum.name}] Slot #${currentTrack?.id || 1} masih kosong. Silakan isi judul & scUrl di album2Tracks.`;
    }
    return `${currentTrack.title} by ${currentAlbum.artist} from ${currentAlbum.series}. All rights reserved to ATLUS / SEGA.`;
  };

  if (!isMounted) return null;

  return (
    <>
      <Script 
        src="https://w.soundcloud.com/player/api.js" 
        onLoad={initSoundCloudWidget}
      />

      <div
        className={styles.playerContainer}
        onMouseEnter={() => {
          setIsHovered(true);
          showControls();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          startControlsHideTimer();
        }}
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

        {/* Kontainer Teks Hitam */}
        <div className={`${styles.textContainer} ${isInfoVisible ? styles.textVisible : ""}`}>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeWrapper}>
              <p className={styles.scrollText}>
                {getTrackDescription()}
              </p>
              <p className={styles.scrollText}>
                {getTrackDescription()}
              </p>
            </div>
          </div>
          <span className={styles.playStatus}>
            {!currentTrack?.scUrl ? "(Link Belum Diisi)" : isPlaying ? `(Now Playing - Kaset ${currentAlbum.id})` : "(Paused)"}
          </span>
        </div>

        {/* Vinyl & Circular Music Button Section */}
        <div 
          className={styles.vinylSection}
          onMouseEnter={showControls}
          onMouseLeave={startControlsHideTimer}
        >
          {/* Tombol Bulat Icon Musik untuk Ganti Kaset */}
          <button
            type="button"
            className={`${styles.musicRoundButton} ${isControlsVisible ? styles.buttonVisible : ""}`}
            onClick={handleSwitchAlbum}
            title={`Ganti Kaset ke: ${albums[(currentAlbumIndex + 1) % albums.length].name}`}
            aria-label="Ganti Kaset Musik"
          >
            <MusicIcon />
          </button>

          {/* Piringan Hitam Vinyl */}
          <div
            className={styles.vinylContainer}
            onClick={togglePlay}
          >
            <div key={currentVinyl} className={`${styles.vinylWrapper} ${styles.vinylPop}`}>
              <img 
                src={currentVinyl} 
                alt={`Vinyl ${currentAlbum.name}`}
                className={`${styles.vinylImage} ${isPlaying ? styles.spinning : ""}`} 
              />
            </div>
            
            {/* Not Balok Animasi */}
            {isPlaying && (
              <>
                <div className={`${styles.musicNote} ${styles.note1}`}>♪</div>
                <div className={`${styles.musicNote} ${styles.note2}`}>♫</div>
                <div className={`${styles.musicNote} ${styles.note3}`}>♪</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
