import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Github, Linkedin, Instagram, Mail, Download, ArrowRight,
  Camera, ExternalLink, Menu, X, GraduationCap, CheckCircle2,
  Code2, BrainCircuit, Sparkles, Terminal, GitBranch, MessageSquareCode
} from "lucide-react";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Photography", "Contact"];

const STATS = [
  { value: "2+", label: "AI Projects" },
  { value: "4", label: "Yrs AIML Education" },
  { value: "2026", label: "Graduate" },
  { value: "Hyderabad", label: "India" },
];

const FOCUS_TAGS = [
  "Generative AI",
  "Deep Learning",
  "Machine Learning",
  "Building Real-World AI Projects",
  "Open to AI/ML Opportunities",
];

const JOURNEY = [
  "Started with Machine Learning, grasping core data science concepts.",
  "Exploring Generative AI, building intelligent chatbot applications.",
  "Continuously learning modern deep learning architectures.",
  "Alongside my technical journey, photography and visual storytelling help me bring creativity into everything I create.",
];

const SKILLS = [
  { name: "Python", icon: Code2 },
  { name: "Machine Learning", icon: BrainCircuit },
  { name: "Deep Learning", icon: Sparkles },
  { name: "Generative AI", icon: MessageSquareCode },
  { name: "Linux", icon: Terminal },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: Github },
  { name: "Prompt Engineering", icon: BrainCircuit },
];

const PROJECTS = [
  {
    title: "Gemini AI Chat Bot",
    desc: "A conversational assistant built on Google's Gemini API with a React front end and a Python service layer for context handling.",
    tags: ["Generative AI", "Gemini API", "React", "Python"],
    image: "/projects/gemini-chatbot.jpg",
    color: "from-blue-500/20 to-cyan-500/10",
    github: "https://github.com/svk-19/Gemini-AI-Assistant",
    demo: "https://gemini-ai-assistant-iq7fvbgzzpw43mnfxexgbt.streamlit.app/",
  },
  {
    title: "Road Accident Severity Prediction",
    desc: "A machine learning model that classifies accident severity from historical traffic data to support road-safety analysis.",
    tags: ["Machine Learning", "Data Science", "Python"],
    image: "/projects/accident-prediction.jpg",
    color: "from-indigo-500/20 to-blue-500/10",
  },
  {
    title: "Doc AI with RAG Pipeline",
    desc: "AI-powered document assistant built with a RAG pipeline, FAISS, Sentence Transformers, and Gemini 2.5 Flash for document Q&A, summarization, semantic search, and conversational memory.",
    tags: ["RAG", "Gemini 2.5", "FAISS", "Python"],
    image: "/projects/svk-docai.jpg",
    color: "from-sky-500/20 to-indigo-500/10",
    github: "https://github.com/svk-19/svk-doc-ai",
    demo: "https://svk-doc-ai-jrr2lfuojcmd46bvtthbqx.streamlit.app/",
  },
];

const PHOTO_CATEGORIES = ["All", "Portrait", "Nature", "Street", "Cinematic"];

const PHOTOS = [
  { id: 1, category: "Portrait", image: "/photos/potrait1.jpg" },
  { id: 2, category: "Portrait", image: "/photos/potrait2.jpg" },
  { id: 3, category: "Nature", image: "/photos/nature1.jpg" },
  { id: 4, category: "Nature", image: "/photos/nature2.jpg" },
  { id: 5, category: "Street", image: "/photos/street1.jpg" },
  { id: 6, category: "Street", image: "/photos/street2.jpg" },
  { id: 7, category: "Cinematic", image: "/photos/cinematic1.jpg" },
  { id: 8, category: "Cinematic", image: "/photos/cinematic2.jpg" },
];

/* ---------------------------------------------------------
   MOUSE-TRACKING BACKGROUND GLOW
--------------------------------------------------------- */

