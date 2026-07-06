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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-purple-650 text-xs font-semibold tracking-wider uppercase mb-8 border border-purple-500/10 shadow-[0_2px_8px_rgba(139,92,246,0.08)] bg-white/80"
      >
        <Sparkles size={14} className="animate-pulse text-purple-500" />
        AI-Powered Personality Analysis
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-center leading-tight mb-6 text-slate-900"
      >
        가장 정밀한 <br className="sm:hidden" />
        <span className="bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-purple bg-clip-text text-transparent">
          AI MBTI 성격 분석
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-slate-500 text-center text-sm sm:text-base max-w-lg mb-12 font-sans font-light leading-relaxed"
      >
        단 12개의 엄선된 인지 과학 기반 질문을 통해 귀하의 의사결정 방식, 정보 수집 경향, 에너지 방향성을 심층 분석하고 시각화합니다.
      </motion.p>

      {/* Feature Grid (Notion & Apple Style Grid) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-12 text-left"
      >
        <div className="glass-panel p-5 rounded-2xl border border-black/5 flex flex-col gap-3 shadow-md bg-white/70">
          <div className="p-2 w-fit rounded-lg bg-indigo-50 text-indigo-600">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">정밀 인지 분석</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              융의 분석심리학적 인지 기능을 바탕으로 성격을 도출합니다.
            </p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-black/5 flex flex-col gap-3 shadow-md bg-white/70">
          <div className="p-2 w-fit rounded-lg bg-purple-50 text-purple-650">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">고속 AI 스캐닝</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              응답 패턴을 기반으로 성격의 성향을 즉시 수치화합니다.
            </p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-black/5 flex flex-col gap-3 shadow-md bg-white/70">
          <div className="p-2 w-fit rounded-lg bg-emerald-50 text-emerald-600">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">데이터 프라이버시</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              귀하의 소중한 테스트 답변은 서버에 저장되지 않고 브라우저 내에서 직접 분석됩니다.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        onClick={onStart}
        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent-indigo to-accent-purple text-white font-semibold rounded-2xl shadow-[0_8px_30px_rgba(139,92,246,0.2)] hover:shadow-[0_8px_35px_rgba(139,92,246,0.35)] flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer group text-base"
      >
        분석 시작하기
        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
};
