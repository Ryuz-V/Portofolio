"use client";

import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

const LOG_SEQUENCE = [
  { text: "[  735] /css/tokyo-night-dark.min.css", delay: 200 },
  { text: "[    0] loading additional resources...", delay: 500 },
  { text: "[    0] /js/lecoq.js", delay: 800 },
  { text: "[    0] /css/root.js", delay: 1100 },
  { text: "[    0] /index.html", delay: 1400 },
  { text: "[    0] loading minimal resources...", delay: 1700 },
  { text: "[    0] booting v0.6...", delay: 2000 },
];

export default function Preloader() {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    const totalDuration = 2500; // 2.5 seconds total loading time
    const intervalTime = 50;
    const increment = (100 / (totalDuration / intervalTime));

    const progressInterval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
      }
      setProgress(currentProgress);
    }, intervalTime);

    const timeouts: NodeJS.Timeout[] = [];

    LOG_SEQUENCE.forEach(({ text, delay }) => {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, text]);
      }, delay);
      timeouts.push(timeout);
    });

    const finishTimeout = setTimeout(() => {
      setLoadingComplete(true);
      setTimeout(() => setIsVisible(false), 500); // fade out duration
    }, totalDuration + 200);

    return () => {
      clearInterval(progressInterval);
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.preloader} ${loadingComplete ? styles.fadeOut : ""}`}>
      <div className={styles.container}>
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.logContainer}>
          {logs.map((log, i) => (
            <div key={i} className={styles.logLine}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