function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 40, stiffness: 60 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 60 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(56, 130, 246, 0.10), transparent 70%)`,
      }}
    />
  );
}

/* ---------------------------------------------------------
   NAVBAR
--------------------------------------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl"
    >
      <div
        className={`flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg px-5 py-3 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_0_30px_-10px_rgba(56,130,246,0.4)]" : ""
        }`}
      >
        <button
          onClick={() => scrollTo("home")}
          className="text-sm font-semibold tracking-tight text-white/90 shrink-0"
        >
          SVK<span className="text-blue-400">.</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="px-3.5 py-1.5 text-[13px] text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
            >
              {link}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-white/80"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            className="md:hidden mt-2 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-lg overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ---------------------------------------------------------
   HERO
--------------------------------------------------------- */

function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-blue-400 font-medium mb-5"
          >
            AIML Graduate &middot; Generative AI Enthusiast &middot; RAG Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-6"
          >
            Sunnapu
            <br />
            <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
              Vamshi Krishna
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-white/50 max-w-xl mb-10 leading-relaxed"
          >
            AIML Graduate &mdash; Exploring Generative AI &amp; Deep Learning
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-400 transition-all duration-300 shadow-[0_0_25px_-5px_rgba(56,130,246,0.6)]"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/resume.pdf"
              download="Sunnapu_Vamshi_Krishna_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-lg text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/25 transition-all duration-300"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="border-l border-white/10 pl-4">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-transparent" />
            <img
              src="/profile.png"
              alt="Sunnapu Vamshi Krishna"
              className="w-full h-full object-cover mix-blend-luminosity opacity-90"
            />
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
          </div>
          <div className="absolute -inset-4 rounded-full border border-blue-400/20 animate-pulse-slow" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   ABOUT
--------------------------------------------------------- */

function About() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium">About</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">Who I am</h2>
          <p className="text-white/55 leading-relaxed mb-10">
            I'm Vamshi Krishna, an AIML graduate passionate about Artificial Intelligence and
            Machine Learning. Currently, I'm exploring Generative AI and Deep Learning while
            AI-powered applications and practical machine learning projects. Alongside technology,
            I enjoy photography, cinematic editing, and visual storytelling, combining creativity
            with problem-solving to create meaningful experiences.
          </p>

          <h3 className="text-sm font-semibold text-white/80 mb-4">Current Focus</h3>
          <div className="flex flex-wrap gap-2.5">
            {FOCUS_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-xs text-white/70 bg-white/5 border border-white/10 backdrop-blur-lg hover:border-blue-400/30 hover:text-white transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium">Timeline</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-8">My journey</h2>

          <div className="relative pl-8 border-l border-white/10 space-y-8">
            {JOURNEY.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[34px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_2px_rgba(56,130,246,0.5)]" />
                <p className="text-white/60 leading-relaxed text-sm md:text-base">{line}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   SKILLS
--------------------------------------------------------- */

function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium">Toolkit</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Skills &amp; technologies</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 flex flex-col items-center gap-3 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/[0.07] transition-colors duration-300" />
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 [box-shadow:0_0_30px_-5px_rgba(56,130,246,0.5)_inset]" />
                <div className="relative w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-300">
                  <Icon size={20} />
                </div>
                <span className="relative text-sm font-medium text-white/80">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   EDUCATION
--------------------------------------------------------- */

function Education() {
  return (
    <section id="education" className="relative py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-300 shrink-0">
            <GraduationCap size={26} />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-xs font-medium text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                2022 &mdash; 2026
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/20">
                <CheckCircle2 size={13} />
                Graduation Completed
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
              Bachelor of Technology (B.Tech)
            </h3>
            <p className="text-blue-300/90 text-sm md:text-base mb-1">
              Artificial Intelligence &amp; Machine Learning
            </p>
            <p className="text-white/45 text-sm">
              Hyderabad Institute of Technology and Management (HITAM)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   PROJECTS
--------------------------------------------------------- */

function Projects() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium">Selected work</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg overflow-hidden flex flex-col"
            >
              <div
                className="overflow-hidden cursor-zoom-in"
                onClick={() => setLightbox(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300/90 border border-blue-400/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
                  >
                    <Github size={14} /> Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROJECTS LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>

            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={lightbox.image}
              alt={lightbox.title}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white font-medium text-sm">{lightbox.title}</p>
              <p className="text-white/40 text-xs mt-1">{lightbox.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------------------------------------------------
   PHOTOGRAPHY
--------------------------------------------------------- */

function Photography() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === "All" ? PHOTOS : PHOTOS.filter((p) => p.category === filter);

  return (
    <section id="photography" className="relative py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Camera size={18} className="text-blue-400" />
            <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium">Gallery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Through the lens</h2>
        </motion.div>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {PHOTO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                filter === cat
                  ? "bg-blue-500 text-white border-blue-500 shadow-[0_0_20px_-5px_rgba(56,130,246,0.6)]"
                  : "bg-white/5 text-white/55 border-white/10 hover:border-white/25 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightbox(photo)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 cursor-pointer"
              >
                <img
                  src={photo.image}
                  alt={`${photo.category} photography`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* PHOTOGRAPHY LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>

            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={lightbox.image}
              alt={lightbox.category}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-white/50">
              {lightbox.category}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------------------------------------------------
   CONTACT + FOOTER
--------------------------------------------------------- */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    emailjs
      .send(
        "service_8jwlrtr",
        "template_58y84f6",
        {
          name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "voHx0IxVXmL1XVTx6"
      )
      .then(
        () => {
          setSent(true);
          setTimeout(() => setSent(false), 3000);
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error(error);
          alert("Failed to send message");
        }
      );
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 md:p-12 grid md:grid-cols-2 gap-12"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium">Get in touch</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">Let's connect</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Open to AI/ML opportunities, collaborations, and conversations about generative AI
              or visual storytelling. Reach out anytime.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: "vamshikrishna200419@gmail.com", href: "mailto:vamshikrishna200419@gmail.com" },
                { icon: Github, label: "github.com/svk-19", href: "https://github.com/svk-19" },
                { icon: Linkedin, label: "linkedin.com/in/vamshi-krishna-93358827a", href: "https://www.linkedin.com/in/vamshi-krishna-93358827a?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-400/30 group-hover:bg-blue-500/10 transition-colors">
                      <Icon size={15} />
                    </span>
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400/40 transition-colors"
            />
            <input
              type="email"
              required
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400/40 transition-colors"
            />
            <textarea
              required
              rows={4}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400/40 transition-colors resize-none"
            />
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-400 transition-all duration-300 shadow-[0_0_25px_-5px_rgba(56,130,246,0.6)]"
            >
              {sent ? "Message sent" : "Send message"}
            </button>
          </form>
        </motion.div>
      </div>

      <div className="text-center mt-16 text-xs text-white/30">
        Designed &amp; Developed by Sunnapu Vamshi Krishna
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   ROOT APP
--------------------------------------------------------- */

export default function App() {
  return (
    <div className="relative bg-[#050505] min-h-screen text-white antialiased overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #3a3a3a; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>

      <CursorGlow />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Photography />
        <Contact />
      </main>
    </div>
  );
}
