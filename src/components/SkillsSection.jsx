import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Cpu, Database, Wrench, Sparkles,
  Layers, Search, SlidersHorizontal, CheckCircle2,
  BarChart3, Flame
} from 'lucide-react';

const SKILLS_DATA = [
  {
    category: 'languages',
    categoryName: 'Programming Languages',
    icon: Code2,
    color: '#7c3aed',
    accentColor: '#a855f7',
    badge: 'Core Syntax',
    skills: [
      { name: 'Python', level: 94, tag: 'Advanced', desc: 'Primary language for AI pipelines, LangChain, ML modeling, and FastAPI backend services.', projects: ['NutriDecide', 'AI Models', 'Data Pipelines'] },
      { name: 'C', level: 86, tag: 'Proficient', desc: 'Low-level systems programming, memory management, and data structures implementation.', projects: ['Algorithms', 'OS Fundamentals'] },
      { name: 'SQL', level: 88, tag: 'Proficient', desc: 'Relational database schema design, complex joins, indexing, and query optimization.', projects: ['Enterprise DBs', 'Techmaghi Analytics'] },
      { name: 'Java', level: 82, tag: 'Intermediate', desc: 'Object-oriented programming, design patterns, threading, and robust application architecture.', projects: ['OOP Projects', 'Data Structures'] },
      { name: 'JavaScript', level: 85, tag: 'Proficient', desc: 'Modern ES6+, async/await, DOM manipulation, React ecosystem, and interactive frontends.', projects: ['Portfolio 2026', 'Fullstack Web'] },
      { name: 'HTML & CSS', level: 90, tag: 'Advanced', desc: 'Semantic HTML5, responsive layout design, CSS animations, and glassmorphic UI systems.', projects: ['Modern UIs', 'Web Apps'] },
      { name: 'PHP', level: 78, tag: 'Familiar', desc: 'Server-side web scripting and legacy database integration.', projects: ['Dynamic Web Systems'] },
    ]
  },
  {
    category: 'ai',
    categoryName: 'Data Science & AI',
    icon: Cpu,
    color: '#06b6d4',
    accentColor: '#38bdf8',
    badge: 'Machine Intelligence',
    skills: [
      { name: 'TensorFlow', level: 88, tag: 'Deep Learning', desc: 'Building, training, and fine-tuning neural network models for predictive intelligence.', projects: ['Techmaghi ML', 'Predictive Modeling'] },
      { name: 'LangChain', level: 89, tag: 'LLM Orchestration', desc: 'Developing context-aware agentic workflows, prompt chains, and RAG architectures.', projects: ['Agentic Tools', 'AI Knowledge Systems'] },
      { name: 'FastMCP', level: 86, tag: 'Model Context', desc: 'Integrating Model Context Protocol servers to expose live tools and context to LLMs.', projects: ['Next-Gen AI Agents'] },
      { name: 'FastAPI', level: 91, tag: 'High-Speed API', desc: 'Building high-concurrency asynchronous REST APIs with automatic OpenAPI schema generation.', projects: ['Microservices', 'AI Backends'] },
      { name: 'Data Processing', level: 90, tag: 'Analytics', desc: 'Pandas, NumPy, and Scipy workflows for cleaning, ETL, and structured transformations.', projects: ['Techmaghi Internship'] },
      { name: 'Data Visualization', level: 87, tag: 'Insights', desc: 'Matplotlib, Seaborn, and dynamic visual storytelling of complex multi-dimensional metrics.', projects: ['Analytics Dashboards'] },
      { name: 'Predictive Modeling', level: 85, tag: 'ML Workflows', desc: 'Feature engineering, regression, classification, and cross-validation pipelines.', projects: ['Data Science Labs'] },
    ]
  },
  {
    category: 'tools',
    categoryName: 'Databases & Tools',
    icon: Database,
    color: '#10b981',
    accentColor: '#34d399',
    badge: 'Infrastructure & Ops',
    skills: [
      { name: 'MongoDB', level: 88, tag: 'NoSQL Engine', desc: 'Document schemas, aggregations, MongoDB Atlas cloud clusters, and high-volume collections.', projects: ['NutriDecide Cloud Sync'] },
      { name: 'MySQL', level: 86, tag: 'Relational DB', desc: 'ACID transactional integrity, normalized relational schemas, and stored procedures.', projects: ['System Databases'] },
      { name: 'Git & GitHub', level: 92, tag: 'Version Control', desc: 'Branching strategies, collaborative pull requests, merge conflict resolution, and CI/CD.', projects: ['FOSS Fest', 'Open Source'] },
      { name: 'Docker', level: 80, tag: 'Containers', desc: 'Containerizing applications, Dockerfiles, and reproducible development environments.', projects: ['Containerized Services'] },
      { name: 'Power BI', level: 84, tag: 'BI Dashboards', desc: 'Business intelligence reporting, interactive dashboards, and KPI metrics visualization.', projects: ['Data Reporting'] },
      { name: 'Jupyter & Colab', level: 92, tag: 'Scientific Computing', desc: 'Interactive Python notebooks, GPU/TPU acceleration, and reproducible experiment logs.', projects: ['ML Research'] },
    ]
  },
  {
    category: 'competencies',
    categoryName: 'Core Competencies',
    icon: Wrench,
    color: '#f59e0b',
    accentColor: '#fbbf24',
    badge: 'Engineering Mindset',
    skills: [
      { name: 'Problem Solving', level: 95, tag: 'Critical Thinking', desc: 'Deconstructing algorithmic challenges, edge-case analysis, and clean scalable solutions.', projects: ['B.Tech CSE Core'] },
      { name: 'Analytical Thinking', level: 93, tag: 'Architecture', desc: 'Evaluating trade-offs between speed, complexity, and maintainability in software systems.', projects: ['System Design'] },
      { name: 'Communication & Leadership', level: 90, tag: 'Collaboration', desc: 'Organizing FOSS FEST 2025, mentoring tech teams, and technical documentation.', projects: ['FOSSClub CEKNPY'] },
      { name: 'Time Management', level: 88, tag: 'Agile Mindset', desc: 'Sprint planning, prioritization, milestone delivery, and balancing academics with projects.', projects: ['Project Delivery'] },
    ]
  }
];

