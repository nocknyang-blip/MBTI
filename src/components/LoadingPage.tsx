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

  // GameBoy/NES segmented loading bar variables
  const totalBlocks = 12;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-[75vh] px-6 py-12 relative z-10">
      {/* Animated CPU Block Badge */}
      <motion.div
        animate={{
          scale: [1, 1.05, 0.95, 1.05, 1],
          y: [-4, 4, -4, 4, -4]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-28 h-28 border-4 border-slate-900 bg-yellow-300 shadow-[4px_4px_0_0_#1a1a24] flex items-center justify-center mb-12"
      >
        <Cpu size={36} className="text-slate-900 animate-pulse" />
      </motion.div>

      {/* Progress status */}
      <div className="w-full text-center mb-6">
        <h3 className="font-display font-black text-slate-900 text-base tracking-wide mb-4">
          ANALYZING... {Math.round(progress)}%
        </h3>
        
        {/* Chunky Retro HP/Energy loading bar */}
        <div className="flex gap-1.5 p-1.5 border-4 border-slate-900 bg-white shadow-[4px_4px_0_0_#1a1a24] justify-center mb-6">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-8 border-2 border-slate-900 transition-colors duration-100 ${
                i < filledBlocks 
                  ? 'bg-green-400 shadow-[inset_-2px_-2px_0px_0px_rgba(0,0,0,0.15)]' 
                  : 'bg-slate-100'
              }`}
            />
          ))}
        </div>

        {/* Dynamic status text */}
        <div className="h-10 flex items-center justify-center mt-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.1 }}
              className="text-slate-700 font-sans text-xs font-bold tracking-wide text-center"
            >
              [ {analysisSteps[stepIndex]} ]
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
