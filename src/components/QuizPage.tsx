import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

import type { Question } from '../data/mbtiData';
import { sounds } from '../utils/sound';

interface QuizPageProps {
  questions: Question[];
  onAnswerSelect: (questionId: number, value: number) => void;
  onFinish: (answers: Record<number, number>) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  opacity: number;
}

export const QuizPage: React.FC<QuizPageProps> = ({ questions, onAnswerSelect, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const currentQuestion = questions[currentIndex];

  // Particle physics updates
  useEffect(() => {
    if (particles.length === 0) return;
    const animationFrame = requestAnimationFrame(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.35, // Gravity force
            opacity: Math.max(0, p.opacity - 0.02) // Fade out
          }))
          .filter(p => p.opacity > 0)
      );
    });
    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  if (!currentQuestion) return null;

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const spawnParticles = (x: number, y: number) => {
    const retroColors = ['#ff4b4b', '#3beb8e', '#3b8cff', '#c04bfa', '#fadb3b', '#ff8b3d'];
    const newParticles: Particle[] = [];
    
    // Spawn 15 blocky pixel particles
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      newParticles.push({
        id: Math.random(),
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5, // Slightly upward force
        color: retroColors[Math.floor(Math.random() * retroColors.length)],
        size: 6 + Math.random() * 8, // Square sizing
        opacity: 1
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Play impact sound effect
    sounds.playImpact();
    
    // Trigger screen shake
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 150);

    // Spawn retro particles at cursor click
    spawnParticles(e.clientX, e.clientY);

    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);
    
    onAnswerSelect(currentQuestion.id, value);

    // Advance question after delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setDirection('forward');
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      } else {
        onFinish(updatedAnswers);
      }
    }, 250);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    if (currentIndex > 0) {
      sounds.playSelect();
      setDirection('backward');
      setCurrentIndex(prev => prev - 1);
    }
  };

  const options = [
    { text: '매우 그렇다', value: 2, bg: 'hover:border-purple-600 hover:bg-purple-100/40 text-purple-700' },
    { text: '그렇다', value: 1, bg: 'hover:border-indigo-600 hover:bg-indigo-100/40 text-indigo-700' },
    { text: '보통이다', value: 0, bg: 'hover:border-slate-600 hover:bg-slate-100/40 text-slate-700' },
    { text: '아니다', value: -1, bg: 'hover:border-blue-600 hover:bg-blue-100/40 text-blue-700' },
    { text: '전혀 아니다', value: -2, bg: 'hover:border-cyan-600 hover:bg-cyan-100/40 text-cyan-700' }
  ];

  const variants = {
    enter: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? -80 : 80,
      opacity: 0
    })
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 relative z-10 flex flex-col justify-between min-h-[80vh]">
      {/* Floating particles container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((p, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Header and Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-slate-700 mb-3 font-mono font-bold">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 || isTransitioning}
            className={`flex items-center gap-1 cursor-pointer transition-colors ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-slate-900'
            }`}
          >
            &lt; 이전 단계
          </button>
          <span>Q. {currentIndex + 1} / {questions.length}</span>
        </div>
        
        {/* Retro XP style Progress Bar */}
        <div className="retro-bar-container w-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.2 }}
            className="retro-bar-fill"
          />
        </div>
      </div>

      {/* Main Card with AnimatePresence and Shake */}
      <div className="flex-1 flex items-center justify-center py-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate={
              isShaking
                ? {
                    x: [-6, 6, -6, 6, -3, 3, 0],
                    y: [-3, 3, -1, 1, -3, 3, 0],
                    transition: { duration: 0.15 }
                  }
                : 'center'
            }
            exit="exit"
            transition={{ duration: 0.15 }}
            className="w-full retro-panel p-8 sm:p-10 border-4 border-slate-900 flex flex-col gap-8 shadow-md relative bg-white"
          >
            {/* Question Marker */}
            <div className="absolute top-8 left-8 text-slate-400 flex items-center gap-1.5 font-bold">
              <HelpCircle size={18} className="text-slate-900" />
              <span className="font-display text-xs tracking-wider text-slate-800">QUESTION INDEX</span>
            </div>

            {/* Question Text */}
            <div className="mt-6">
              <h2 className="text-lg sm:text-xl font-bold leading-snug text-slate-800 text-center">
                {currentQuestion.text}
              </h2>
            </div>

            {/* Options List */}
            <div className="flex flex-col gap-3 mt-4">
              {options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.value}
                    disabled={isTransitioning}
                    onClick={(e) => handleOptionClick(e, option.value)}
                    className={`w-full py-4 px-6 text-xs sm:text-sm font-extrabold transition-all duration-100 text-center border-4 border-slate-900 shadow-[3px_3px_0px_0px_#1a1a24] active:shadow-[1px_1px_0px_0px_#1a1a24] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
                      isSelected
                        ? 'bg-purple-100 text-purple-800 border-purple-600 shadow-[1px_1px_0px_0px_#8b5cf6] translate-x-0.5 translate-y-0.5'
                        : `bg-white text-slate-800 ${option.bg}`
                    }`}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer text */}
      <div className="text-center text-xs text-slate-500 font-sans mt-4">
        * 솔직하고 신속하게 입력할수록 정확한 데이터가 산출됩니다.
      </div>
    </div>
  );
};
