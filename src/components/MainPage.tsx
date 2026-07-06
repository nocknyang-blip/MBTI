import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface MainPageProps {
  onStart: () => void;
}

export const MainPage: React.FC<MainPageProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 relative z-10">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none border-4 border-slate-900 bg-yellow-300 text-slate-900 text-xs font-bold uppercase mb-8 shadow-[2px_2px_0px_0px_#1a1a24]"
      >
        <Sparkles size={14} className="text-slate-900" />
        AI-Powered Personality Analysis
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display text-4xl sm:text-5xl font-black tracking-tight text-center leading-tight mb-8 text-slate-900"
      >
        가장 정밀한 <br className="sm:hidden" />
        <span className="bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
          AI MBTI 성격 진단
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-700 text-center text-xs sm:text-sm max-w-lg mb-12 leading-relaxed"
      >
        [단 12개의 질문] 인지 과학 및 분석 심리학 기반의 8비트 성격 진단 프로그램입니다. 당신의 성격 유형 데이터 매트릭스를 탐색하세요.
      </motion.p>

      {/* Feature Grid (NES styled blocks) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-12 text-left"
      >
        <div className="retro-panel p-5 bg-white border-4 border-slate-900 flex flex-col gap-3">
          <div className="p-1.5 w-fit border-2 border-slate-900 bg-indigo-100 text-indigo-700">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-slate-900 text-xs mb-1">정밀 인지 분석</h3>
            <p className="text-slate-600 text-xxs leading-relaxed font-semibold">
              융의 분석심리학적 인지 기능을 바탕으로 성격을 도출합니다.
            </p>
          </div>
        </div>

        <div className="retro-panel p-5 bg-white border-4 border-slate-900 flex flex-col gap-3">
          <div className="p-1.5 w-fit border-2 border-slate-900 bg-purple-100 text-purple-700">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-slate-900 text-xs mb-1">고속 AI 스캐닝</h3>
            <p className="text-slate-600 text-xxs leading-relaxed font-semibold">
              응답 패턴을 기반으로 성격의 성향을 즉시 수치화합니다.
            </p>
          </div>
        </div>

        <div className="retro-panel p-5 bg-white border-4 border-slate-900 flex flex-col gap-3">
          <div className="p-1.5 w-fit border-2 border-slate-900 bg-emerald-100 text-emerald-700">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-slate-900 text-xs mb-1">데이터 보증</h3>
            <p className="text-slate-600 text-xxs leading-relaxed font-semibold">
              답변은 서버에 저장되지 않고 브라우저 내에서 직접 처리됩니다.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Start Button (Chunky NES button) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onStart}
        className="w-full sm:w-auto px-10 py-5 bg-red-500 hover:bg-red-600 text-white font-extrabold rounded-none border-4 border-slate-900 shadow-[6px_6px_0px_0px_#1a1a24] active:shadow-[2px_2px_0px_0px_#1a1a24] active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-3 transition-all cursor-pointer text-base uppercase"
      >
        GAME START
        <ArrowRight size={18} />
      </motion.button>
      
      {/* Blinking start indicator */}
      <div className="mt-8 text-xxs font-bold text-slate-500 animate-blink">
        [ PRESS BUTTON TO INITIALIZE ]
      </div>
    </div>
  );
};
