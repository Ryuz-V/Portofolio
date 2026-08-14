import styles from "./DashboardGrid.module.css";
import Image from "next/image";

const feedPosts = [
  {
    id: 5,
    title: "World",
    date: "Wednesday, August 5, 2026",
    langs: ["EN", "ID"],
    image: null,
    soundcloud: "https://soundcloud.com/goodkidband/cicada?si=6152cf245a804b62a164fce2c5a27353&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    body: "Woah i understand now, how this world works, how people work, how i work. Well thanks to people who have been through the same thing as me, who have been through worse than me, who have been through better than me. I understand now that this world is not just black and white, but a spectrum of colors and emotions. I understand that people are not just good or bad, but complex beings with their own struggles and triumphs. I understand that i am not just a victim or a survivor, but a person with my own story to tell.",
    quote: "The sadness of having lost everything may not even be as great as the regrets of not having lived...",
  },
  {
    id: 4,
    title: "World",
    date: "Monday, December 29, 2025",
    langs: ["EN", "ID"],
    image: null,
    body: "Woah i understand now, how this world works, how people work, how i work. Well thanks to people who have been through the same thing as me, who have been through worse than me, who have been through better than me. I understand now that this world is not just black and white, but a spectrum of colors and emotions. I understand that people are not just good or bad, but complex beings with their own struggles and triumphs. I understand that i am not just a victim or a survivor, but a person with my own story to tell.",
    quote: "The sadness of having lost everything may not even be as great as the regrets of not having lived...",
  },
  {
    id: 3,
    title: "Montagem Hikari",
    date: "Friday, January 10, 2026",
    langs: ["EN", "ID"],
    image: null,
    soundcloud: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/bellyjay-764894940/montagem-hikari",
    body: null,
    quote: null,
  },
  {
    id: 2,
    title: "Chiling In The Good Place To Find Inspiration",
    date: "Wednesday, February 5, 2026",
    langs: ["EN", "ID"],
    image: "https://picsum.photos/seed/design77/800/400",
    body: "To be honest, this is the first time I’ve been able to relax in a forest  where the temperature drops to 8 degrees Celsius—it’s hard to believe, isn’t it... Yeah, that’s true—if I’d taken a screenshot of the temperature, but that’s not the point. It’s just that I didn’t expect to be able to relax and enjoy the Indonesian forest at night. For some reason, even though I’ve been stuck for ideas, I feel like I have so many ideas—especially for video concepts. My imagination suddenly ran wild while watching someone’s video, as if I’d received a huge burst of inspiration. ",
    soundcloud: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-385085454/wind-akeboshi",
    quote: null,
  },
  {
  id: 1,
  title: "The New Adventure",
  date: "Sunday, June 23, 2025",
  langs: ["EN", "ID"],
  image: "/images/unnamed.webp",
    body: "This where i will write my own path even if the road is carved from pain, even if every step feels like sinking deeper into struggle. Because suffering is not the end of me it is the ink I use to rewrite my future. They may see my scars as weakness, but I see them as proof that I kept going when stopping would’ve been easier. The future isn’t something I wait for… it’s something I chase, even when it runs from me. And every chance I get no matter how small, no matter how fragile I will take it. Because this path… is mine.",
    quote: null,
  },
];

const sortedFeedPosts = [...feedPosts].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function DashboardGrid() {
  return (
    <div className={styles.feedContainer}>
      {sortedFeedPosts.map((post) => {
        const hasImage = !!post.image;
        const hasMusic = !!post.soundcloud;

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

            {/* ── Image (selalu di atas kalau ada) ── */}
            {hasImage && (
              <div className={styles.thumbnail}>
                <Image
                  src={post.image}
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
            {hasMusic && (
              <div className={styles.soundcloudEmbed}>
                <iframe
                  src={post.soundcloud}
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