import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, HelpCircle } from 'lucide-react';
import type { Question } from '../data/mbtiData';

interface QuizPageProps {
  questions: Question[];
  onAnswerSelect: (questionId: number, value: number) => void;
  onFinish: (answers: Record<number, number>) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ questions, onAnswerSelect, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentIndex];
  
  // Guard for empty questions array (safety first)
  if (!currentQuestion) return null;

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleOptionSelect = (value: number) => {
    if (isTransitioning) return; // Prevent double clicking / locking up
    setIsTransitioning(true);

    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);
    
    // Trigger callback to App.tsx to update background dynamically
    onAnswerSelect(currentQuestion.id, value);

    // Smooth auto-advance after brief delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setDirection('forward');
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false); // Re-enable clicks
      } else {
        onFinish(updatedAnswers);
      }
    }, 250);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    if (currentIndex > 0) {
      setDirection('backward');
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Option list adapted to light theme colors and readability
  const options = [
    { text: '매우 그렇다', value: 2, bg: 'hover:border-purple-400 hover:bg-purple-50/40 text-purple-700' },
    { text: '그렇다', value: 1, bg: 'hover:border-indigo-400 hover:bg-indigo-50/40 text-indigo-700' },
    { text: '보통이다', value: 0, bg: 'hover:border-slate-400 hover:bg-slate-50/40 text-slate-700' },
    { text: '아니다', value: -1, bg: 'hover:border-blue-400 hover:bg-blue-50/40 text-blue-700' },
    { text: '전혀 아니다', value: -2, bg: 'hover:border-cyan-400 hover:bg-cyan-50/40 text-cyan-700' }
  ];

  // Motion variants for slide transition
  const variants = {
    enter: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 relative z-10 flex flex-col justify-between min-h-[80vh]">
      {/* Header and Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-mono">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 || isTransitioning}
            className={`flex items-center gap-1 cursor-pointer transition-colors ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-slate-800'
            }`}
          >
            <ChevronLeft size={14} />
            이전 단계
          </button>
          <span>{currentIndex + 1} / {questions.length} 문항</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-purple"
          />
        </div>
      </div>

      {/* Main Card with AnimatePresence */}
      <div className="flex-1 flex items-center justify-center py-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full glass-panel p-8 sm:p-10 rounded-3xl border border-black/5 flex flex-col gap-8 shadow-xl relative bg-white/80"
          >
            {/* Question Marker */}
            <div className="absolute top-8 left-8 text-purple-650/40 flex items-center gap-1.5">
              <HelpCircle size={18} />
              <span className="font-display font-semibold text-xs tracking-wider">COGNITIVE INDEX</span>
            </div>

            {/* Question Text */}
            <div className="mt-6">
              <h2 className="text-xl sm:text-2xl font-semibold leading-snug text-slate-800 font-sans text-center">
                {currentQuestion.text}
              </h2>
            </div>

            {/* Options List */}
            <div className="flex flex-col gap-3 mt-4">
              {options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isTransitioning}
                    onClick={() => handleOptionSelect(option.value)}
                    className={`w-full py-4 px-6 rounded-2xl text-sm font-semibold transition-all duration-300 text-center glass-panel-interactive border cursor-pointer ${
                      isSelected
                        ? 'border-purple-650 bg-purple-50/80 text-purple-700 shadow-[0_0_12px_rgba(139,92,246,0.12)]'
                        : `border-slate-200/50 text-slate-700 bg-white/50 ${option.bg}`
                    }`}
                  >
                    {option.text}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer text */}
      <div className="text-center text-xs text-slate-400 font-sans mt-4">
        솔직하고 즉각적인 답변일수록 성격 매칭 확률이 높아집니다.
      </div>
    </div>
  );
};