const MARQUEE_ITEMS = [
  'PYTHON ✦', 'TENSORFLOW ✦', 'LANGCHAIN ✦', 'FASTMCP ✦',
  'FASTAPI ✦', 'MONGODB ✦', 'DOCKER ✦', 'SQL ✦',
  'REACT ✦', 'C ✦', 'POWER BI ✦', 'GIT ✦', 'DATA PIPELINES ✦'
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'bars'
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedSkill, setInspectedSkill] = useState(SKILLS_DATA[0].skills[0]);

  // Filter categories and skills based on search and active tab
  const filteredCategories = SKILLS_DATA.filter(cat => {
    if (activeCategory !== 'all' && cat.category !== activeCategory) return false;
    if (!searchQuery.trim()) return true;
    return cat.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }).map(cat => ({
    ...cat,
    skills: cat.skills.filter(s =>
      !searchQuery.trim() || s.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.skills.length > 0);

  // All matching skills flattened for Energy Bars view
  const allFilteredSkills = filteredCategories.flatMap(cat =>
    cat.skills.map(s => ({ ...s, categoryColor: cat.color, categoryName: cat.categoryName }))
  ).sort((a, b) => b.level - a.level);

  return (
    <div className="space-y-6">
      {/* ── Top Infinite Holographic Marquee ── */}
      <div
        className="relative overflow-hidden py-2.5 rounded-xl border backdrop-blur-md"
        style={{
          background: 'rgba(7, 11, 28, 0.65)',
          borderColor: 'rgba(124, 58, 237, 0.25)',
          boxShadow: '0 0 25px rgba(124, 58, 237, 0.1)',
        }}
      >
        <div className="tech-marquee-track text-xs font-mono tracking-widest text-slate-400 select-none">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span
              key={idx}
              className="mx-4 flex items-center gap-2 hover:text-cyan-400 transition-colors"
              style={{
                color: idx % 3 === 0 ? '#38bdf8' : idx % 3 === 1 ? '#a855f7' : '#34d399',
                textShadow: '0 0 10px rgba(124,58,237,0.3)',
              }}
            >
              <Sparkles size={11} className="text-yellow-400 animate-pulse" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Control Bar: Category Pills + Search + View Switcher ── */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}>
          {[
            { id: 'all', label: 'All Domains' },
            { id: 'languages', label: 'Languages' },
            { id: 'ai', label: 'AI & Data' },
            { id: 'tools', label: 'Databases & Ops' },
            { id: 'competencies', label: 'Core Skills' },
          ].map(tab => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className="relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 select-none"
                style={{ color: isActive ? '#ffffff' : '#94a3b8' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillCategoryPill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(6,182,212,0.3))',
                      border: '1px solid rgba(124,58,237,0.6)',
                      boxShadow: '0 0 18px rgba(124,58,237,0.35)',
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input & View Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative flex-1 sm:w-48">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tech..."
              className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors font-mono"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl border border-white/10 bg-slate-900/60">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-purple-600/30 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              title="Interactive Card View"
            >
              <Layers size={14} />
            </button>
            <button
              onClick={() => setViewMode('bars')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'bars' ? 'bg-cyan-600/30 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              title="Energy Gauge View"
            >
              <BarChart3 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main View Content ── */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          /* ── GRID VIEW: Category Cards with Interactive Animated Pills ── */
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filteredCategories.map((cat, catIdx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIdx * 0.08, duration: 0.4 }}
                  className="glass-card p-6 gradient-border relative group flex flex-col justify-between"
                  style={{
                    background: 'rgba(8, 12, 32, 0.7)',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Category Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: `${cat.color}18`,
                            border: `1px solid ${cat.color}35`,
                            boxShadow: `0 0 15px ${cat.color}25`,
                          }}
                        >
                          <Icon size={18} style={{ color: cat.color }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm tracking-tight">{cat.categoryName}</h3>
                          <span className="text-[10px] text-slate-400 font-mono">{cat.skills.length} competencies</span>
                        </div>
                      </div>

                      <span
                        className="glow-badge text-xs"
                        style={{
                          background: `${cat.color}15`,
                          border: `1px solid ${cat.color}30`,
                          color: cat.accentColor,
                        }}
                      >
                        {cat.badge}
                      </span>
                    </div>

                    {/* Interactive Animated Skill Pills */}
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {cat.skills.map((skill) => {
                        const isSelected = inspectedSkill?.name === skill.name;
                        return (
                          <motion.button
                            key={skill.name}
                            whileHover={{ scale: 1.07, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setInspectedSkill(skill)}
                            className="group/pill relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer select-none"
                            style={{
                              background: isSelected ? `${cat.color}30` : 'rgba(255, 255, 255, 0.05)',
                              border: `1px solid ${isSelected ? cat.color : 'rgba(255, 255, 255, 0.1)'}`,
                              color: isSelected ? '#ffffff' : '#cbd5e1',
                              boxShadow: isSelected ? `0 0 20px ${cat.color}45` : 'none',
                            }}
                          >
                            {/* Animated Pulse Indicator */}
                            <span
                              className="w-2 h-2 rounded-full transition-transform group-hover/pill:scale-125"
                              style={{
                                background: cat.color,
                                boxShadow: `0 0 8px ${cat.color}`,
                              }}
                            />
                            <span>{skill.name}</span>

                            {/* Micro level pill */}
                            <span
                              className="text-[10px] font-mono px-1.5 py-0.2 rounded-md opacity-80"
                              style={{
                                background: 'rgba(0,0,0,0.3)',
                                color: cat.accentColor,
                              }}
                            >
                              {skill.level}%
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Micro tip footer */}
                  <div className="pt-4 mt-4 border-t flex items-center justify-between text-[11px] text-slate-500 font-mono" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <span>Domain: {cat.badge}</span>
                    <span className="text-purple-400/80">Click pill to inspect</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* ── BARS VIEW: High-Tech Energy Gauge Bars ── */
          <motion.div
            key="bars-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="glass-card p-6 gradient-border space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Flame size={14} className="text-amber-400 animate-bounce" />
                <span>TECHNICAL PROFICIENCY & PRODUCTION MASTERY</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{allFilteredSkills.length} Total Technologies</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
              {allFilteredSkills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.35 }}
                  onClick={() => setInspectedSkill(skill)}
                  className="space-y-1.5 cursor-pointer p-2 rounded-xl transition-all hover:bg-white/[0.03]"
                >
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: skill.categoryColor, boxShadow: `0 0 6px ${skill.categoryColor}` }} />
                      <span className="font-semibold text-white">{skill.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">· {skill.tag}</span>
                    </div>
                    <span className="font-mono font-bold text-xs" style={{ color: skill.categoryColor }}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* High Tech Animated Neon Gauge Bar */}
                  <div className="w-full h-2 rounded-full overflow-hidden p-0.5 bg-slate-900 border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.1 + idx * 0.02, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full relative"
                      style={{
                        background: `linear-gradient(90deg, ${skill.categoryColor}88, ${skill.categoryColor})`,
                        boxShadow: `0 0 12px ${skill.categoryColor}88`,
                      }}
                    >
                      {/* Bright tip */}
                      <span className="absolute right-0 top-0 bottom-0 w-1.5 bg-white rounded-full shadow-[0_0_6px_#fff]" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Interactive Skill Inspector Showcase Drawer ── */}
      {inspectedSkill && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 border rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(12, 17, 43, 0.95), rgba(7, 10, 26, 0.95))',
            borderColor: 'rgba(124, 58, 237, 0.35)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(124,58,237,0.15)',
          }}
        >
          {/* Subtle background glow circle */}
          <div
            className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
              filter: 'blur(35px)',
            }}
          />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            {/* Left: Skill Details */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {inspectedSkill.tag}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  Verified Competency
                </span>
              </div>

              <h4 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{inspectedSkill.name}</span>
                <span className="text-sm font-mono text-cyan-400 font-semibold">[{inspectedSkill.level}% Proficiency]</span>
              </h4>

              <p className="text-xs leading-relaxed text-slate-300 max-w-2xl">
                {inspectedSkill.desc}
              </p>

              {/* Projects tag list */}
              {inspectedSkill.projects && inspectedSkill.projects.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-mono text-slate-400">Applications:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {inspectedSkill.projects.map(proj => (
                      <span
                        key={proj}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-200 border"
                        style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Animated circular/linear level gauge */}
            <div className="w-full lg:w-60 flex-shrink-0 space-y-2 bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">MASTERY LEVEL</span>
                <span className="text-cyan-400 font-bold">{inspectedSkill.level}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden p-0.5 bg-slate-900 border border-white/10">
                <motion.div
                  key={inspectedSkill.name}
                  initial={{ width: 0 }}
                  animate={{ width: `${inspectedSkill.level}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                    boxShadow: '0 0 12px rgba(6,182,212,0.8)',
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                <span>FOUNDATION</span>
                <span>PRODUCTION</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
