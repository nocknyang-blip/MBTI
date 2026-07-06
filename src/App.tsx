import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, BrainCircuit } from 'lucide-react';
import { MainPage } from './components/MainPage';
import { QuizPage } from './components/QuizPage';
import { LoadingPage } from './components/LoadingPage';
import { ResultPage } from './components/ResultPage';
import { getRandomizedQuestions, mbtiGradientsLight, mbtiProfiles } from './data/mbtiData';
import type { Question } from './data/mbtiData';

import { sounds } from './utils/sound';

type PageType = 'main' | 'quiz' | 'loading' | 'result';

function App() {
  const [page, setPage] = useState<PageType>('main');
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [runningAnswers, setRunningAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState({ EI: 50, SN: 50, TF: 50, JP: 50 });
  const [mbti, setMbti] = useState('ESTJ');

  // Initialize questions on mount
  useEffect(() => {
    setCurrentQuestions(getRandomizedQuestions());
  }, []);

  // Handle URL share links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedMbti = params.get('mbti');
    if (sharedMbti && mbtiProfiles[sharedMbti.toUpperCase()]) {
      const sharedEi = parseFloat(params.get('ei') || '50');
      const sharedSn = parseFloat(params.get('sn') || '50');
      const sharedTf = parseFloat(params.get('tf') || '50');
      const sharedJp = parseFloat(params.get('jp') || '50');

      setScores({
        EI: sharedEi,
        SN: sharedSn,
        TF: sharedTf,
        JP: sharedJp
      });
      setMbti(sharedMbti.toUpperCase());
      setRunningAnswers({ 999: 0 }); 
      setPage('result');
    }
  }, []);

  const handleStart = () => {
    sounds.playSelect();
    setPage('quiz');
  };

  const handleAnswerSelect = (questionId: number, value: number) => {
    const updatedAnswers = { ...runningAnswers, [questionId]: value };
    setRunningAnswers(updatedAnswers);

    // Compute running MBTI
    let eiSum = 0;
    let snSum = 0;
    let tfSum = 0;
    let jpSum = 0;

    currentQuestions.forEach(q => {
      const ans = updatedAnswers[q.id] || 0;
      const score = ans * q.direction;

      if (q.dimension === 'EI') eiSum += score;
      else if (q.dimension === 'SN') snSum += score;
      else if (q.dimension === 'TF') tfSum += score;
      else if (q.dimension === 'JP') jpSum += score;
    });

    const eOrI = eiSum >= 0 ? 'E' : 'I';
    const sOrN = snSum >= 0 ? 'S' : 'N';
    const tOrF = tfSum >= 0 ? 'T' : 'F';
    const jOrP = jpSum >= 0 ? 'J' : 'P';

    setMbti(`${eOrI}${sOrN}${tOrF}${jOrP}`);
  };

  const handleQuizFinish = (quizAnswers: Record<number, number>) => {
    setRunningAnswers(quizAnswers);
    setPage('loading');

    // Compute final percentage scales
    let eiSum = 0;
    let snSum = 0;
    let tfSum = 0;
    let jpSum = 0;

    let eiCount = 0;
    let snCount = 0;
    let tfCount = 0;
    let jpCount = 0;

    currentQuestions.forEach(q => {
      const ans = quizAnswers[q.id] || 0;
      const score = ans * q.direction;

      if (q.dimension === 'EI') {
        eiSum += score;
        eiCount++;
      } else if (q.dimension === 'SN') {
        snSum += score;
        snCount++;
      } else if (q.dimension === 'TF') {
        tfSum += score;
        tfCount++;
      } else if (q.dimension === 'JP') {
        jpSum += score;
        jpCount++;
      }
    });

    const calcPercent = (sum: number, count: number) => {
      const min = -2 * count;
      const max = 2 * count;
      return ((sum - min) / (max - min)) * 100;
    };

    const eiPercent = calcPercent(eiSum, eiCount);
    const snPercent = calcPercent(snSum, snCount);
    const tfPercent = calcPercent(tfSum, tfCount);
    const jpPercent = calcPercent(jpSum, jpCount);

    const eOrI = eiPercent >= 50 ? 'E' : 'I';
    const sOrN = snPercent >= 50 ? 'S' : 'N';
    const tOrF = tfPercent >= 50 ? 'T' : 'F';
    const jOrP = jpPercent >= 50 ? 'J' : 'P';

    const finalMbti = `${eOrI}${sOrN}${tOrF}${jOrP}`;

    setScores({
      EI: eiPercent,
      SN: snPercent,
      TF: tfPercent,
      JP: jpPercent
    });
    setMbti(finalMbti);
  };

  const handleLoadingComplete = () => {
    sounds.playVictory(); // Trigger retro arpeggio arpeggio!
    setPage('result');
  };

  const handleRetry = () => {
    sounds.playSelect();
    setRunningAnswers({});
    setScores({ EI: 50, SN: 50, TF: 50, JP: 50 });
    setMbti('ESTJ');
    setCurrentQuestions(getRandomizedQuestions());
    setPage('main');
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  // Determine retro background color
  const answeredCount = Object.keys(runningAnswers).length;
  const isTestingStarted = answeredCount > 0;

  // Render retro styling backgrounds
  const bgStyleClass =
    (page === 'quiz' || page === 'loading' || page === 'result') && isTestingStarted
      ? mbtiGradientsLight[mbti] || 'from-indigo-50/50 to-purple-50/50'
      : 'from-[#f4f4f0] to-[#f4f4f0]';

  return (
    <div className={`min-h-screen bg-gradient-to-tr ${bgStyleClass} retro-grid text-slate-900 flex flex-col justify-between relative overflow-hidden transition-all duration-500`}>
      {/* Header Frame (8-Bit border separator) */}
      <header className="w-full max-w-4xl mx-auto px-6 py-6 flex items-center justify-between relative z-20 border-b-4 border-slate-900">
        <button
          onClick={handleRetry}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="p-1 border-2 border-slate-900 bg-white group-hover:bg-purple-100 transition-all">
            <BrainCircuit size={18} className="text-purple-650" />
          </div>
          <span className="font-display font-extrabold tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
            AI MBTI LAB
          </span>
        </button>
        <div className="flex items-center gap-1.5 text-xs text-slate-800 font-mono font-bold">
          <Sparkles size={12} className="text-purple-600 animate-pulse" />
          v1.0.0 (8-BIT)
        </div>
      </header>

      {/* Main Pages Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex items-center justify-center relative z-10 py-4">
        <AnimatePresence mode="wait">
          {page === 'main' && (
            <motion.div
              key="main"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <MainPage onStart={handleStart} />
            </motion.div>
          )}

          {page === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <QuizPage
                questions={currentQuestions}
                onAnswerSelect={handleAnswerSelect}
                onFinish={handleQuizFinish}
              />
            </motion.div>
          )}

          {page === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <LoadingPage onComplete={handleLoadingComplete} />
            </motion.div>
          )}

          {page === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ResultPage mbti={mbti} scores={scores} onRetry={handleRetry} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto px-6 py-6 relative z-20 border-t-4 border-slate-900 text-center">
        <p className="text-xxs sm:text-xs text-slate-800 font-bold font-mono">
          © {new Date().getFullYear()} AI MBTI LAB. INSERT COIN TO PLAY. 8-BIT EDITION.
        </p>
      </footer>
    </div>
  );
}

export default App;
