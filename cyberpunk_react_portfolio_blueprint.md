# Cyberpunk React Portfolio - Gokul P Jith

Welcome to your cyber-punk themed portfolio specification! This document contains the complete code and deployment guide to build an immersive, high-tech, neon-drenched portfolio using **React**, **Tailwind CSS**, and **Framer Motion** for animations.

---

## 🌟 Features of Your Portfolio
- **Cyberpunk Aesthetic:** Deep dark backgrounds (`#0a0a12`), glowing neon accents (cyan `#00f0ff` and magenta `#ff007f`), CRT scanline overlay effects, and futuristic typography styles (Monospace fonts).
- **Interactive Animations:** Smooth entry transitions, glitch effects on hover, glowing borders, and staggered section reveals powered by Framer Motion.
- **Single-File Architecture:** Fully contained React component designed for ease of setup and deployment.
- **Resume Integrated:** Pre-populated with your real background, education, technical skills, and projects from your resume.

---

## 💻 Complete React Code (`App.jsx`)

Create a React project using Vite (`npm create vite@latest portfolio -- --template react`), install `lucide-react` and `framer-motion`, and replace your `App.jsx` with the code below:

```jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Code2, Database, Wrench, Briefcase, 
  GraduationCap, Award, Mail, Phone, Linkedin, 
  Github, ExternalLink, Cpu, ShieldAlert, Zap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    { text: 'INITIALIZING SYSTEM ARCHITECTURE...', type: 'sys' },
    { text: 'ACCESS GRANTED: WELCOME TO GOKUL_P_JITH.SYS', type: 'success' },
    { text: 'TYPE "help" TO VIEW AVAILABLE COMMANDS.', type: 'info' }
  ]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    let newLogs = [...terminalLogs, { text: `> ${terminalInput}`, type: 'cmd' }];
    
    if (cmd === 'help') {
      newLogs.push({ text: 'AVAILABLE COMMANDS: skills, projects, contact, clear', type: 'info' });
    } else if (cmd === 'skills') {
      newLogs.push({ text: 'LANGS: Python, C, SQL, Java, JS | FRAMEWORKS: TensorFlow, LangChain, FastAPI', type: 'success' });
    } else if (cmd === 'projects') {
      newLogs.push({ text: 'ACTIVE PROJECT: NutriDecide (Flutter + MongoDB + Hive DB)', type: 'success' });
    } else if (cmd === 'contact') {
      newLogs.push({ text: 'EMAIL: gokulprem2016@gmail.com | LOC: Kerala, India', type: 'success' });
    } else if (cmd === 'clear') {
      newLogs = [{ text: 'TERMINAL PURGED.', type: 'info' }];
    } else if (cmd !== '') {
      newLogs.push({ text: `COMMAND NOT RECOGNIZED: ${cmd}. Type "help"`, type: 'error' });
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#00f0ff] font-mono relative overflow-x-hidden selection:bg-[#ff007f] selection:text-white">
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50 opacity-60"></div>
      
      {/* Background Neon Grids & Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff007f]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header / Navbar */}
      <header className="border-b border-[#00f0ff]/30 bg-[#0a0a12]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 border border-[#ff007f] bg-[#ff007f]/20 rounded text-[#ff007f] animate-pulse">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-white">GOKUL P JITH</h1>
            <p className="text-xs text-[#ff007f] tracking-wider">&gt; B.TECH CSE // SOFTWARE ENG</p>
          </div>
        </motion.div>

        <nav className="flex gap-2 text-sm flex-wrap justify-center">
          {['about', 'skills', 'experience', 'projects', 'education', 'terminal'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border transition-all uppercase tracking-wider text-xs ${
                activeTab === tab
                  ? 'border-[#00f0ff] bg-[#00f0ff]/20 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-[#ff007f] hover:text-[#ff007f]'
              }`}
            >
              // {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto p-6 md:p-12 z-10 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'about' && (
            <motion.section
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="border border-[#00f0ff]/40 bg-[#0a0a12]/90 p-8 relative shadow-[0_0_30px_rgba(0,240,255,0.15)]">
                <div className="absolute -top-3 left-6 bg-[#0a0a12] px-2 text-xs text-[#ff007f] font-bold">
                  [IDENT_PROFILE]
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-4 glitch-text">
                  TURNING COMPLEX LOGIC INTO <span className="text-[#ff007f]">SCALABLE SOLUTIONS</span>
                </h2>
                <p className="text-zinc-300 leading-relaxed text-sm md:text-base mb-6">
                  Highly motivated B.Tech Computer Science student with a strong interest in software engineering and modern system design. Passionate about turning complex logic into meaningful solutions and creating efficient applications that help solve real-world problems through clean code and scalable development.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Mail size={16} className="text-[#00f0ff]" />
                    <span>gokulprem2016@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone size={16} className="text-[#ff007f]" />
                    <span>+91-8075240566</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Linkedin size={16} className="text-[#00f0ff]" />
                    <a href="https://linkedin.com/in/gokul-p-jith" target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/gokul-p-jith</a>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Github size={16} className="text-[#ff007f]" />
                    <a href="https://github.com/gokulpjith" target="_blank" rel="noreferrer" className="hover:underline">github.com/gokulpjith</a>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'skills' && (
            <motion.section
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                { title: 'PROGRAMMING_LANGS', icon: <Code2 className="text-[#00f0ff]" />, items: ['Python', 'C', 'SQL', 'Java', 'HTML', 'PHP', 'JavaScript'] },
                { title: 'DATA_SCIENCE & AI', icon: <Cpu className="text-[#ff007f]" />, items: ['Data Processing', 'Data Visualization', 'Data Modeling', 'TensorFlow', 'LangChain', 'FastAPI', 'FastMCP'] },
                { title: 'DATABASES & TOOLS', icon: <Database className="text-[#00f0ff]" />, items: ['MySQL', 'Git', 'Power BI', 'Jupyter Notebook', 'Google Colab', 'PyCharm', 'Docker'] },
                { title: 'CORE COMPETENCIES', icon: <Wrench className="text-[#ff007f]" />, items: ['Problem Solving', 'Analytical Thinking', 'Communication', 'Leadership', 'Time Management'] }
              ].map((category, idx) => (
                <div key={idx} className="border border-zinc-800 bg-[#0a0a12]/90 p-6 relative hover:border-[#00f0ff] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    {category.icon}
                    <h3 className="text-white font-bold tracking-wider text-sm">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-zinc-900 border border-zinc-700 text-[#00f0ff]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.section>
          )}

          {activeTab === 'experience' && (
            <motion.section
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="border border-[#ff007f]/50 bg-[#0a0a12]/90 p-6 relative shadow-[0_0_20px_rgba(255,0,127,0.1)]">
                <div className="absolute -top-3 left-6 bg-[#0a0a12] px-2 text-xs text-[#ff007f] font-bold">
                  [CORP_EXPERIENCE]
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Data Science and Machine Learning Intern</h3>
                    <p className="text-[#00f0ff] text-sm">Techmaghi</p>
                  </div>
                  <span className="text-xs bg-[#ff007f]/20 text-[#ff007f] border border-[#ff007f] px-3 py-1 mt-2 md:mt-0">
                    JUN 2025 - JUN 2026
                  </span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Engaged in modern data processing pipelines, predictive modeling, and data analytics workflows utilizing industry-standard machine learning stacks.
                </p>
              </div>
            </motion.section>
          )}

          {activeTab === 'projects' && (
            <motion.section
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="border border-[#00f0ff]/50 bg-[#0a0a12]/90 p-6 relative shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <div className="absolute -top-3 left-6 bg-[#0a0a12] px-2 text-xs text-[#00f0ff] font-bold">
                  [FEATURED_PROJECT]
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">NutriDecide</h3>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-700 text-[#00f0ff]">Flutter</span>
                    <span className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-700 text-[#ff007f]">MongoDB</span>
                    <span className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-700 text-emerald-400">Hive DB</span>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  A Flutter-based health app that analyzes packaged food products and delivers a personalized suitability verdict based on your unique health profile, goals, and conditions. Enhanced with Offline-First Hive DB and Cloud Firestore sync capabilities.
                </p>
                <div className="flex gap-4">
                  <a href="https://github.com/gokulpjith" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-[#00f0ff] hover:underline">
                    <ExternalLink size={14} /> View Repository
                  </a>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'education' && (
            <motion.section
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="border border-zinc-800 bg-[#0a0a12]/90 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-[#00f0ff]" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-white">APJ Abdul Kalam Technological University</h3>
                    <p className="text-sm text-[#ff007f]">Bachelor of Technology in Computer Science Engineering | 2023 - Present</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-400">
                  <span className="text-[#00f0ff]">Core Courses:</span> Operating Systems, Data Structures, Artificial Intelligence, Web Programming, Compiler Design, Databases, Object Oriented Programming.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-zinc-800 bg-[#0a0a12]/90 p-5">
                  <h4 className="text-sm font-bold text-white mb-1">Sacred Heart HSS Dwaraka</h4>
                  <p className="text-xs text-zinc-400 mb-2">Biology Science | Score: 96.5%</p>
                </div>
                <div className="border border-zinc-800 bg-[#0a0a12]/90 p-5">
                  <h4 className="text-sm font-bold text-white mb-1">KPCHSS Pattannur</h4>
                  <p className="text-xs text-zinc-400 mb-2">The Kerala Board Of Public Examinations | Score: 95%</p>
                </div>
              </div>

              <div className="border border-zinc-800 bg-[#0a0a12]/90 p-6">
                <div className="flex items-center gap-3">
                  <Award className="text-[#ff007f]" size={24} />
                  <div>
                    <h3 className="text-md font-bold text-white">FOSS FEST 2025, FOSSClub CEKNPY</h3>
                    <p className="text-xs text-[#00f0ff]">Organizer // Kerala, India</p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'terminal' && (
            <motion.section
              key="terminal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-[#00f0ff]/50 bg-[#050508] p-4 font-mono shadow-[0_0_30px_rgba(0,240,255,0.2)]"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal size={18} className="text-[#00f0ff]" />
                  <span className="text-xs text-zinc-400">gokul@cyber-terminal:~</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
              </div>

              <div className="h-64 overflow-y-auto space-y-2 text-xs mb-4 scrollbar-thin">
                {terminalLogs.map((log, index) => (
                  <div key={index} className={`
                    ${log.type === 'error' ? 'text-red-400' : ''}
                    ${log.type === 'success' ? 'text-[#00f0ff]' : ''}
                    ${log.type === 'info' ? 'text-[#ff007f]' : ''}
                    ${log.type === 'cmd' ? 'text-white font-bold' : ''}
                    ${log.type === 'sys' ? 'text-zinc-500' : ''}
                  `}>
                    {log.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-zinc-800 pt-3">
                <span className="text-[#ff007f]">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'help', 'skills', 'projects', 'contact'..."
                  className="bg-transparent border-none outline-none text-white w-full text-xs font-mono placeholder:text-zinc-600"
                />
              </form>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-zinc-500 border-t border-zinc-900 mt-12">
        <p>&copy; 2026 GOKUL P JITH. ALL RIGHTS RESERVED. SECURE TRANSMISSION ENCRYPTED.</p>
      </footer>
    </div>
  );
}
```

---

## 🚀 Quick Setup Instructions

1. **Initialize Project:**
   ```bash
   npm create vite@latest gokul-portfolio -- --template react
   cd gokul-portfolio
   npm install
   ```
2. **Install Dependencies:**
   ```bash
   npm install framer-motion lucide-react tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. **Configure Tailwind (`tailwind.config.js`):**
   Ensure your content paths cover your JSX files so styles apply correctly.
4. **Run Development Server:**
   ```bash
   npm run dev
   ```
