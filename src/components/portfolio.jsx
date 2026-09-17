import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ── Design Tokens (Deep Purple, Indigo & Midnight Dark Aesthetic) ────
const colors = {
  bgDeep: "#06050e", // Midnight black
  bgMid: "#0d0d24",  // Deep midnight navy / indigo
  bgCard: "rgba(18, 17, 42, 0.65)", // Indigo-purple translucent glass
  bgCardHover: "rgba(28, 26, 62, 0.75)",
  purple: "#7c3aed",
  purpleBright: "#a855f7",
  purpleGlow: "rgba(168, 85, 247, 0.35)",
  indigo: "#6366f1",
  indigoBright: "#818cf8",
  indigoGlow: "rgba(99, 102, 241, 0.35)",
  lavender: "#c084fc",
  cyan: "#38bdf8",
  ink: "#f5f4fd",
  inkDim: "#a0a5c4",
  border: "rgba(139, 92, 246, 0.2)",
  borderHover: "rgba(168, 85, 247, 0.55)",
};

const fontDisplay = "'Space Grotesk', sans-serif";
const fontBody = "'Inter', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

// ── Animated Vector Icons ─────────────────────────────────────────
const Icons = {
  Python: ({ size = 20 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      whileHover={{ rotate: 15, scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <path
        d="M12 2C6.48 2 6.5 4.5 6.5 4.5V7H12V8.5H4C4 8.5 2 8.35 2 12.5C2 16.65 3.75 16.5 3.75 16.5H5.5V14C5.5 14 5.35 11.5 8 11.5H13.5C13.5 11.5 15.5 11.65 15.5 9.5V4.5C15.5 4.5 15.65 2 12 2ZM9 4.5C9.55 4.5 10 4.95 10 5.5C10 6.05 9.55 6.5 9 6.5C8.45 6.5 8 6.05 8 5.5C8 4.95 8.45 4.5 9 4.5Z"
        fill="#818cf8"
      />
      <path
        d="M12 22C17.52 22 17.5 19.5 17.5 19.5V17H12V15.5H20C20 15.5 22 15.65 22 11.5C22 7.35 20.25 7.5 20.25 7.5H18.5V10C18.5 10 18.65 12.5 16 12.5H10.5C10.5 12.5 8.5 12.35 8.5 14.5V19.5C8.5 19.5 8.35 22 12 22ZM15 19.5C14.45 19.5 14 19.05 14 18.5C14 17.95 14.45 17.5 15 17.5C15.55 17.5 16 17.95 16 18.5C16 19.05 15.55 19.5 15 19.5Z"
        fill="#c084fc"
      />
    </motion.svg>
  ),

  SQL: ({ size = 20 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.2, rotate: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#a855f7" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="#818cf8" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" stroke="#a855f7" />
    </motion.svg>
  ),

  Excel: ({ size = 20 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      whileHover={{ scale: 1.15, rotate: 8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="#10b981" strokeWidth="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
      <path d="M6.5 7.5l5 9M11.5 7.5l-5 9" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  ),

  MongoDB: ({ size = 20 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      whileHover={{ scale: 1.2, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <path
        d="M12 2C12 2 6 8.5 6 14C6 17.5 8.5 20.5 12 22C15.5 20.5 18 17.5 18 14C18 8.5 12 2 12 2Z"
        stroke="#a855f7"
        strokeWidth="2"
        fill="rgba(168, 85, 247, 0.15)"
      />
      <path d="M12 2v20" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  ),

  ChartBar: ({ size = 18 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.15 }}
    >
      <path d="M12 20V10" stroke="#a855f7" />
      <path d="M18 20V4" stroke="#818cf8" />
      <path d="M6 20v-4" stroke="#c084fc" />
      <path d="M3 20h18" stroke="#6366f1" />
    </motion.svg>
  ),

  GraduationCap: ({ size = 20 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a855f7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.15, rotate: -5 }}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </motion.svg>
  ),

  Briefcase: ({ size = 20 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a855f7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.15, y: -2 }}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </motion.svg>
  ),

  Sparkles: ({ size = 16 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c084fc"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 0.95, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </motion.svg>
  ),

  WhatsApp: () => (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.2, rotate: 8 }}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.5 9.5c.3-.6.6-.6 1-.6.3 0 .6.1.7.3.2.3.6 1.4.6 1.5 0 .2 0 .4-.1.6s-.3.3-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.3 1.2 1.1 2.2 1.4 2.5 1.6.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.3.6.4.1.2.1.9-.2 1.8-.3.9-1.8 1.8-2.5 1.8" />
    </motion.svg>
  ),

  Linkedin: () => (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.2, rotate: -8 }}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </motion.svg>
  ),

  Mail: () => (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.2, y: -2 }}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </motion.svg>
  ),

  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),

  Shield: ({ size = 20 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a855f7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.15, rotate: -5 }}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </motion.svg>
  ),

  MapPin: ({ size = 20 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#818cf8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.2, y: -2 }}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </motion.svg>
  ),

  UserCheck: ({ size = 20 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a855f7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.15 }}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </motion.svg>
  ),

  Layers: ({ size = 20 }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#818cf8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.15, rotate: 6 }}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </motion.svg>
  )
};

