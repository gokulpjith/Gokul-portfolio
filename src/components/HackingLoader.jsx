import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Cpu, Volume2, VolumeX, FastForward } from 'lucide-react';

/* Subtle digital synth audio for hacker terminal keystrokes */
function playDigitalBeep(freq = 800, type = 'sine') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // Audio restricted until interaction
  }
}

const TERMINAL_LOGS = [
  { text: 'INITIALIZING SYSTEM KERNEL @ 0x7FFF8000', tag: 'BOOT', color: '#06b6d4' },
  { text: 'ESTABLISHING QUANTUM HANDSHAKE TO GOKUL.DEV', tag: 'NET', color: '#a855f7' },
  { text: 'INJECTING NEURAL WEIGHTS: TENSORFLOW · LANGCHAIN · FASTMCP', tag: 'AI_CORE', color: '#10b981' },
  { text: 'BYPASSING FIREWALL & SECURITY LAYER [PROXY: ACTIVE]', tag: 'OVERRIDE', color: '#f59e0b' },
  { text: 'IDENTIFYING OPERATOR: GOKUL P JITH (B.TECH CSE)', tag: 'AUTH', color: '#06b6d4' },
  { text: 'DECRYPTING PORTFOLIO ASSETS & AURORA 3.0 ENGINE', tag: 'CRYPTO', color: '#a855f7' },
  { text: '>> ACCESS GRANTED. LAUNCHING SECURE INTERFACE...', tag: 'SUCCESS', color: '#10b981' },
];

export default function HackingLoader({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [isGranted, setIsGranted] = useState(false);
  const canvasRef = useRef(null);

  // Matrix digital rain background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF<>{}/*+=~$_';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    let animationId;
    const render = () => {
      ctx.fillStyle = 'rgba(2, 4, 10, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(6, 182, 212, 0.28)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.85) {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
        } else {
          ctx.fillStyle = 'rgba(124, 58, 237, 0.25)';
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Step-by-step terminal log output
  useEffect(() => {
    let currentIdx = 0;
    const totalLines = TERMINAL_LOGS.length;
    const intervalTime = 320; // 320ms per log line

    const logTimer = setInterval(() => {
      if (currentIdx < totalLines) {
        const nextLog = TERMINAL_LOGS[currentIdx];
        setLines(prev => [...prev, nextLog]);
        if (soundOn) {
          playDigitalBeep(700 + currentIdx * 90);
        }
        currentIdx++;
      } else {
        clearInterval(logTimer);
      }
    }, intervalTime);

    // Progress bar ticker
    const progressTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return p + 2;
      });
    }, 45);

    return () => {
      clearInterval(logTimer);
      clearInterval(progressTimer);
    };
  }, [soundOn]);

  // Handle completion when progress hits 100%
  useEffect(() => {
    if (progress >= 100) {
      setIsGranted(true);
      if (soundOn) playDigitalBeep(1200, 'triangle');
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 550);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete, soundOn]);

  // Keyboard shortcut to skip (Escape or Space or Enter)
  useEffect(() => {
    const handleKey = (e) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none overflow-hidden"
      style={{ background: '#02040a' }}
    >
      {/* Background Matrix Rain */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 crt-scanlines" />

      {/* Cyberpunk ambient lighting orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
          top: '20%',
          left: '30%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
          bottom: '15%',
          right: '25%',
          filter: 'blur(60px)',
        }}
      />

      {/* Main Terminal Window Card */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300"
        style={{
          background: 'rgba(7, 11, 28, 0.92)',
          border: '1px solid rgba(124, 58, 237, 0.5)',
          boxShadow: isGranted
            ? '0 0 60px rgba(16, 185, 129, 0.4), 0 25px 80px rgba(0,0,0,0.9)'
            : '0 0 50px rgba(124, 58, 237, 0.25), 0 25px 80px rgba(0,0,0,0.85)',
        }}
      >
        {/* Terminal Header Bar */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.08)',
            background: 'linear-gradient(90deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))',
          }}
        >
          {/* Traffic lights + title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-cyan-400" />
              <span className="text-xs font-mono font-semibold tracking-wider text-slate-300">
                ROOT@GOKUL-MAINFRAME: <span className="text-purple-400">~ [BOOT_V3]</span>
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundOn(s => !s)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              title={soundOn ? 'Mute' : 'Unmute'}
            >
              {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            {/* Skip Button */}
            <button
              onClick={onComplete}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all duration-200 group"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#94a3b8',
              }}
              title="Skip intro animation (Esc)"
            >
              <FastForward size={12} className="group-hover:translate-x-0.5 transition-transform text-cyan-400" />
              <span>SKIP</span>
              <span className="text-[9px] opacity-50 hidden sm:inline">[ESC]</span>
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 font-mono space-y-4">
          {/* High-tech ASCII Header Banner */}
          <div className="border-b pb-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-cyan-400">
                <Cpu size={14} className="animate-spin text-purple-400" style={{ animationDuration: '4s' }} />
                <span className="font-bold tracking-widest">CYBER_CORE // GOKUL P JITH</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]" style={{ color: '#7c8aa0' }}>
                <span>PORT: 5174</span>
                <span>·</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SSL: ENCRYPTED
                </span>
              </div>
            </div>
          </div>

          {/* Scrolling Terminal Output Lines */}
          <div className="space-y-2 min-h-[160px] text-xs">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-start gap-2 leading-relaxed"
              >
                <span className="text-purple-400 select-none">❯</span>
                <span
                  className="px-1.5 py-0.2 rounded text-[10px] font-bold select-none"
                  style={{
                    background: `${line.color}15`,
                    color: line.color,
                    border: `1px solid ${line.color}35`,
                  }}
                >
                  [{line.tag}]
                </span>
                <span className="text-slate-200 tracking-wide font-medium">
                  {line.text}
                </span>
              </motion.div>
            ))}

            {/* Blinking prompt line */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="text-emerald-400">root@gokul:~#</span>
              <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* High-Tech Progress Bar */}
          <div className="pt-3 border-t space-y-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                {isGranted ? (
                  <ShieldCheck size={13} className="text-emerald-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                )}
                {isGranted ? 'AUTHENTICATION COMPLETED' : 'DECOMPRESSING PORTFOLIO BUFFER...'}
              </span>
              <span className="font-bold text-sm tracking-wider" style={{ color: isGranted ? '#10b981' : '#38bdf8' }}>
                {progress}%
              </span>
            </div>

            {/* Glowing bar */}
            <div
              className="w-full h-2 rounded-full overflow-hidden p-0.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-75"
                style={{
                  width: `${progress}%`,
                  background: isGranted
                    ? 'linear-gradient(90deg, #10b981, #06b6d4)'
                    : 'linear-gradient(90deg, #7c3aed, #06b6d4, #10b981)',
                  boxShadow: isGranted
                    ? '0 0 15px rgba(16,185,129,0.8)'
                    : '0 0 15px rgba(124,58,237,0.7)',
                }}
              />
            </div>

            {/* Bottom memory debug info */}
            <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
              <span>MEM_ALLOC: 0x88FA1 · THREADS: 8</span>
              <span>PRESS [ESC] OR CLICK TO ENTER</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
