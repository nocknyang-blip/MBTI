import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu } from 'lucide-react';

interface LoadingPageProps {
  onComplete: () => void;
}

const analysisSteps = [
  "인지 기능 메트릭 수집 중...",
  "에너지 방향성 성향(E/I) 연산 중...",
  "정보 처리 및 인식 필터(S/N) 스캔 중...",
  "판단 및 의사 결정 축(T/F) 계량 중...",
  "생활 양식 및 환경 대처 경향(J/P) 분석 중...",
  "최종 AI 성격 보고서 구조화 중..."
];

export const LoadingPage: React.FC<LoadingPageProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 3600; // ms
    const intervalTime = 40; // ms
    const increment = (intervalTime / totalDuration) * 100;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    const stepInterval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    const completionTimeout = setTimeout(() => {
      onComplete();
    }, totalDuration + 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-[75vh] px-6 py-12 relative z-10">
      {/* Morphing Glowing AI Orb (Light Mode Style) */}
      <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
        {/* Outer Glows */}
        <motion.div
          animate={{
            scale: [1, 1.15, 0.95, 1.05, 1],
            rotate: [0, 90, 180, 270, 360],
            borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 52% 48% / 60% 40% 60% 40%", "42% 58% 70% 30% / 45% 45% 55% 55%"]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 via-accent-indigo/15 to-accent-purple/25 blur-xl pointer-events-none"
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 0.92, 1.04, 1],
            rotate: [360, 270, 180, 90, 0],
            borderRadius: ["50% 50% 30% 70% / 50% 60% 40% 50%", "30% 70% 70% 30% / 50% 40% 60% 50%", "50% 50% 30% 70% / 50% 60% 40% 50%"]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[85%] h-[85%] bg-gradient-to-bl from-accent-purple/10 via-transparent to-accent-blue/15 border border-purple-500/20 pointer-events-none"
        />

        {/* Inner core */}
        <div className="absolute w-[40%] h-[40%] bg-white rounded-full flex items-center justify-center shadow-lg border border-black/5 z-20">
          <Cpu size={24} className="text-purple-600 animate-pulse" />
        </div>
      </div>

      {/* Progress text */}
      <div className="w-full text-center mb-6">
        <h3 className="font-display font-bold text-slate-800 text-lg tracking-wide mb-2">
          {Math.round(progress)}%
        </h3>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic analysis status message */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-slate-500 font-sans text-sm font-light tracking-wide text-center"
            >
              {analysisSteps[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