// ── Navigation Configuration ──────────────────────────────────────
const NAV_LINKS = ["home", "about", "skills", "work", "background", "contact"];

// ── Content & Data ────────────────────────────────────────────────
const ABOUT = {
  paragraphs: [
    "I am a data analyst with a strong foundation in Python, SQL, Excel, and MongoDB, passionate about turning raw data into meaningful insights. With problem‑solving skills and a keen eye for detail, I enjoy building dashboards, analyzing trends, and presenting clear, actionable results.",
  ],
  facts: [
    { label: "Focus", value: "Data Analyst & Business Intelligence" },
    { label: "Stack", value: "Python · SQL · Excel · MongoDB" },
    { label: "Based in", value: "Kerala, India" },
    { label: "Status", value: "Open to opportunities" },
  ],
};

const SKILLS_DATA = [
  {
    name: "Python for Data Analysis",
    category: "Analytics & Automation",
    icon: Icons.Python,
    tools: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
    desc: "Exploratory data analysis (EDA), statistical modeling, automated reporting scripts, and data wrangling.",
  },
  {
    name: "SQL & Relational Databases",
    category: "Data Extraction & Queries",
    icon: Icons.SQL,
    tools: ["PostgreSQL", "MySQL", "Joins & Subqueries", "Window Functions"],
    desc: "Advanced data manipulation, CTEs, aggregation pipelines, performance indexing, and schema design.",
  },
  {
    name: "Advanced Excel & BI",
    category: "Dashboards & Reporting",
    icon: Icons.Excel,
    tools: ["Pivot Tables", "VLOOKUP / XLOOKUP", "Power Query", "Data Modeling"],
    desc: "Interactive KPI dashboards, executive summary sheets, automated lookups, and visual trend charts.",
  },
  {
    name: "MongoDB & NoSQL",
    category: "Document Store Analytics",
    icon: Icons.MongoDB,
    tools: ["Aggregation Pipeline", "$match / $group / $lookup", "Atlas", "Indexing"],
    desc: "Extracting insights and metrics from high-volume JSON documents, unstructured logs, and real-time feeds.",
  }
];

const FEATURED_PROJECT = {
  name: "Corruption Reporting Platform",
  category: "Full-Stack Web Application",
  badge: "Featured Work",
  liveUrl: "https://corruptionreporting.netlify.app/",
  shortDesc:
    "Corruption Reporting Platform is a secure web-based application designed to allow citizens to report corruption incidents and track their complaints. The platform provides separate interfaces for users, investigation officers, and administrators, enabling structured case submission, evidence management, officer assignment, investigation tracking, and administrative oversight.",
  modules: [
    {
      title: "Citizen / User Module",
      badge: "User Interface",
      desc: "Structured complaint filing with category, description, precise location tagging via interactive Leaflet maps, supporting evidence uploads, and real-time report tracking.",
    },
    {
      title: "Officer Dashboard",
      badge: "Investigation Portal",
      desc: "Dedicated interface for investigation officers to review assigned cases, examine uploaded evidence, log investigation updates, and manage resolution statuses.",
    },
    {
      title: "Admin Command Dashboard",
      badge: "Administrative Oversight",
      desc: "Centralized administration for monitoring city-wide reports, creating & managing officer accounts, dispatching assignments, and analyzing case statistics.",
    },
  ],
  highlights: [
    "Developed a role-based corruption reporting system with User, Officer, and Admin modules.",
    "Implemented structured complaint submission with category, description, location, and supporting evidence.",
    "Built case tracking so users can monitor the progress of their submitted reports.",
    "Created an Admin Dashboard for monitoring reports, assigning officers, and managing officer accounts.",
    "Created an Officer Dashboard for reviewing assigned cases and updating investigation status.",
    "Integrated location/map functionality using React Leaflet/Leaflet.",
    "Implemented authentication using JWT, password hashing with bcrypt, and role-based access control.",
    "Designed MongoDB collections for users and reports, including relationships between reporters and assigned officers.",
    "Added filtering and statistics to support case monitoring and analysis through administrative dashboards.",
  ],
  technologies: [
    "React.js",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "Material UI",
    "Axios",
    "JWT",
    "bcrypt",
    "Multer",
    "Leaflet",
    "Vite",
  ],
};

