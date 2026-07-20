"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Preloader.module.css";

const TITLE = "PORTOFOLIO";
const LOADING_TEXT = "LOADING";

export default function Preloader() {
  const [titleText, setTitleText] = useState("");
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Lock scroll & hide MusicPlayer while preloader is active
    document.body.classList.add("preloader-active");

    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Type the title
    let titleIndex = 0;
    const titleInterval = setInterval(() => {
      if (titleIndex < TITLE.length) {
        setTitleText(TITLE.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleInterval);

        // After title is done, show LOADING label typing
        setTimeout(() => {
          setLoadingVisible(true);
          let loadingIndex = 0;
          const loadingInterval = setInterval(() => {
            if (loadingIndex < LOADING_TEXT.length) {
              setLoadingText(LOADING_TEXT.slice(0, loadingIndex + 1));
              loadingIndex++;
            } else {
              clearInterval(loadingInterval);

              // Start progress bar after LOADING is typed
              setTimeout(() => {
                let currentProgress = 0;
                const totalDuration = 2200;
                const intervalTime = 40;
                const increment = 100 / (totalDuration / intervalTime);

                const progressInterval = setInterval(() => {
                  currentProgress += increment;
                  if (currentProgress >= 100) {
                    currentProgress = 100;
                    clearInterval(progressInterval);

                    // Finish — restore scroll & show MusicPlayer
                    setTimeout(() => {
                      setLoadingComplete(true);
                      setTimeout(() => {
                        document.body.classList.remove("preloader-active");
                        setIsVisible(false);
                      }, 600);
                    }, 300);
                  }
                  setProgress(currentProgress);
                }, intervalTime);
              }, 200);
            }
          }, 80);
        }, 200);
      }
    }, 90);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(titleInterval);
      document.body.classList.remove("preloader-active");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.preloader} ${loadingComplete ? styles.fadeOut : ""}`}>
      <div className={styles.screen}>
        <div className={styles.scanlines} />
        <div className={styles.container}>
          <h1 className={styles.title}>
            {titleText}
            <span className={`${styles.cursor} ${showCursor ? styles.cursorVisible : styles.cursorHidden}`}>
              _
            </span>
          </h1>

          {loadingVisible && (
            <div className={styles.loadingSection}>
              <div className={styles.loadingLabel}>
                {loadingText}
                {loadingText.length < LOADING_TEXT.length && (
                  <span className={`${styles.cursor} ${showCursor ? styles.cursorVisible : styles.cursorHidden}`}>
                    _
                  </span>
                )}
              </div>
              <div className={styles.progressBarWrapper}>
                <div className={styles.progressBarTrack}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className={styles.progressCornerTL} />
                <div className={styles.progressCornerTR} />
                <div className={styles.progressCornerBL} />
                <div className={styles.progressCornerBR} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
