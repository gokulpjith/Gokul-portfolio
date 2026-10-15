import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Database, Wrench, Briefcase,
  GraduationCap, Award, Mail, Phone, Linkedin,
  Github, ExternalLink, Cpu, Zap,
  CheckCircle, Copy, Sparkles, Gamepad2, RotateCcw,
  User, FolderOpen, BookOpen, BarChart2, Activity, Terminal,
  Layers, ShieldCheck, Compass
} from 'lucide-react';
import CyberSnake from './components/CyberSnake';
import HackingLoader from './components/HackingLoader';
import SkillsSection from './components/SkillsSection';
import LayeredCard from './components/LayeredCard';

/* ── Floating particle component ── */
function Particle({ style }) {
  return <div className="particle" style={style} />;
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  style: {
    left: `${Math.random() * 100}%`,
    width: `${2 + Math.random() * 4}px`,
    height: `${2 + Math.random() * 4}px`,
    background: ['#7c3aed', '#06b6d4', '#10b981', '#f43f5e', '#f59e0b'][i % 5],
    opacity: 0.4 + Math.random() * 0.3,
    animationDuration: `${12 + Math.random() * 20}s`,
    animationDelay: `${-Math.random() * 20}s`,
  }
}));

const TABS = [
  { id: 'about',      label: 'About',      icon: User },
  { id: 'skills',     label: 'Skills',     icon: Code2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects',   label: 'Projects',   icon: FolderOpen },
  { id: 'education',  label: 'Education',  icon: BookOpen },
];

/* ── Multi-Plane Layered Animation Variants ── */
const layerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    }
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.22 }
  }
};

const layerItemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
  }
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleTabChange = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const tick = () => setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('gokulprem2016@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: '#03050f', color: '#f0f4ff' }}>

      {/* Cyber Hacking Terminal Intro Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <HackingLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Ambient Aurora Orbs (Smooth CSS float animation) */}
      <div className="aurora-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {/* Floating particles */}
      {PARTICLES.map(p => <Particle key={p.id} style={p.style} />)}

      {/* Top status bar */}
      <div className="relative z-40 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(3,5,15,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center text-xs" style={{ color: '#7c8aa0' }}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5" style={{ color: '#10b981' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Activity size={11} style={{ color: '#7c3aed' }} />
              Kerala, India
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs" style={{ color: '#06b6d4' }}>{currentTime}</span>
            <button
              onClick={() => setIsLoading(true)}
              title="Replay Cyber Terminal Boot Sequence"
              className="glow-badge hover:bg-purple-900/40 transition-all duration-200 cursor-pointer flex items-center gap-1.5 font-mono text-[10px]"
              style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)', color: '#c084fc' }}
            >
              <Terminal size={11} className="text-cyan-400" />
              <span>RE-BOOT</span>
            </button>
            <span className="hidden sm:inline glow-badge" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa' }}>
              v3.2 · layered
            </span>
          </div>
        </div>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(3,5,15,0.8)', backdropFilter: 'blur(24px)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.23,1,0.32,1] }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleTabChange('about')}
          >
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2" style={{ borderColor: '#03050f' }} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white" style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>Gokul P Jith</h1>
              <p className="text-xs gradient-text-aurora" style={{ fontWeight: 600 }}>B.Tech CSE · AI & Software Engineer</p>
            </div>
          </motion.div>

          <nav className="flex gap-1.5 flex-wrap justify-center">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`nav-${id}`}
                onClick={() => handleTabChange(id)}
                className={`nav-btn flex items-center gap-1.5 ${activeTab === id ? 'active' : ''}`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Container with Multi-Plane Layered Animation */}
      <main className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <AnimatePresence mode="wait">

          {/* ════════════ ABOUT TAB (LAYERED) ════════════ */}
          {activeTab === 'about' && (
            <motion.section
              key="about"
              variants={layerContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {/* Layer 1: Hero Showcase Card */}
              <motion.div variants={layerItemVariants}>
                <LayeredCard glowColor="#7c3aed" className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Left Column: Bio & Hero Text */}
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                        style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#c084fc' }}>
                        <Layers size={13} className="text-purple-400" />
                        <span>Portfolio 2026</span>
                      </div>
                      <h2 className="hero-title text-4xl md:text-5xl text-white mb-3 mt-1">
                        Turning Logic Into<br />
                        <span className="gradient-text-aurora">Scalable Solutions</span>
                      </h2>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                        Highly motivated B.Tech CSE student with a strong passion for software engineering and modern system design. I build efficient applications that solve real-world problems through clean code, AI-powered tooling, and scalable architecture.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={copyEmail}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                          style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: 'white', boxShadow: '0 0 25px rgba(124,58,237,0.35)' }}
                        >
                          {copiedEmail ? <CheckCircle size={15} /> : <Copy size={15} />}
                          {copiedEmail ? 'Copied!' : 'Copy Email'}
                        </button>
                      </div>
                    </div>

                    {/* Right Column: 3D Flip Profile & Arcade Game Card */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4 w-full md:w-auto">
                      <div className="flip-card-perspective" style={{ width: 260, height: 320 }}>
                        <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                          {/* Front Side: Profile Photo (Clean, unobstructed) */}
                          <div
                            className="flip-card-face flip-card-front cursor-pointer group"
                            onClick={() => setIsFlipped(true)}
                            title="Click to rotate and play game!"
                            style={{
                              borderRadius: 20,
                              padding: 2,
                              background: 'linear-gradient(135deg, #7c3aed, #06b6d4, #10b981)',
                              boxShadow: '0 0 35px rgba(124,58,237,0.3)',
                            }}
                          >
                            <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 18, background: '#070b1e' }}>
                              <img
                                src="/profile.webp"
                                alt="Gokul P Jith"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  objectPosition: 'top center',
                                  display: 'block',
                                  transition: 'transform 0.5s ease',
                                }}
                                className="group-hover:scale-105"
                              />

                              {/* Status badge top-left */}
                              <div
                                className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md"
                                style={{ background: 'rgba(3,5,15,0.75)', border: '1px solid rgba(16,185,129,0.4)', color: '#34d399' }}
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span>Available</span>
                              </div>
                            </div>
                          </div>

                          {/* Back Side: Cyber Snake Arcade */}
                          <div
                            className="flip-card-face flip-card-back shadow-2xl"
                            style={{
                              borderRadius: 20,
                              border: '1px solid rgba(124,58,237,0.4)',
                              boxShadow: '0 0 35px rgba(6,182,212,0.25)',
                              background: '#070b1e',
                            }}
                          >
                            <CyberSnake onFlipBack={() => setIsFlipped(false)} />
                          </div>
                        </div>
                      </div>

                      {/* Quick flip toggle button */}
                      <button
                        onClick={() => setIsFlipped(f => !f)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                        style={{
                          background: isFlipped ? 'rgba(6,182,212,0.15)' : 'rgba(124,58,237,0.15)',
                          border: `1px solid ${isFlipped ? 'rgba(6,182,212,0.3)' : 'rgba(124,58,237,0.3)'}`,
                          color: isFlipped ? '#38bdf8' : '#c084fc',
                        }}
                      >
                        {isFlipped ? <RotateCcw size={12} /> : <Gamepad2 size={12} />}
                        <span>{isFlipped ? 'Rotate to Photo' : 'Rotate to Play Game'}</span>
                      </button>

                      {/* Layered Status Badges */}
                      <div className="grid grid-cols-2 gap-2 w-[260px]">
                        {[
                          { label: 'Status', value: 'Available', color: '#10b981' },
                          { label: 'Focus', value: 'AI + Dev', color: '#7c3aed' },
                          { label: 'Degree', value: 'B.Tech CSE', color: '#06b6d4' },
                          { label: 'Location', value: 'Kerala, IN', color: '#f59e0b' },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="layered-chip rounded-xl p-2.5 text-center">
                            <p className="text-[10px] mb-0.5" style={{ color: '#7c8aa0' }}>{label}</p>
                            <p className="text-[11px] font-bold" style={{ color }}>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </LayeredCard>
              </motion.div>

              {/* Layer 2: Interactive Layered Contact Cards */}
              <motion.div variants={layerItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Mail, label: 'gokulprem2016@gmail.com', color: '#7c3aed', href: 'mailto:gokulprem2016@gmail.com' },
                  { icon: Phone, label: '+91-8075240566', color: '#06b6d4', href: 'tel:+918075240566' },
                  { icon: Linkedin, label: 'linkedin.com/in/gokul-p-jith', color: '#10b981', href: 'https://linkedin.com/in/gokul-p-jith' },
                  { icon: Github, label: 'github.com/gokulpjith', color: '#f43f5e', href: 'https://github.com/gokulpjith' },
                ].map(({ icon: Icon, label, color, href }, idx) => (
                  <LayeredCard key={label} glowColor={color} delay={idx * 0.05} className="w-full">
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-4 group w-full"
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                      >
                        <Icon size={16} style={{ color }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>{label}</span>
                      <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
                    </a>
                  </LayeredCard>
                ))}
              </motion.div>

              {/* Layer 3: Layered Feature Depth Cards */}
              <motion.div variants={layerItemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Zap, title: 'Modern Architectures', desc: 'Clean modular pipelines spanning frontends, backends, and offline-first edge state.', color: '#7c3aed' },
                  { icon: Cpu, title: 'AI & Intelligence', desc: 'Hands-on with LLM orchestration, LangChain, FastMCP, predictive modeling & TensorFlow.', color: '#06b6d4' },
                  { icon: Gamepad2, title: 'Arcade Easter Egg', desc: 'Interactive Cyber Snake mini-game built right into the profile card. Click the photo to rotate and play!', color: '#10b981' },
                ].map(({ icon: Icon, title, desc, color }, i) => (
                  <LayeredCard key={i} glowColor={color} delay={i * 0.08} className="p-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${color}18`, border: `1px solid ${color}35` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#7c8aa0' }}>{desc}</p>
                  </LayeredCard>
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* ════════════ SKILLS TAB (LAYERED) ════════════ */}
          {activeTab === 'skills' && (
            <motion.section
              key="skills"
              variants={layerContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="section-label">Skills & Competencies</div>
              <motion.div variants={layerItemVariants}>
                <LayeredCard glowColor="#06b6d4" className="p-6 md:p-8">
                  <SkillsSection />
                </LayeredCard>
              </motion.div>
            </motion.section>
          )}

          {/* ════════════ EXPERIENCE TAB (LAYERED) ════════════ */}
          {activeTab === 'experience' && (
            <motion.section
              key="experience"
              variants={layerContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="section-label">Work Experience</div>
              <motion.div variants={layerItemVariants}>
                <LayeredCard glowColor="#06b6d4" className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #7c3aed25, #06b6d425)', border: '1px solid rgba(124,58,237,0.35)' }}>
                        <Briefcase size={22} style={{ color: '#a78bfa' }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">Data Science & ML Intern</h3>
                        <p className="font-medium" style={{ color: '#06b6d4' }}>Techmaghi</p>
                      </div>
                    </div>
                    <span className="glow-badge self-start" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}>
                      <span className="pulse-dot w-1.5 h-1.5" style={{ background: '#10b981' }} />
                      Jun 2025 – Jun 2026
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                    Engaged in modern data processing pipelines, predictive modeling, and data analytics workflows utilizing industry-standard machine learning stacks. Collaborating on system efficiency, data validation algorithms, and automated insight generation.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['Data Pipelines', 'Predictive Modeling', 'Data Analytics', 'ML Workflows', 'TensorFlow', 'Python'].map(tag => (
                      <span key={tag} className="layered-chip skill-pill" style={{ borderColor: 'rgba(124,58,237,0.2)' }}>{tag}</span>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#7c8aa0' }}>
                      <BarChart2 size={14} style={{ color: '#7c3aed' }} />
                      Actively contributing to AI/ML internship
                    </div>
                  </div>
                </LayeredCard>
              </motion.div>
            </motion.section>
          )}

          {/* ════════════ PROJECTS TAB (LAYERED) ════════════ */}
          {activeTab === 'projects' && (
            <motion.section
              key="projects"
              variants={layerContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="section-label">Featured Projects</div>
              <motion.div variants={layerItemVariants}>
                <LayeredCard glowColor="#10b981" className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', boxShadow: '0 0 30px rgba(16,185,129,0.3)' }}>
                        <Cpu size={26} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white hero-title">NutriDecide</h3>
                        <p className="text-sm font-medium mt-0.5" style={{ color: '#10b981' }}>Intelligent Health & Food Verdict Engine</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 self-start">
                      {[
                        { name: 'Flutter', color: '#06b6d4' },
                        { name: 'MongoDB', color: '#10b981' },
                        { name: 'Hive DB', color: '#f59e0b' },
                      ].map(({ name, color }) => (
                        <span key={name} className="glow-badge" style={{ background: `${color}15`, border: `1px solid ${color}35`, color }}>{name}</span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
                    A Flutter-based health app that analyzes packaged food products and delivers personalized suitability verdicts based on your unique health profile, goals, and conditions.
                  </p>

                  <ul className="space-y-2 mb-6">
                    {[
                      'Evaluates complex ingredient compositions against health profiles in real-time.',
                      'Dual-tier architecture: Offline-First Hive DB cache + Cloud Firestore sync.',
                      'High-fidelity responsive UI with instant barcode scanner verification.',
                    ].map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#7c8aa0' }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#10b981' }} />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <a href="https://github.com/gokulpjith" target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', boxShadow: '0 0 20px rgba(16,185,129,0.3)' }}>
                      <Github size={15} /> View on GitHub
                    </a>
                    <button
                      onClick={() => {
                        handleTabChange('about');
                        setIsFlipped(true);
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                      <Gamepad2 size={15} /> Play Arcade Game
                    </button>
                  </div>
                </LayeredCard>
              </motion.div>
            </motion.section>
          )}

          {/* ════════════ EDUCATION TAB (LAYERED) ════════════ */}
          {activeTab === 'education' && (
            <motion.section
              key="education"
              variants={layerContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-5"
            >
              <div className="section-label">Education & Achievements</div>

              {/* Layer 1: Main University Degree */}
              <motion.div variants={layerItemVariants}>
                <LayeredCard glowColor="#a855f7" className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #7c3aed25, #a855f725)', border: '1px solid rgba(124,58,237,0.35)' }}>
                      <GraduationCap size={22} style={{ color: '#a78bfa' }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">APJ Abdul Kalam Technological University</h3>
                      <p className="text-sm font-medium mt-0.5 gradient-text-aurora">
                        Bachelor of Technology — Computer Science Engineering
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#7c8aa0' }}>2023 – Present</p>
                    </div>
                  </div>
                  <div className="layered-chip rounded-xl p-4 text-sm">
                    <span className="font-semibold" style={{ color: '#a78bfa' }}>Core Courses: </span>
                    <span style={{ color: '#94a3b8' }}>Operating Systems, Data Structures, Artificial Intelligence, Web Programming, Compiler Design, Databases, Object Oriented Programming.</span>
                  </div>
                </LayeredCard>
              </motion.div>

              {/* Layer 2: Achievement Highlight */}
              <motion.div variants={layerItemVariants}>
                <LayeredCard glowColor="#f43f5e" className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)' }}>
                      <Award size={20} style={{ color: '#f43f5e' }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">FOSS FEST 2025 — Organizer</h3>
                      <p className="text-sm" style={{ color: '#7c8aa0' }}>FOSSClub CEKNPY · Free & Open Source Software Summit, Kerala</p>
                    </div>
                  </div>
                </LayeredCard>
              </motion.div>
            </motion.section>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t mt-20 py-8" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(3,5,15,0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ color: '#7c8aa0' }}>
          <p>© 2026 Gokul P Jith. Built with passion & caffeine.</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsLoading(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
              title="Replay Cyber Terminal Boot Screen"
            >
              <Terminal size={12} className="text-cyan-400" />
              <span>Reboot Sequence</span>
            </button>
            {[
              { href: 'https://github.com/gokulpjith', icon: Github },
              { href: 'https://linkedin.com/in/gokul-p-jith', icon: Linkedin },
              { href: 'mailto:gokulprem2016@gmail.com', icon: Mail },
            ].map(({ href, icon: Icon }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="social-link">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
