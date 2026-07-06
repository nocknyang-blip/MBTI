import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, RotateCcw, Award, CheckCircle, AlertTriangle, CopyCheck } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { mbtiProfiles } from '../data/mbtiData';


interface ResultPageProps {
  mbti: string;
  scores: {
    EI: number;
    SN: number;
    TF: number;
    JP: number;
  };
  onRetry: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ mbti, scores, onRetry }) => {
  const profile = mbtiProfiles[mbti] || mbtiProfiles.INTJ;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Helper to determine active scores
  const eiVal = Math.round(scores.EI);
  const snVal = Math.round(scores.SN);
  const tfVal = Math.round(scores.TF);
  const jpVal = Math.round(scores.JP);

  const ePercent = eiVal;
  const iPercent = 100 - eiVal;
  const sPercent = snVal;
  const nPercent = 100 - snVal;
  const tPercent = tfVal;
  const fPercent = 100 - tfVal;
  const jPercent = jpVal;
  const pPercent = 100 - jpVal;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleShareLink = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?mbti=${mbti}&ei=${eiVal}&sn=${snVal}&tf=${tfVal}&jp=${jpVal}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      triggerToast('공유 링크가 클립보드에 복사되었습니다.');
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        triggerToast('공유 링크가 클립보드에 복사되었습니다.');
      } catch (e) {
        triggerToast('링크 복사에 실패했습니다.');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleSaveImage = async () => {
    const element = document.getElementById('mbti-result-card');
    if (!element) return;
    
    setIsExporting(true);
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#fcfcfa', // Light theme background
          logging: false
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `AI_MBTI_Analysis_${mbti}.png`;
        link.href = dataUrl;
        link.click();
        triggerToast('결과 카드가 이미지 파일로 저장되었습니다.');
      } catch (err) {
        console.error('Image capture failed', err);
        triggerToast('이미지 저장에 실패했습니다.');
      } finally {
        setIsExporting(false);
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 relative z-10 flex flex-col gap-6">
      {/* Toast Notification (Light Mode Style) */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-panel border-purple-200 text-slate-800 text-xs sm:text-sm py-3 px-6 rounded-full flex items-center gap-2 shadow-[0_10px_30px_rgba(139,92,246,0.12)] bg-white/95"
          >
            <CopyCheck size={16} className="text-purple-650" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons (Top) */}
      <div className="flex flex-wrap items-center justify-end gap-2.5">
        <button
          onClick={handleShareLink}
          className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-black/5 bg-black/5 hover:bg-black/10 text-slate-700 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
        >
          <Share2 size={16} />
          결과 공유
        </button>
        <button
          onClick={handleSaveImage}
          disabled={isExporting}
          className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-purple-200/50 bg-purple-50 hover:bg-purple-100 text-purple-750 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <Download size={16} />
          {isExporting ? '캡처 중...' : '이미지로 저장'}
        </button>
      </div>

      {/* Main Exportable Personality Card (Light Mode Style) */}
      <div
        id="mbti-result-card"
        className="w-full glass-panel rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col gap-8 bg-gradient-to-b from-white to-slate-50/70"
      >
        {/* Soft background glow matching profile gradient */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br ${profile.gradient} opacity-20 blur-[80px] pointer-events-none`} />
        
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xxs tracking-widest uppercase font-semibold">
            <Award size={14} className="text-purple-600" />
            AI Cognitive Report
          </div>
          <span className="text-slate-400 font-mono text-xxs tracking-wider">
            {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
          </span>
        </div>

        {/* MBTI Title Area */}
        <div className="text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className={`text-xs font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${profile.badgeColor}`}>
              {profile.englishName}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-3 text-slate-800 font-display">
              {mbti}
            </h1>
            <p className="text-lg font-bold text-slate-700 mt-1">
              {profile.name}
            </p>
          </div>
          
          {/* Decorative Type Initial Badge */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 p-0.5 flex items-center justify-center mx-auto sm:mx-0 shadow-md border ${profile.borderColor}`}>
            <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
              <span className={`text-2xl font-black ${profile.textColor} font-display`}>
                {mbti.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Short Summary & Detailed Report */}
        <div className="flex flex-col gap-4">
          <div className={`notion-quote text-base italic font-semibold ${profile.textColor}`}>
            "{profile.summary}"
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light font-sans whitespace-pre-line">
            {profile.description}
          </p>
        </div>

        {/* Tag traits */}
        <div className="flex flex-wrap gap-2">
          {profile.traits.map((trait, idx) => (
            <span key={idx} className="px-3 py-1 bg-slate-100 border border-slate-200/50 rounded-lg text-xs text-slate-600 font-sans font-medium shadow-sm">
              #{trait}
            </span>
          ))}
        </div>

        {/* Cognitive Scales */}
        <div className="flex flex-col gap-5 border-t border-b border-slate-100 py-8">
          <h3 className="text-sm font-bold tracking-wider text-slate-500 font-display">COGNITIVE RATIO</h3>
          
          <div className="flex flex-col gap-4">
            {/* E vs I */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2.5">
                <span className={ePercent >= 50 ? 'text-purple-650 font-extrabold' : 'text-slate-400'}>외향 E ({ePercent}%)</span>
                <span className={iPercent > 50 ? 'text-purple-650 font-extrabold' : 'text-slate-400'}>({iPercent}%) 내향 I</span>
              </div>
              <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden flex">
                <div style={{ width: `${ePercent}%` }} className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-l-full" />
                <div style={{ width: `${iPercent}%` }} className="h-full bg-slate-200/50 rounded-r-full" />
              </div>
            </div>

            {/* S vs N */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2.5">
                <span className={sPercent >= 50 ? 'text-indigo-650 font-extrabold' : 'text-slate-400'}>감각 S ({sPercent}%)</span>
                <span className={nPercent > 50 ? 'text-indigo-650 font-extrabold' : 'text-slate-400'}>({nPercent}%) 직관 N</span>
              </div>
              <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden flex">
                <div style={{ width: `${sPercent}%` }} className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-l-full" />
                <div style={{ width: `${nPercent}%` }} className="h-full bg-slate-200/50 rounded-r-full" />
              </div>
            </div>

            {/* T vs F */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2.5">
                <span className={tPercent >= 50 ? 'text-emerald-700 font-extrabold' : 'text-slate-400'}>사고 T ({tPercent}%)</span>
                <span className={fPercent > 50 ? 'text-emerald-700 font-extrabold' : 'text-slate-400'}>({fPercent}%) 감정 F</span>
              </div>
              <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden flex">
                <div style={{ width: `${tPercent}%` }} className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-l-full" />
                <div style={{ width: `${fPercent}%` }} className="h-full bg-slate-200/50 rounded-r-full" />
              </div>
            </div>

            {/* J vs P */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2.5">
                <span className={jPercent >= 50 ? 'text-amber-700 font-extrabold' : 'text-slate-400'}>판단 J ({jPercent}%)</span>
                <span className={pPercent > 50 ? 'text-amber-700 font-extrabold' : 'text-slate-400'}>({pPercent}%) 인식 P</span>
              </div>
              <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden flex">
                <div style={{ width: `${jPercent}%` }} className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-l-full" />
                <div style={{ width: `${pPercent}%` }} className="h-full bg-slate-200/50 rounded-r-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold tracking-wider text-emerald-600 flex items-center gap-1.5 uppercase font-display">
              <CheckCircle size={14} />
              Key Strengths
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-slate-600 font-sans">
              {profile.strengths.map((str, idx) => (
                <li key={idx} className="flex gap-2 items-start leading-relaxed font-light">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold tracking-wider text-rose-600 flex items-center gap-1.5 uppercase font-display">
              <AlertTriangle size={14} />
              Potential Blindspots
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-slate-600 font-sans">
              {profile.weaknesses.map((weak, idx) => (
                <li key={idx} className="flex gap-2 items-start leading-relaxed font-light">
                  <span className="text-rose-500 mt-0.5">•</span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compatibility Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-8">
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-1 text-left shadow-sm">
            <span className="text-xxs font-bold text-emerald-600/80 uppercase tracking-widest font-display">최고의 조력자</span>
            <span className="text-sm font-bold text-slate-800 mt-1">{profile.bestMatch.type}</span>
            <span className="text-xxs text-slate-500 font-medium">{profile.bestMatch.name}</span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex flex-col gap-1 text-left shadow-sm">
            <span className="text-xxs font-bold text-rose-600/80 uppercase tracking-widest font-display">주의해야 할 상대</span>
            <span className="text-sm font-bold text-slate-800 mt-1">{profile.worstMatch.type}</span>
            <span className="text-xxs text-slate-500 font-medium">{profile.worstMatch.name}</span>
          </div>
        </div>
      </div>

      {/* Retest Button */}
      <button
        onClick={onRetry}
        className="w-full py-4 bg-black/5 hover:bg-black/10 text-slate-800 font-semibold rounded-2xl border border-black/5 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 text-sm font-sans shadow-sm"
      >
        <RotateCcw size={16} />
        다시 검사하기
      </button>
    </div>
  );
};
