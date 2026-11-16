"use client";

import useSWR from "swr";
import styles from "./DashboardGrid.module.css";
import Image from "next/image";
import initialFeeds from "@/data/feeds.json";

export interface FeedPost {
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

export default function DashboardGrid() {
  const { data: posts } = useSWR<FeedPost[]>("/api/feeds", fetcher, {
    fallbackData: initialFeeds as FeedPost[],
    revalidateOnFocus: true,
  });

  const sortedFeedPosts = [...(posts || [])].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className={styles.feedContainer}>
      {sortedFeedPosts.map((post) => {
        const hasImage = !!post.image;
        const hasMusic = !!post.soundcloud;

        // Mendukung baik URL SoundCloud biasa maupun embed widget URL
        const soundcloudEmbedUrl = post.soundcloud
          ? post.soundcloud.includes("w.soundcloud.com/player")
            ? post.soundcloud
            : `https://w.soundcloud.com/player/?url=${encodeURIComponent(post.soundcloud)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false`
          : "";

        return (
          <article key={post.id} className={styles.card}>

            {/* ── Header ── */}
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.headerDot} />
                <div className={styles.headerTitleGroup}>
                  <span className={styles.cardTitle}>{post.title}</span>
                  <span className={styles.cardDate}>{post.date}</span>
                </div>
              </div>

              <div className={styles.headerRight}>
                <div className={styles.langToggle}>
                  {post.langs.map((lang, idx) => (
                    <span
                      key={lang}
                      className={`${styles.langTag} ${idx === 0 ? styles.langTagActive : ""}`}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Image ── */}
            {hasImage && (
              <div className={styles.thumbnail}>
                <Image
                  src={post.image!}
                  alt={post.title}
                  width={360}
                  height={270}
                  className={styles.thumbImg}
                  unoptimized
                />
              </div>
            )}

            {/* ── Text Content ── */}
            {(post.body || post.quote) && (
              <div className={styles.content}>
                {post.body && (
                  <p className={styles.body}>{post.body}</p>
                )}

                {post.quote && (
                  <blockquote className={styles.quote}>
                    {post.quote}
                  </blockquote>
                )}
              </div>
            )}

            {/* ── Music ── */}
            {hasMusic && soundcloudEmbedUrl && (
              <div className={styles.soundcloudEmbed}>
                <iframe
                  src={soundcloudEmbedUrl}
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                />
              </div>
            )}

          </article>
        );
      })}
    </div>
  );
}
