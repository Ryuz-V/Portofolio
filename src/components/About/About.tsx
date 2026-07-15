"use client";

import React, { useState, useEffect } from "react";
import styles from "./About.module.css";
import { GitHubCalendar } from "react-github-calendar";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    FaHtml5,
    FaCss3Alt,
    FaBootstrap,
    FaReact,
    FaNodeJs,
    FaPhp,
    FaLaravel,
    FaDocker,
    FaNpm,
    FaYarn,
    FaGithub,
    FaStar,
    FaPython,
} from "react-icons/fa";
import {
    SiTailwindcss,
    SiJavascript,
    SiTypescript,
    SiVite,
    SiAstro,
    SiNextdotjs,
    SiPrisma,
    SiExpress,
    SiGo,
    SiSwagger,
    SiKotlin,
    SiJetpackcompose,
    SiPostgresql,
    SiMysql,
    SiFirebase,
    SiSupabase,
    SiBun,
    SiZod,
    SiFramer,
    SiRedux,
    SiAxios,
    SiMongodb,
    SiVercel,
    SiGit
} from "react-icons/si";
import { FiCode, FiClock, FiActivity, FiMapPin, FiBriefcase } from "react-icons/fi";
import { DiGitBranch } from "react-icons/di";
import { TbBrandNextjs } from "react-icons/tb";