const EDUCATION_DATA = [
  {
    title: "BSC CS",
    institution: "Nirmala college of arts and science",
    period: "2023 – 2026",
    location: "Chalakudy",
  },
  {
    title: "Higher Secondary Education",
    institution: "GMBHSS",
    period: "2021 – 2023",
    location: "Chalakudy",
  },
  {
    title: "SSLC",
    institution: "St.joseph emhss, Aloor",
    period: "2021",
    location: "Aloor",
  },
];

const CONTACT = {
  email: "nelbinnelson1010@gmail.com",
  phone: "+91 8129867183",
  whatsapp: "https://wa.me/918129867183",
  linkedin: "https://in.linkedin.com/in/nelbin-nelson",
  socials: [
    { label: "WhatsApp", href: "https://wa.me/918129867183", icon: Icons.WhatsApp },
    { label: "LinkedIn", href: "https://in.linkedin.com/in/nelbin-nelson", icon: Icons.Linkedin },
  ],
};

// ── Reusable Section Wrapper with Bidirectional Slide-In Animation ─
function Reveal({ children, delay = 0, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: fontMono,
        fontSize: "12px",
        color: colors.purpleBright,
        letterSpacing: "0.12em",
        marginBottom: 24,
        textTransform: "uppercase"
      }}
    >
      {children}
    </div>
  );
}

