import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Trophy, RotateCcw, Volume2, VolumeX,
  Play, Pause, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  Sparkles, Maximize2, Minimize2
} from 'lucide-react';

/* Sound effects using Web Audio API (Zero external assets needed) */
function playAudio(type = 'eat') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'eat') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'special') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.setValueAtTime(980, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'die') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (err) {
    // Audio blocked by browser policy until gesture
  }
}

const COLS = 16;
const ROWS = 13;
const CELL_SIZE = 15; // 240px x 195px canvas

export default function CyberSnake({ onFlipBack, isExpanded, onToggleExpand }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('cyber_snake_hs') || '0', 10);
  });
  const [gameState, setGameState] = useState('idle'); // idle, playing, paused, gameover
  const [soundOn, setSoundOn] = useState(true);

  const snakeRef = useRef([
    { x: 7, y: 6 },
    { x: 6, y: 6 },
    { x: 5, y: 6 },
  ]);
  const dirRef = useRef({ x: 1, y: 0 });
  const nextDirRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef({ x: 12, y: 6, isSpecial: false });
  const foodCountRef = useRef(0);
  const timerRef = useRef(null);

  const generateFood = useCallback((snake) => {
    let newFood;
    let collision;
    do {
      collision = false;
      newFood = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
        isSpecial: (foodCountRef.current + 1) % 5 === 0,
      };
      for (const seg of snake) {
        if (seg.x === newFood.x && seg.y === newFood.y) {
          collision = true;
          break;
        }
      }
    } while (collision);
    return newFood;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = '#050816';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle cyberpunk grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * CELL_SIZE, 0);
      ctx.lineTo(c * CELL_SIZE, ROWS * CELL_SIZE);
      ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * CELL_SIZE);
      ctx.lineTo(COLS * CELL_SIZE, r * CELL_SIZE);
      ctx.stroke();
    }

    // Draw Food
    const food = foodRef.current;
    if (food) {
      const fx = food.x * CELL_SIZE + CELL_SIZE / 2;
      const fy = food.y * CELL_SIZE + CELL_SIZE / 2;
      const radius = (CELL_SIZE / 2) - 2;

      ctx.save();
      ctx.shadowBlur = food.isSpecial ? 16 : 10;
      ctx.shadowColor = food.isSpecial ? '#f59e0b' : '#06b6d4';
      ctx.fillStyle = food.isSpecial ? '#fbbf24' : '#10b981';

      ctx.beginPath();
      ctx.arc(fx, fy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner highlight
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(fx - 2, fy - 2, radius * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      const sx = seg.x * CELL_SIZE;
      const sy = seg.y * CELL_SIZE;

      ctx.save();
      if (isHead) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#a855f7';
        ctx.fillStyle = '#c084fc';
        ctx.beginPath();
        ctx.roundRect(sx + 1, sy + 1, CELL_SIZE - 2, CELL_SIZE - 2, 4);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#ffffff';
        const dir = dirRef.current;
        let eye1X = sx + 4, eye1Y = sy + 4, eye2X = sx + 4, eye2Y = sy + 10;
        if (dir.x === 1) {
          eye1X = sx + 10; eye1Y = sy + 4;
          eye2X = sx + 10; eye2Y = sy + 10;
        } else if (dir.y === -1) {
          eye1X = sx + 4; eye1Y = sy + 4;
          eye2X = sx + 10; eye2Y = sy + 4;
        } else if (dir.y === 1) {
          eye1X = sx + 4; eye1Y = sy + 10;
          eye2X = sx + 10; eye2Y = sy + 10;
        }
        ctx.beginPath();
        ctx.arc(eye1X, eye1Y, 1.6, 0, Math.PI * 2);
        ctx.arc(eye2X, eye2Y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Gradient color along tail
        const ratio = i / snake.length;
        ctx.fillStyle = ratio > 0.5 ? '#7c3aed' : '#06b6d4';
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(124, 58, 237, 0.4)';
        ctx.beginPath();
        ctx.roundRect(sx + 1.5, sy + 1.5, CELL_SIZE - 3, CELL_SIZE - 3, 3);
        ctx.fill();
      }
      ctx.restore();
    });
  }, []);

  const gameOver = useCallback(() => {
    setGameState('gameover');
    if (timerRef.current) clearInterval(timerRef.current);
    if (soundOn) playAudio('die');

    setScore(currentScore => {
      setHighScore(prevHigh => {
        const newHigh = Math.max(prevHigh, currentScore);
        localStorage.setItem('cyber_snake_hs', String(newHigh));
        return newHigh;
      });
      return currentScore;
    });
  }, [soundOn]);

  const tick = useCallback(() => {
    dirRef.current = nextDirRef.current;
    const curDir = dirRef.current;
    const snake = [...snakeRef.current];
    const head = { ...snake[0] };

    head.x += curDir.x;
    head.y += curDir.y;

    // Wall collision check
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      gameOver();
      return;
    }

    // Self collision check
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        gameOver();
        return;
      }
    }

    snake.unshift(head);

    // Food check
    const food = foodRef.current;
    if (head.x === food.x && head.y === food.y) {
      foodCountRef.current += 1;
      const pts = food.isSpecial ? 30 : 10;
      setScore(s => s + pts);

      if (soundOn) playAudio(food.isSpecial ? 'special' : 'eat');
      foodRef.current = generateFood(snake);
    } else {
      snake.pop();
    }

    snakeRef.current = snake;
    draw();
  }, [draw, gameOver, generateFood, soundOn]);

  const startGame = useCallback(() => {
    snakeRef.current = [
      { x: 7, y: 6 },
      { x: 6, y: 6 },
      { x: 5, y: 6 },
    ];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    foodCountRef.current = 0;
    foodRef.current = { x: 12, y: 6, isSpecial: false };
    setScore(0);
    setGameState('playing');

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(tick, 120);
  }, [tick]);

  // Restart tick loop when playing
  useEffect(() => {
    if (gameState === 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      // Speed up slightly as score rises
      const speed = Math.max(75, 120 - Math.floor(score / 40) * 8);
      timerRef.current = setInterval(tick, speed);
      return () => clearInterval(timerRef.current);
    }
  }, [gameState, score, tick]);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw]);

  // Keyboard navigation
  const handleDirection = useCallback((dx, dy) => {
    const cur = dirRef.current;
    if (dx !== 0 && cur.x === -dx) return;
    if (dy !== 0 && cur.y === -dy) return;
    nextDirRef.current = { x: dx, y: dy };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (gameState !== 'playing' && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        startGame();
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          handleDirection(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          handleDirection(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          handleDirection(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          handleDirection(1, 0);
          break;
        case ' ':
          setGameState(st => st === 'playing' ? 'paused' : st === 'paused' ? 'playing' : st);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameState, handleDirection, startGame]);

  return (
    <div className="flex flex-col h-full select-none" style={{ background: '#070b1e', color: '#f8fafc' }}>
      {/* Top Arcade Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(124,58,237,0.12)' }}>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1">
            <Sparkles size={12} className="text-yellow-400" />
            Cyber Snake
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={() => setSoundOn(s => !s)}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            title={soundOn ? 'Mute' : 'Unmute'}
          >
            {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          {/* Flip back button */}
          <button
            onClick={onFlipBack}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#38bdf8' }}
            title="Rotate back to profile photo"
          >
            <RotateCcw size={11} />
            <span>Photo</span>
          </button>
        </div>
      </div>

      {/* Score Bar */}
      <div className="flex justify-between items-center px-3 py-1.5 text-xs font-mono" style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-1 text-emerald-400">
          <span>SCORE:</span>
          <span className="font-bold text-white text-sm">{score}</span>
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          <Trophy size={11} />
          <span>BEST:</span>
          <span className="font-bold text-white text-sm">{highScore}</span>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative flex-1 flex items-center justify-center p-2" style={{ background: '#03050f' }}>
        <canvas
          ref={canvasRef}
          width={COLS * CELL_SIZE}
          height={ROWS * CELL_SIZE}
          className="rounded-lg shadow-inner"
          style={{
            border: '1px solid rgba(124,58,237,0.3)',
            display: 'block',
            maxWidth: '100%',
          }}
        />

        {/* Overlay for Idle / Game Over */}
        {gameState !== 'playing' && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
            style={{
              background: 'rgba(3, 5, 15, 0.88)',
              backdropFilter: 'blur(3px)',
              borderRadius: 8,
            }}
          >
            {gameState === 'idle' && (
              <div className="text-center space-y-2">
                <div className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Mini Arcade</div>
                <h4 className="text-lg font-extrabold text-white">Retro Snake</h4>
                <p className="text-[11px] text-slate-400 leading-tight">Use Arrow keys or D-Pad below to steer!</p>
                <button
                  onClick={startGame}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                >
                  <Play size={12} fill="white" /> START GAME
                </button>
              </div>
            )}

            {gameState === 'paused' && (
              <div className="text-center space-y-2">
                <h4 className="text-base font-bold text-amber-300">GAME PAUSED</h4>
                <button
                  onClick={() => setGameState('playing')}
                  className="px-3 py-1 rounded bg-purple-600 text-white text-xs font-bold"
                >
                  Resume
                </button>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className="text-center space-y-1.5 animate-fadeIn">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Crash!</span>
                <h4 className="text-lg font-black text-rose-500">GAME OVER</h4>
                <div className="text-xs text-slate-300 font-mono">
                  Final Score: <span className="font-bold text-emerald-400">{score}</span>
                </div>
                <div className="flex gap-2 pt-2 justify-center">
                  <button
                    onClick={startGame}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-transform hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
                  >
                    <Play size={11} fill="white" /> Play Again
                  </button>
                  <button
                    onClick={onFlipBack}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <RotateCcw size={11} /> Photo
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mini On-Screen D-Pad for Touch & Mouse */}
      <div className="px-3 py-2 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.35)' }}>
        <div className="text-[10px] text-slate-400 flex flex-col justify-center">
          <span className="font-semibold text-slate-300">Controls:</span>
          <span>Arrows or WASD</span>
        </div>

        {/* Compact D-Pad */}
        <div className="grid grid-cols-3 gap-1 w-24">
          <div />
          <button
            onClick={() => handleDirection(0, -1)}
            className="arcade-btn h-6 w-full"
            aria-label="Up"
          >
            <ChevronUp size={14} />
          </button>
          <div />
          <button
            onClick={() => handleDirection(-1, 0)}
            className="arcade-btn h-6 w-full"
            aria-label="Left"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => handleDirection(0, 1)}
            className="arcade-btn h-6 w-full"
            aria-label="Down"
          >
            <ChevronDown size={14} />
          </button>
          <button
            onClick={() => handleDirection(1, 0)}
            className="arcade-btn h-6 w-full"
            aria-label="Right"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