// ----------------------------------------------------
// 1. DATA SKILLS MOCK
// ----------------------------------------------------
const skillsData = [
    { name: "HTML", icon: <FaHtml5 color="#E34F26" />, category: "Frontend" },
    { name: "CSS", icon: <FaCss3Alt color="#1572B6" />, category: "Frontend" },
    { name: "Bootstrap", icon: <FaBootstrap color="#7952B3" />, category: "Frontend" },
    { name: "TailwindCSS", icon: <SiTailwindcss color="#06B6D4" />, category: "Frontend", utama: true },
    { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" />, category: "Frontend", utama: true },
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" />, category: "Frontend", utama: true },
    { name: "React.js", icon: <FaReact color="#61DAFB" />, category: "Frontend", utama: true },
    { name: "Vite", icon: <SiVite color="#646CFF" />, category: "Tools" },
    { name: "Next.js", icon: <SiNextdotjs color="#FFF" />, category: "Frontend", utama: true },
    { name: "Node.js", icon: <FaNodeJs color="#339933" />, category: "Backend" },
    { name: "PHP", icon: <FaPhp color="#777BB4" />, category: "Backend" },
    { name: "Laravel", icon: <FaLaravel color="#FF2D20" />, category: "Backend", utama: true },
    { name: "Kotlin", icon: <SiKotlin color="#7F52FF" />, category: "Mobile", utama: true },
    { name: "MySql", icon: <SiMysql color="#4479A1" />, category: "Database" },
    { name: "Firebase", icon: <SiFirebase color="#FFCA28" />, category: "Database" },
    { name: "Npm", icon: <FaNpm color="#CB3837" />, category: "Tools" },
    { name: "Github", icon: <FaGithub color="#FFF" />, category: "Tools" },
    { name: "Python", icon: <FaPython color="#306998" />, category: "Backend", utama:true},
    { name: "Docker", icon: <FaDocker color="#2496ED" />, category: "Tools"},
    { name: "MongoDB", icon: <SiMongodb color="#47A248" />, category: "Database" },
    { name: "Vercel", icon: <SiVercel color="#ffffffff" />, category:"Tools"},
    { name: "Git", icon: <SiGit color="#F05032" />, category: "Tools"}
];

const categories = [
    { id: "Semua", label: "Semua", count: skillsData.length },
    { id: "Utama", label: "Utama", count: skillsData.filter((s) => s.utama).length },
    { id: "Frontend", label: "Frontend", count: skillsData.filter((s) => s.category === "Frontend").length },
    { id: "Backend", label: "Backend", count: skillsData.filter((s) => s.category === "Backend").length },
    { id: "Mobile", label: "Mobile", count: skillsData.filter((s) => s.category === "Mobile").length },
    { id: "Database", label: "Database", count: skillsData.filter((s) => s.category === "Database").length },
    { id: "Tools", label: "Tools", count: skillsData.filter((s) => s.category === "Tools").length },
];

// ----------------------------------------------------
// 2. UMAMI MOCK DATA (Chart)
// ----------------------------------------------------
const umamiChartData = [
    { name: "Oct", sesi: 1500, tampilan: 10500 },
    { name: "Nov", sesi: 900, tampilan: 5400 },
    { name: "Dec", sesi: 1200, tampilan: 7500 },
    { name: "Jan", sesi: 2100, tampilan: 17200 },
    { name: "Feb", sesi: 1600, tampilan: 14000 },
    { name: "Mar", sesi: 1650, tampilan: 17200 },
    { name: "Apr", sesi: 1200, tampilan: 8500 },
];

export default function About() {
    const [activeTab, setActiveTab] = useState("Semua");

    // State for dynamic API data
    const [githubUser, setGithubUser] = useState<any>(null);
    const [githubRepos, setGithubRepos] = useState<any[]>([]);

    const [wakatimeData, setWakatimeData] = useState<any>(null);
    const [umamiData, setUmamiData] = useState<any>(null);

    // Use GitHub username
    const githubUsername = "Ryuz-V";

    useEffect(() => {
        // Fetch GitHub Profile
        fetch(`https://api.github.com/users/${githubUsername}`)
            .then((res) => res.json())
            .then((data) => setGithubUser(data))
            .catch((err) => console.error(err));

        // Fetch GitHub Repos (Mocking pinned repos for now via typical endpoint)
        fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=4`)
            .then((res) => res.json())
            .then((data) => setGithubRepos(data))
            .catch((err) => console.error(err));

        // Fetch WakaTime
        fetch('/api/wakatime')
            .then((res) => res.json())
            .then((data) => {
                if (!data.error && data.data) setWakatimeData(data.data);
            })
            .catch((err) => console.error(err));

        // Fetch Umami
        fetch('/api/umami')
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) setUmamiData(data);
            })
            .catch((err) => console.error(err));
    }, []);

    // Filter skills based on tab
    const filteredSkills = skillsData.filter((skill) => {
        if (activeTab === "Semua") return true;
        if (activeTab === "Utama") return skill.utama;
        return skill.category === activeTab;
    });

    return (
        <div className={styles.container}>
            {/* ------------------ BIO SECTION ------------------ */}
            <section>
                <h1 className={styles.heroTitle}>Halo, saya Jathniel Urdha H.</h1>
                <div className={styles.heroMeta}>
                    <span><FiMapPin /> Berdomisili di Sampit, Indonesia <span style={{ fontSize: "0.7rem", border: "1px solid #444", padding: "0 2px", borderRadius: "3px" }}>ID</span></span>
                </div>
                <p className={styles.heroDesc}>
                    Saya adalah seorang Siswa Yang Tertarik Pada Bidang Pemrograman Khususnya Development Aplikasi & Sofware Engineer yang senang mencoba dan mempelajari hal-hal baru. Saya mengutamakan kualitas tinggi bukan sekadar sebagai tugas, melainkan sebagai standar hidup. Didorong oleh rasa ingin tahu yang besar, saya memanfaatkan setiap tantangan sebagai motivasi untuk terus berkembang. Di dunia teknologi yang terus berubah dengan cepat, saya memilih tidak hanya mengikuti arus, tetapi terus berkembang untuk menciptakan sesuatu yang luar biasa.
                </p>
                <p className={styles.heroDesc}>
                    Saat ini, saya sedang mempelajari dan bereksperimen dengan membangun proyek-proyek seperti bot, situs web, dan aplikasi.
                </p>
            </section>

            <hr className={styles.divider} />

            {/* ------------------ KEAHLIAN SECTION ------------------ */}
            <section>
                <h2 className={styles.sectionTitle}><FiCode /> Keahlian</h2>
                <p className={styles.sectionSubtitle}>Keahlian profesional saya.</p>

                <div className={styles.skillTabs}>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`${styles.skillTab} ${activeTab === cat.id ? styles.active : ""}`}
                            onClick={() => setActiveTab(cat.id)}
                        >
                            {cat.label}
                            <span className={styles.skillTabBadge}>{cat.count}</span>
                        </button>
                    ))}
                </div>

                <div className={styles.skillsGrid}>
                    {filteredSkills.map((skill, index) => (
                        <div key={index} className={styles.skillBadge}>
                            {skill.icon}
                            <span>{skill.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <hr className={styles.divider} />

            {/* ------------------ GITHUB SECTION ------------------ */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 className={styles.sectionTitle}><FaGithub /> Aktivitas GitHub</h2>
                        <p className={styles.sectionSubtitle}>Kontribusi open source, repositori, dan aktivitas coding selama setahun terakhir.</p>
                    </div>
                    <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" style={{ color: '#a1a1aa', textDecoration: 'none' }}>@{githubUsername}</a>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Pengikut</span>
                        <span className={styles.statValue}>{githubUser ? githubUser.followers : 113}</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Mengikuti</span>
                        <span className={styles.statValue}>{githubUser ? githubUser.following : 18}</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Repositori</span>
                        <span className={styles.statValue}>{githubUser ? githubUser.public_repos : 19}</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Kontribusi</span>
                        <span className={styles.statValue}>512</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Hari Terbaik</span>
                        <span className={styles.statValue}>50</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Rata-rata Harian</span>
                        <span className={styles.statValue}>1 <span className={styles.statSubValue}>/ hari</span></span>
                    </div>
                </div>

                {/* GitHub Calendar Component */}
                <div className={styles.card} style={{ marginBottom: '1.5rem', overflowX: 'auto' }}>
                    <GitHubCalendar
                        username={githubUsername}
                        colorScheme="dark"
                        theme={{
                            light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                        }}
                    />
                </div>

                <h3 style={{ fontSize: '1.1rem', color: '#e5e7eb', marginBottom: '1rem', fontWeight: 500 }}>Repositori Disematkan</h3>
                <div className={styles.pinnedGrid}>
                    {githubRepos && githubRepos.length > 0 ? (
                        githubRepos.map((repo, i) => (
                            <a href={repo.html_url} target="_blank" rel="noreferrer" key={i} style={{ textDecoration: 'none' }}>
                                <div className={styles.pinnedCard}>
                                    <div className={styles.pinnedName}>{repo.name}</div>
                                    <div className={styles.pinnedDesc}>{repo.description || 'Tidak ada deskripsi'}</div>
                                    <div className={styles.pinnedFooter}>
                                        {repo.language && (
                                            <span className={styles.pinnedLang}>
                                                <div className={styles.pinnedLangColor} style={{ backgroundColor: '#3178C6' }}></div>
                                                {repo.language}
                                            </span>
                                        )}
                                        <span><FaStar /> {repo.stargazers_count}</span>
                                        <span><DiGitBranch /> {repo.forks_count}</span>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <>
                            {/* Fallback Pinned Repos if API doesn't return or while loading */}
                            <div className={styles.pinnedCard}>
                                <div className={styles.pinnedName}>Ryuz-V.id</div>
                                <div className={styles.pinnedDesc}>Personal website & portfolio, built from scratch using Next.js, TypeScript, Tailwind CSS, SWR and Prisma.</div>
                                <div className={styles.pinnedFooter}>
                                    <span className={styles.pinnedLang}><div className={styles.pinnedLangColor} style={{ backgroundColor: '#3178C6' }}></div>TypeScript</span>
                                    <span><FaStar /> 95</span>
                                    <span><DiGitBranch /> 27</span>
                                </div>
                            </div>
                            <div className={styles.pinnedCard}>
                                <div className={styles.pinnedName}>portfolio</div>
                                <div className={styles.pinnedDesc}>⚡ Personal website & portfolio, built from scratch using Next.js, Typescript, and Tailwind CSS</div>
                                <div className={styles.pinnedFooter}>
                                    <span className={styles.pinnedLang}><div className={styles.pinnedLangColor} style={{ backgroundColor: '#3178C6' }}></div>TypeScript</span>
                                    <span><FaStar /> 3</span>
                                    <span><DiGitBranch /> 3</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <hr className={styles.divider} />

            {/* ------------------ WAKATIME SECTION ------------------ */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 className={styles.sectionTitle}><FiClock /> Statistik WakaTime</h2>
                        <p className={styles.sectionSubtitle}>Aktivitas coding selama 7 hari terakhir.</p>
                    </div>
                    <span style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Pembaruan Terakhir: 1 day ago</span>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Tanggal Mulai</span>
                        <span className={styles.statValueSmall}>April 20, 2026</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Tanggal Selesai</span>
                        <span className={styles.statValueSmall}>April 26, 2026</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Rata-rata Waktu Coding Harian</span>
                        <span className={styles.statValueSmall}>
                            {wakatimeData ? wakatimeData.human_readable_daily_average : "1 hr 16 mins"}
                        </span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Total Minggu Ini</span>
                        <span className={styles.statValueSmall}>
                            {wakatimeData ? wakatimeData.human_readable_total : "6 hrs 23 mins"}
                        </span>
                    </div>
                    <div className={styles.statCard} style={{ gridColumn: 'span 2' }}>
                        <span className={styles.statLabel}>Hari Terbaik</span>
                        <span className={styles.statValueSmall}>
                            {wakatimeData?.best_day ? `${wakatimeData.best_day.date} (${wakatimeData.best_day.text})` : "April 26, 2026 (4 hrs 19 mins)"}
                        </span>
                    </div>
                    <div className={styles.statCard} style={{ gridColumn: 'span 2' }}>
                        <span className={styles.statLabel}>Total Coding Sejak Bergabung</span>
                        <span className={styles.statValueSmall}>
                            {wakatimeData?.all_time_since_today ? wakatimeData.all_time_since_today.text : "1,103 hrs 16 mins"}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className={styles.card}>
                        <h4 style={{ marginBottom: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Bahasa Teratas</h4>

                        <div className={styles.progressItem}>
                            <div className={styles.progressHeader}><span>TypeScript</span><span>42%</span></div>
                            <div className={styles.progressTrack}><div className={styles.progressBar} style={{ width: '42%' }}></div></div>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressHeader}><span>Other</span><span>30%</span></div>
                            <div className={styles.progressTrack}><div className={styles.progressBar} style={{ width: '30%' }}></div></div>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressHeader}><span>Markdown</span><span>14%</span></div>
                            <div className={styles.progressTrack}><div className={styles.progressBar} style={{ width: '14%' }}></div></div>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressHeader}><span>Bash</span><span>7%</span></div>
                            <div className={styles.progressTrack}><div className={styles.progressBar} style={{ width: '7%' }}></div></div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h4 style={{ marginBottom: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Editor</h4>

                        <div className={styles.progressItem}>
                            <div className={styles.progressHeader}><span>Unknown Editor</span><span>73%</span></div>
                            <div className={styles.progressTrack}><div className={styles.progressBar} style={{ width: '73%' }}></div></div>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressHeader}><span>VS Code</span><span>24%</span></div>
                            <div className={styles.progressTrack}><div className={styles.progressBar} style={{ width: '24%' }}></div></div>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressHeader}><span>Android Studio</span><span>3%</span></div>
                            <div className={styles.progressTrack}><div className={styles.progressBar} style={{ width: '3%' }}></div></div>
                        </div>
                    </div>
                </div>
            </section>

            <hr className={styles.divider} />

            {/* ------------------ UMAMI SECTION ------------------ */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h2 className={styles.sectionTitle}><FiActivity /> Umami</h2>
                        <p className={styles.sectionSubtitle}>Pantau trafik dan interaksi real-time dari situs portofolio saya.</p>
                    </div>
                    <select style={{ backgroundColor: '#18181b', color: '#e5e7eb', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #27272a', outline: 'none' }}>
                        <option>Semua</option>
                    </select>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard} style={{ alignItems: 'center', textAlign: 'center' }}>
                        <span className={styles.statLabel}>Dilihat</span>
                        <span className={styles.statValue}>{umamiData?.pageviews?.value?.toLocaleString('id-ID') || "80.442"}</span>
                    </div>
                    <div className={styles.statCard} style={{ alignItems: 'center', textAlign: 'center' }}>
                        <span className={styles.statLabel}>Pengunjung</span>
                        <span className={styles.statValue}>{umamiData?.visitors?.value?.toLocaleString('id-ID') || "10.407"}</span>
                    </div>
                    <div className={styles.statCard} style={{ alignItems: 'center', textAlign: 'center' }}>
                        <span className={styles.statLabel}>Kunjungan</span>
                        <span className={styles.statValue}>{umamiData?.visits?.value?.toLocaleString('id-ID') || "15.875"}</span>
                    </div>
                    <div className={styles.statCard} style={{ alignItems: 'center', textAlign: 'center' }}>
                        <span className={styles.statLabel}>Negara</span>
                        <span className={styles.statValue}>{umamiData?.countries?.value?.toLocaleString('id-ID') || "91"}</span>
                    </div>
                    <div className={styles.statCard} style={{ alignItems: 'center', textAlign: 'center' }}>
                        <span className={styles.statLabel}>Acara</span>
                        <span className={styles.statValue}>{umamiData?.events?.value?.toLocaleString('id-ID') || "6.294"}</span>
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: '#a1a1aa', fontWeight: 500, marginBottom: '1rem' }}>Tren Trafik</h4>
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={umamiChartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis dataKey="name" stroke="#a1a1aa" axisLine={false} tickLine={false} />
                                <YAxis stroke="#a1a1aa" axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#27272a' }}
                                    contentStyle={{ backgroundColor: '#121212', borderColor: '#27272a', color: '#fff' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="sesi" name="Sesi" stackId="a" fill="#b0b080" />
                                <Bar dataKey="tampilan" name="Tampilan Halaman" stackId="a" fill="#d4c000" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
        </div>
    );
}