// ── 1. Hero Section ───────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      style={{
        padding: "90px 40px 110px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.12 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: "750px" }}
      >
        {/* Pill Badge sliding in from left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{
            opacity: 1,
            x: 0,
            boxShadow: [
              "0 0 18px -6px rgba(168, 85, 247, 0.25)",
              "0 0 28px -2px rgba(168, 85, 247, 0.5)",
              "0 0 18px -6px rgba(168, 85, 247, 0.25)",
            ],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.1 },
            x: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
            boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.03 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: `2px solid ${colors.purpleBright}`,
            borderRadius: "999px",
            padding: "8px 22px",
            marginBottom: "28px",
            background: "rgba(168, 85, 247, 0.1)",
            cursor: "default",
          }}
        >
          <span
            style={{
              fontFamily: fontDisplay,
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: colors.purpleBright,
              textTransform: "uppercase",
            }}
          >
            DATA ANALYST
          </span>
          <span
            style={{
              fontFamily: fontDisplay,
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: colors.ink,
              textTransform: "uppercase",
            }}
          >
            PORTFOLIO
          </span>
        </motion.div>

        {/* Stacked Giant Typography for Name sliding in from left */}
        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: fontDisplay,
            fontWeight: 800,
            fontSize: "clamp(48px, 8vw, 88px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            margin: "0 0 24px",
            display: "flex",
            flexDirection: "column",
            userSelect: "none",
          }}
        >
          <motion.span
            whileHover={{ x: 6, color: "#ffffff" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ color: colors.ink, display: "inline-block", cursor: "default" }}
          >
            NELBIN
          </motion.span>
          <motion.span
            whileHover={{ x: 6, filter: "brightness(1.15)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ color: colors.purpleBright, fontWeight: 900, display: "inline-block", cursor: "default" }}
          >
            NELSON
          </motion.span>
        </motion.h1>

        {/* Tagline / Subtitle sliding in from left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginBottom: "36px",
            maxWidth: "580px",
          }}
        >
          <p
            style={{
              fontFamily: fontDisplay,
              fontSize: "clamp(19px, 2.6vw, 25px)",
              color: colors.ink,
              fontWeight: 600,
              lineHeight: 1.35,
              margin: "0 0 12px",
            }}
          >
            I turn <span style={{ color: colors.purpleBright, fontWeight: 700 }}>data</span> into{" "}
            <span style={{ color: colors.indigoBright, fontWeight: 700 }}>decisions</span>.
          </p>
          <p
            style={{
              color: colors.inkDim,
              fontSize: "15px",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            From raw datasets to actionable insights — using Python, SQL, Excel, and
            MongoDB to uncover patterns, build dashboards, and drive smarter
            strategies.
          </p>
        </motion.div>

        {/* Action Buttons sliding in from left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.04, boxShadow: `0 0 28px ${colors.purpleGlow}` }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${colors.indigo} 0%, ${colors.purpleBright} 100%)`,
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "8px",
              padding: "13px 28px",
              fontFamily: fontDisplay,
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: `0 4px 20px -4px ${colors.purpleGlow}`,
              transition: "all 0.2s ease",
            }}
          >
            View projects ↓
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, borderColor: colors.purpleBright, color: colors.purpleBright }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-block",
              background: "rgba(18, 17, 42, 0.4)",
              border: `1.5px solid ${colors.border}`,
              color: colors.ink,
              textDecoration: "none",
              borderRadius: "8px",
              padding: "13px 26px",
              fontFamily: fontDisplay,
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Get in touch
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── 2. About Section ──────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <SectionLabel>ABOUT</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px" }}>
        <Reveal>
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i} style={{ color: colors.inkDim, fontSize: "16px", lineHeight: 1.75, margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "grid", gap: "16px" }}>
            {ABOUT.facts.map((f) => (
              <motion.div
                key={f.label}
                whileHover={{ x: 6, backgroundColor: colors.bgCardHover }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                style={{
                  borderLeft: `2px solid ${colors.purpleBright}`,
                  paddingLeft: "14px",
                  background: colors.bgCard,
                  padding: "12px 16px",
                  borderRadius: "0 8px 8px 0",
                  transition: "all 0.2s ease",
                  border: `1px solid ${colors.border}`,
                  borderLeftWidth: "3px",
                  borderLeftColor: colors.purpleBright,
                }}
              >
                <div style={{ fontFamily: fontMono, fontSize: "11px", color: colors.purpleBright, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {f.label}
                </div>
                <div style={{ color: colors.ink, fontSize: "14px", marginTop: 4, fontWeight: 500 }}>{f.value}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── 3. Skills Section ─────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <SectionLabel>SKILLS & TOOLING</SectionLabel>
      <Reveal>
        <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(26px, 3.5vw, 36px)", color: colors.ink, margin: "0 0 16px" }}>
          Technical Stack & Analytics Capabilities
        </h2>
        <p style={{ color: colors.inkDim, fontSize: "15px", maxWidth: "550px", lineHeight: 1.6, marginBottom: "36px" }}>
          Proficient in data manipulation, exploratory data analysis, database querying, and dashboard development.
        </p>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "22px" }}>
        {SKILLS_DATA.map((skill, idx) => {
          const SkillIcon = skill.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.12 }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              style={{
                background: "linear-gradient(160deg, rgba(20, 18, 48, 0.65), rgba(9, 8, 24, 0.8))",
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.purpleBright;
                e.currentTarget.style.boxShadow = `0 10px 28px -8px ${colors.purpleGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 350 }}
                    style={{ padding: "8px", borderRadius: "8px", background: "rgba(168, 85, 247, 0.12)", display: "flex" }}
                  >
                    <SkillIcon size={22} />
                  </motion.div>
                  <motion.span
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.18)" }}
                    style={{ fontFamily: fontMono, fontSize: "11px", color: colors.purpleBright, border: `1px solid ${colors.border}`, padding: "2px 8px", borderRadius: "999px", background: "rgba(168, 85, 247, 0.08)" }}
                  >
                    {skill.category}
                  </motion.span>
                </div>

                <h3 style={{ fontFamily: fontDisplay, fontSize: "18px", color: colors.ink, margin: "0 0 8px" }}>
                  {skill.name}
                </h3>
                <p style={{ color: colors.inkDim, fontSize: "13px", lineHeight: 1.6, margin: "0 0 16px" }}>
                  {skill.desc}
                </p>
              </div>

              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {skill.tools.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.08, y: -2, borderColor: colors.purpleBright, color: colors.purpleBright }}
                      transition={{ type: "spring", stiffness: 350 }}
                      style={{
                        fontFamily: fontMono,
                        fontSize: "11px",
                        color: colors.indigoBright,
                        background: "rgba(9, 8, 25, 0.7)",
                        border: `1px solid ${colors.border}`,
                        borderRadius: "6px",
                        padding: "3px 8px",
                        display: "inline-block",
                        cursor: "default",
                        transition: "all 0.2s"
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ── 4. Work Section (Deep Indigo / Violet Aesthetic) ───────────────
function Work() {
  const [expanded, setExpanded] = useState(false);
  const p = FEATURED_PROJECT;

  return (
    <section id="work" style={{ padding: "70px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <SectionLabel>SELECTED WORK</SectionLabel>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.12 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -3 }}
        style={{
          background: "linear-gradient(160deg, rgba(20, 18, 48, 0.7), rgba(9, 8, 24, 0.85))",
          border: `1px solid ${colors.border}`,
          borderRadius: "14px",
          padding: "clamp(20px, 3vw, 30px)",
          backdropFilter: "blur(12px)",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colors.purpleBright;
          e.currentTarget.style.boxShadow = `0 10px 30px -8px ${colors.purpleGlow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Header Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontFamily: fontMono, fontSize: "11px", letterSpacing: "0.08em", color: colors.purpleBright, textTransform: "uppercase", background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", padding: "2px 8px", borderRadius: "999px", fontWeight: 600 }}>
                {p.badge}
              </span>
              <span style={{ fontFamily: fontMono, fontSize: "11px", color: colors.indigoBright }}>
                {p.category}
              </span>
            </div>
            <h3 style={{ fontFamily: fontDisplay, fontSize: "clamp(22px, 3vw, 28px)", color: colors.ink, margin: 0, fontWeight: 700 }}>
              {p.name}
            </h3>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["User Module", "Officer Dashboard", "Admin Oversight"].map((role) => (
                <motion.span
                  key={role}
                  whileHover={{ scale: 1.08, y: -2, borderColor: colors.purpleBright }}
                  transition={{ type: "spring", stiffness: 350 }}
                  style={{ fontFamily: fontMono, fontSize: "11px", color: colors.indigoBright, background: "rgba(9,8,25,0.7)", border: `1px solid ${colors.border}`, borderRadius: "6px", padding: "3px 8px", cursor: "default" }}
                >
                  {role}
                </motion.span>
              ))}
            </div>

            <motion.a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, boxShadow: `0 0 22px ${colors.purpleGlow}` }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: `linear-gradient(135deg, ${colors.indigo} 0%, ${colors.purpleBright} 100%)`,
                color: "#ffffff",
                fontFamily: fontDisplay,
                fontWeight: 700,
                fontSize: "12.5px",
                padding: "6px 14px",
                borderRadius: "7px",
                textDecoration: "none",
                boxShadow: `0 2px 12px -2px ${colors.purpleGlow}`,
                transition: "all 0.2s ease",
              }}
            >
              <span>Live Demo</span>
              <span style={{ fontSize: "13px" }}>↗</span>
            </motion.a>
          </div>
        </div>

        {/* Short Description */}
        <p style={{ color: colors.inkDim, fontSize: "14px", lineHeight: 1.65, margin: "0 0 16px", maxWidth: "980px" }}>
          {p.shortDesc}
        </p>

        {/* Highlights - Compact List */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "8px 18px", marginBottom: "18px", background: "rgba(9,8,25,0.55)", border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "14px 16px" }}>
          {(expanded ? p.highlights : p.highlights.slice(0, 4)).map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <span style={{ color: colors.purpleBright, fontSize: "12px", marginTop: "2px", userSelect: "none" }}>▹</span>
              <span style={{ color: colors.ink, fontSize: "13px", lineHeight: 1.5 }}>
                {h}
              </span>
            </div>
          ))}
        </div>

        {/* Footer: Tech Stack & Expand Toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderTop: `1px solid ${colors.border}`, paddingTop: "14px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {p.technologies.map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.08, y: -2, borderColor: colors.purpleBright, color: colors.purpleBright }}
                transition={{ type: "spring", stiffness: 350 }}
                style={{
                  fontFamily: fontMono,
                  fontSize: "11px",
                  color: colors.indigoBright,
                  background: "rgba(9, 8, 25, 0.7)",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "6px",
                  padding: "3px 8px",
                  display: "inline-block",
                  cursor: "default",
                  transition: "all 0.2s"
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "transparent",
                border: "none",
                color: colors.purpleBright,
                fontFamily: fontMono,
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 8px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {expanded ? "Show less ↑" : `+${p.highlights.length - 4} more points ↓`}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ── 5. Background / Education Section ─────────────────────────────
function Background() {
  return (
    <section id="background" style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <SectionLabel>EDUCATION</SectionLabel>
      <Reveal>
        <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(26px, 3.5vw, 36px)", color: colors.ink, margin: "0 0 14px" }}>
          Academic Journey
        </h2>
        <p style={{ color: colors.inkDim, fontSize: "15px", maxWidth: "600px", lineHeight: 1.6, marginBottom: "36px" }}>
          Educational qualifications and milestones in computer science and foundational schooling.
        </p>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "900px" }}>
        {EDUCATION_DATA.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.12 }}
            transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 6 }}
            style={{
              background: "linear-gradient(160deg, rgba(20, 18, 48, 0.6), rgba(9, 8, 24, 0.8))",
              border: `1px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "22px 28px",
              borderLeft: `4px solid ${colors.purpleBright}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              backdropFilter: "blur(10px)",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.purpleBright;
              e.currentTarget.style.boxShadow = `0 8px 24px -6px ${colors.purpleGlow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div>
              <h3 style={{ fontFamily: fontDisplay, fontSize: "19px", fontWeight: 700, color: colors.ink, margin: "0 0 6px" }}>
                {item.title}
              </h3>
              <div style={{ fontFamily: fontBody, fontStyle: "italic", fontSize: "14px", color: colors.inkDim }}>
                {item.institution}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: fontMono, fontSize: "14px", fontWeight: 600, color: colors.purpleBright }}>
                {item.period}
              </div>
              <div style={{ fontFamily: fontMono, fontSize: "13px", color: colors.inkDim, marginTop: "4px" }}>
                {item.location}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── 6. Contact Section ────────────────────────────────────────────
function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ padding: "80px 40px 110px", maxWidth: "1200px", margin: "0 auto" }}>
      <SectionLabel>CONTACT</SectionLabel>
      <Reveal>
        <div
          style={{
            background: "linear-gradient(160deg, rgba(20, 18, 48, 0.75), rgba(9, 8, 24, 0.9))",
            border: `1px solid ${colors.border}`,
            borderRadius: "18px",
            padding: "clamp(26px, 4vw, 44px)",
            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.6)",
            backdropFilter: "blur(14px)",
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.purpleBright)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.border)}
        >
          {/* Pill Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: `2px solid ${colors.purpleBright}`,
              borderRadius: "999px",
              padding: "6px 18px",
              marginBottom: "24px",
              background: "rgba(168, 85, 247, 0.1)",
              boxShadow: `0 0 20px -5px ${colors.purpleGlow}`,
            }}
          >
            <span
              style={{
                fontFamily: fontDisplay,
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: colors.purpleBright,
                textTransform: "uppercase",
              }}
            >
              GET IN TOUCH
            </span>
            <span
              style={{
                fontFamily: fontDisplay,
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: colors.ink,
                textTransform: "uppercase",
              }}
            >
              LET'S CONNECT
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: fontDisplay,
              fontSize: "clamp(28px, 4.5vw, 48px)",
              fontWeight: 800,
              color: colors.ink,
              lineHeight: 1.08,
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
              maxWidth: "750px",
            }}
          >
            HAVE A PROJECT OR DATASET IN MIND?{" "}
            <span style={{ color: colors.purpleBright }}>LET'S ANALYZE IT.</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              color: colors.inkDim,
              fontSize: "15.5px",
              maxWidth: "600px",
              lineHeight: 1.65,
              margin: "0 0 32px",
            }}
          >
            Reach out directly for freelance analytics, full-stack development, or full-time opportunities.
          </p>

          {/* Contact Channels Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              marginBottom: "26px",
            }}
          >
            {/* WhatsApp Card */}
            <motion.a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5, borderColor: colors.purpleBright, backgroundColor: colors.bgCardHover, boxShadow: `0 10px 24px -6px ${colors.purpleGlow}` }}
              transition={{ type: "spring", stiffness: 350 }}
              style={{
                background: "rgba(9,8,25,0.65)",
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                padding: "18px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  style={{ padding: "10px", borderRadius: "10px", background: "rgba(168,85,247,0.12)", color: colors.purpleBright, display: "flex" }}
                >
                  <Icons.WhatsApp />
                </motion.div>
                <div>
                  <div style={{ fontFamily: fontDisplay, fontSize: "16px", fontWeight: 700, color: colors.ink }}>
                    WhatsApp
                  </div>
                  <div style={{ fontFamily: fontMono, fontSize: "12px", color: colors.inkDim, marginTop: "2px" }}>
                    +91 8129867183 ↗
                  </div>
                </div>
              </div>
              <motion.span whileHover={{ x: 4 }} style={{ color: colors.purpleBright, fontFamily: fontMono, fontSize: "14px" }}>
                →
              </motion.span>
            </motion.a>

            {/* LinkedIn Card */}
            <motion.a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5, borderColor: colors.purpleBright, backgroundColor: colors.bgCardHover, boxShadow: `0 10px 24px -6px ${colors.purpleGlow}` }}
              transition={{ type: "spring", stiffness: 350 }}
              style={{
                background: "rgba(9,8,25,0.65)",
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                padding: "18px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -6 }}
                  style={{ padding: "10px", borderRadius: "10px", background: "rgba(168,85,247,0.12)", color: colors.purpleBright, display: "flex" }}
                >
                  <Icons.Linkedin />
                </motion.div>
                <div>
                  <div style={{ fontFamily: fontDisplay, fontSize: "16px", fontWeight: 700, color: colors.ink }}>
                    LinkedIn
                  </div>
                  <div style={{ fontFamily: fontMono, fontSize: "12px", color: colors.inkDim, marginTop: "2px" }}>
                    in/nelbin-nelson ↗
                  </div>
                </div>
              </div>
              <motion.span whileHover={{ x: 4 }} style={{ color: colors.purpleBright, fontFamily: fontMono, fontSize: "14px" }}>
                →
              </motion.span>
            </motion.a>

            {/* Email Card */}
            <motion.a
              href={`mailto:${CONTACT.email}`}
              whileHover={{ y: -5, borderColor: colors.purpleBright, backgroundColor: colors.bgCardHover, boxShadow: `0 10px 24px -6px ${colors.purpleGlow}` }}
              transition={{ type: "spring", stiffness: 350 }}
              style={{
                background: "rgba(9,8,25,0.65)",
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                padding: "18px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  style={{ padding: "10px", borderRadius: "10px", background: "rgba(168,85,247,0.12)", color: colors.purpleBright, display: "flex" }}
                >
                  <Icons.Mail />
                </motion.div>
                <div>
                  <div style={{ fontFamily: fontDisplay, fontSize: "16px", fontWeight: 700, color: colors.ink }}>
                    Email
                  </div>
                  <div style={{ fontFamily: fontMono, fontSize: "12px", color: colors.inkDim, marginTop: "2px" }}>
                    {CONTACT.email}
                  </div>
                </div>
              </div>
              <motion.span whileHover={{ x: 4 }} style={{ color: colors.purpleBright, fontFamily: fontMono, fontSize: "14px" }}>
                →
              </motion.span>
            </motion.a>
          </div>

          {/* Copy Email Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: `1px solid ${colors.border}`, paddingTop: "18px" }}>
            <span style={{ fontFamily: fontMono, fontSize: "13px", color: colors.inkDim }}>
              Prefer email?
            </span>
            <motion.button
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.04, backgroundColor: colors.purpleBright, color: "#ffffff" }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "rgba(168,85,247,0.12)",
                border: `1px solid rgba(168,85,247,0.3)`,
                color: colors.purpleBright,
                borderRadius: "8px",
                padding: "8px 16px",
                fontFamily: fontMono,
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {copied ? "✓ Copied Email to Clipboard" : "Copy Email Address"}
            </motion.button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── Interactive Background FX & Dynamic Mouse Light ──────────────
function BackgroundFX() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleClick = (e) => {
      const newRipple = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 900);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // Pre-calculated floating background stardust coordinates
  const particles = [
    { top: "12%", left: "15%", size: 3, delay: 0, color: colors.purpleBright },
    { top: "25%", left: "82%", size: 4, delay: 1.5, color: colors.indigoBright },
    { top: "38%", left: "28%", size: 2.5, delay: 3, color: colors.lavender },
    { top: "50%", left: "92%", size: 3.5, delay: 0.8, color: colors.purpleBright },
    { top: "65%", left: "12%", size: 3, delay: 2.2, color: colors.indigoBright },
    { top: "78%", left: "76%", size: 4, delay: 4, color: colors.lavender },
    { top: "88%", left: "48%", size: 2.5, delay: 1.2, color: colors.purpleBright },
    { top: "18%", left: "55%", size: 3, delay: 2.8, color: colors.indigoBright },
    { top: "92%", left: "18%", size: 3.5, delay: 3.4, color: colors.lavender },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {/* Floating Ambient Stardust Nodes */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.75, 0.2],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: 5 + (i % 3) * 2,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 12px ${p.color}`,
          }}
        />
      ))}

      {/* Primary Responsive Mouse Spotlight */}
      <motion.div
        animate={{
          x: mousePos.x - 350,
          y: mousePos.y - 350,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 28, stiffness: 220, mass: 0.35 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(168, 85, 247, 0.14) 0%, rgba(99, 102, 241, 0.07) 35%, rgba(13, 13, 36, 0.02) 65%, transparent 75%)`,
        }}
      />

      {/* Secondary Lagging Aurora Trail (Fluid dual-glow) */}
      <motion.div
        animate={{
          x: mousePos.x - 225,
          y: mousePos.y - 225,
          opacity: isHovering ? 0.8 : 0,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 120, mass: 0.8 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.13) 0%, rgba(168, 85, 247, 0.05) 45%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Focused Inner Plasma Core */}
      <motion.div
        animate={{
          x: mousePos.x - 60,
          y: mousePos.y - 60,
          opacity: isHovering ? 0.9 : 0,
        }}
        transition={{ type: "spring", damping: 18, stiffness: 450, mass: 0.15 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(192, 132, 252, 0.24) 0%, rgba(99, 102, 241, 0.1) 40%, transparent 75%)`,
          filter: "blur(6px)",
        }}
      />

      {/* Click Shockwave Ripples */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ width: 0, height: 0, opacity: 0.75, x: r.x, y: r.y }}
          animate={{
            width: 280,
            height: 280,
            opacity: 0,
            x: r.x - 140,
            y: r.y - 140,
          }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "50%",
            border: `1.5px solid ${colors.purpleBright}`,
            boxShadow: `0 0 25px ${colors.purpleGlow}, inset 0 0 15px ${colors.purpleGlow}`,
          }}
        />
      ))}
    </div>
  );
}

// ── Main Page Assembly ────────────────────────────────────────────
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (const sectionId of NAV_LINKS) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse at top, #141238 0%, #0c0b22 40%, #06050e 85%)`,
        fontFamily: fontBody,
        color: colors.ink,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        ::selection { background: ${colors.purpleBright}; color: #ffffff; }
      `}</style>

      {/* Dynamic Cursor Light, Cyber Grid & Ambient Particles */}
      <BackgroundFX />

      {/* Permanent Fixed Navigation Header */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 40px",
          fontFamily: fontMono,
          fontSize: "13px",
          color: colors.inkDim,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(8, 7, 18, 0.88)",
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: "0 4px 24px -4px rgba(0, 0, 0, 0.6)",
          zIndex: 100,
          boxSizing: "border-box",
        }}
      >
        <a href="#home" style={{ color: colors.ink, textDecoration: "none", fontWeight: 700, fontFamily: fontDisplay, fontSize: "15px" }}>
          nelbin-nelson<span style={{ color: colors.purpleBright }}>.dev</span>
        </a>

        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              style={{
                color: activeNav === item ? colors.purpleBright : colors.inkDim,
                textDecoration: "none",
                textTransform: "capitalize",
                fontWeight: activeNav === item ? 600 : 400,
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.purpleBright)}
              onMouseLeave={(e) => (e.currentTarget.style.color = activeNav === item ? colors.purpleBright : colors.inkDim)}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Sections matching every NAV_LINK */}
      <main style={{ position: "relative", zIndex: 10, paddingTop: "50px" }}>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Background />
        <Contact />
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "30px 20px", color: colors.inkDim, fontFamily: fontMono, fontSize: "12px", borderTop: `1px solid ${colors.border}`, position: "relative", zIndex: 10 }}>
        built by Nelbin Nelson · Data Analyst
      </footer>
    </div>
  );
}
