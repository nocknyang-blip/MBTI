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
          backgroundColor: '#f4f4f0',
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

  // HP Bar style segment renderer
  const renderSegmentedBar = (percent: number, activeColorClass: string) => {
    const totalSegments = 10;
    const filledSegments = Math.round((percent / 100) * totalSegments);
    return (
      <div className="flex gap-1 p-1 border-4 border-slate-900 bg-white w-full shadow-[2px_2px_0px_0px_#1a1a24]">
        {Array.from({ length: totalSegments }).map((_, idx) => (
          <div
            key={idx}
            className={`h-4 flex-1 border-2 border-slate-900 transition-all duration-100 ${
              idx < filledSegments 
                ? `${activeColorClass} shadow-[inset_-2px_-2px_0px_0px_rgba(0,0,0,0.15)]` 
                : 'bg-slate-100'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 relative z-10 flex flex-col gap-6">
      {/* Toast Notification (8-bit style) */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 border-4 border-slate-900 bg-white text-slate-900 text-xs py-3 px-6 rounded-none flex items-center gap-2 shadow-[4px_4px_0px_0px_#1a1a24] font-bold"
          >
            <CopyCheck size={16} className="text-purple-650" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons (NES Styled) */}
      <div className="flex flex-wrap items-center justify-end gap-2.5">
        <button
          onClick={handleShareLink}
          className="px-4 py-2.5 text-xs font-extrabold border-4 border-slate-900 bg-white text-slate-800 shadow-[3px_3px_0px_0px_#1a1a24] active:shadow-[1px_1px_0px_0px_#1a1a24] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all"
        >
          <Share2 size={16} className="inline mr-1" />
          SHARE LINK
        </button>
        <button
          onClick={handleSaveImage}
          disabled={isExporting}
          className="px-4 py-2.5 text-xs font-extrabold border-4 border-slate-900 bg-yellow-300 text-slate-800 shadow-[3px_3px_0px_0px_#1a1a24] active:shadow-[1px_1px_0px_0px_#1a1a24] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} className="inline mr-1" />
          {isExporting ? 'CAPTURING...' : 'SAVE IMAGE'}
        </button>
      </div>

      {/* Main Exportable Personality Card (Status Sheet Style) */}
      <div
        id="mbti-result-card"
        className="w-full retro-panel border-4 border-slate-900 p-6 sm:p-10 shadow-lg relative bg-white flex flex-col gap-8"
      >
        {/* Soft dynamic retro orb ambient glow */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br ${profile.gradient} opacity-20 blur-[80px] pointer-events-none`} />
        
        {/* Card Header (8-bit style metadata) */}
        <div className="flex items-center justify-between border-b-4 border-slate-900 pb-4 font-mono font-bold text-xxs text-slate-500">
          <div className="flex items-center gap-2">
            <Award size={14} className="text-slate-900" />
            [ CHARACTER STATUS SHEET ]
          </div>
          <span>
            DATE: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '/')}
          </span>
        </div>

        {/* MBTI Title Area */}
        <div className="text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className={`text-xxs font-extrabold tracking-wider border-2 border-slate-900 px-3 py-1 bg-purple-100 text-purple-800`}>
              CLASS: {profile.englishName.toUpperCase()}
            </span>
            <h1 className="text-4xl font-black mt-3 text-slate-900 font-display">
              {mbti}
            </h1>
            <p className="text-sm font-extrabold text-slate-700 mt-1">
              [ {profile.name} ]
            </p>
          </div>
          
          {/* Decorative Chunky initial badge */}
          <div className={`w-16 h-16 border-4 border-slate-900 bg-yellow-300 p-0.5 flex items-center justify-center mx-auto sm:mx-0 shadow-[4px_4px_0_0_#1a1a24]`}>
            <span className="text-2xl font-black text-slate-900 font-display">
              {mbti.charAt(0)}
            </span>
          </div>
        </div>

        {/* Short Summary & Description */}
        <div className="flex flex-col gap-4">
          <div className="notion-quote text-sm italic font-extrabold text-purple-750">
            "{profile.summary}"
          </div>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-bold whitespace-pre-line">
            {profile.description}
          </p>
        </div>

        {/* Tag traits */}
        <div className="flex flex-wrap gap-2">
          {profile.traits.map((trait, idx) => (
            <span key={idx} className="px-2 py-1 bg-slate-100 border-2 border-slate-900 text-xxs text-slate-800 font-bold shadow-[2px_2px_0px_0px_#1a1a24]">
              #{trait}
            </span>
          ))}
        </div>

        {/* Cognitive Scales (HP-style segmented bars) */}
        <div className="flex flex-col gap-5 border-t-4 border-b-4 border-slate-900 py-8">
          <h3 className="text-xs font-black tracking-wider text-slate-500 font-display">[ COGNITIVE STATS ]</h3>
          
          <div className="flex flex-col gap-5">
            {/* E vs I */}
            <div>
              <div className="flex items-center justify-between text-xxs font-extrabold text-slate-700 mb-1.5 font-mono">
                <span className={ePercent >= 50 ? 'text-purple-650' : 'text-slate-400'}>E_EXTRAVERSION ({ePercent}%)</span>
                <span className={iPercent > 50 ? 'text-purple-650' : 'text-slate-400'}>({iPercent}%) I_INTROVERSION</span>
              </div>
              {renderSegmentedBar(ePercent, 'bg-purple-400')}
            </div>

            {/* S vs N */}
            <div>
              <div className="flex items-center justify-between text-xxs font-extrabold text-slate-700 mb-1.5 font-mono">
                <span className={sPercent >= 50 ? 'text-blue-600' : 'text-slate-400'}>S_SENSING ({sPercent}%)</span>
                <span className={nPercent > 50 ? 'text-blue-600' : 'text-slate-400'}>({nPercent}%) N_INTUITION</span>
              </div>
              {renderSegmentedBar(sPercent, 'bg-blue-400')}
            </div>

            {/* T vs F */}
            <div>
              <div className="flex items-center justify-between text-xxs font-extrabold text-slate-700 mb-1.5 font-mono">
                <span className={tPercent >= 50 ? 'text-green-600' : 'text-slate-400'}>T_THINKING ({tPercent}%)</span>
                <span className={fPercent > 50 ? 'text-green-600' : 'text-slate-400'}>({fPercent}%) F_FEELING</span>
              </div>
              {renderSegmentedBar(tPercent, 'bg-green-400')}
            </div>

            {/* J vs P */}
            <div>
              <div className="flex items-center justify-between text-xxs font-extrabold text-slate-700 mb-1.5 font-mono">
                <span className={jPercent >= 50 ? 'text-yellow-600' : 'text-slate-400'}>J_JUDGING ({jPercent}%)</span>
                <span className={pPercent > 50 ? 'text-yellow-600' : 'text-slate-400'}>({pPercent}%) P_PERCEIVING</span>
              </div>
              {renderSegmentedBar(jPercent, 'bg-yellow-400')}
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <h4 className="text-xxs font-extrabold tracking-wider text-emerald-600 flex items-center gap-1.5 uppercase font-display">
              <CheckCircle size={14} className="text-slate-900" />
              [ ACTIVE BUFFS ]
            </h4>
            <ul className="flex flex-col gap-2 text-xxs sm:text-xs text-slate-700">
              {profile.strengths.map((str, idx) => (
                <li key={idx} className="flex gap-2 items-start font-bold">
                  <span className="text-emerald-500">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xxs font-extrabold tracking-wider text-rose-600 flex items-center gap-1.5 uppercase font-display">
              <AlertTriangle size={14} className="text-slate-900" />
              [ PASSIVE DEBUFFS ]
            </h4>
            <ul className="flex flex-col gap-2 text-xxs sm:text-xs text-slate-700">
              {profile.weaknesses.map((weak, idx) => (
                <li key={idx} className="flex gap-2 items-start font-bold">
                  <span className="text-rose-500">•</span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compatibility Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t-4 border-slate-900 pt-8 font-display">
          <div className="p-4 border-4 border-slate-900 bg-emerald-50 flex flex-col gap-1 text-left shadow-[3px_3px_0px_0px_#1a1a24]">
            <span className="text-xxs font-extrabold text-emerald-600 uppercase tracking-wider">[ BEST PARTY MEMBER ]</span>
            <span className="text-xs font-black text-slate-800 mt-1">{profile.bestMatch.type}</span>
            <span className="text-xxs text-slate-600 font-bold">{profile.bestMatch.name}</span>
          </div>

          <div className="p-4 border-4 border-slate-900 bg-rose-50 flex flex-col gap-1 text-left shadow-[3px_3px_0px_0px_#1a1a24]">
            <span className="text-xxs font-extrabold text-rose-600 uppercase tracking-wider">[ DANGEROUS ENEMY ]</span>
            <span className="text-xs font-black text-slate-800 mt-1">{profile.worstMatch.type}</span>
            <span className="text-xxs text-slate-600 font-bold">{profile.worstMatch.name}</span>
          </div>
        </div>
      </div>

      {/* Retest Button */}
      <button
        onClick={onRetry}
        className="w-full py-4 border-4 border-slate-900 bg-white text-slate-800 font-extrabold shadow-[4px_4px_0px_0px_#1a1a24] active:shadow-[1px_1px_0px_0px_#1a1a24] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all duration-100 text-xs font-display"
      >
        <RotateCcw size={16} className="inline mr-1" />
        RETRY TEST
      </button>
    </div>
  );
};
