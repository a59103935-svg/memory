import { useState, useEffect } from 'react';

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function App() {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // 시간 종료 시 모드 자동 전환
      setTimeout(() => {
        setIsFocusMode(!isFocusMode);
        setTimeLeft(!isFocusMode ? FOCUS_TIME : BREAK_TIME);
        setIsActive(false);
      }, 0);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isFocusMode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isFocusMode ? FOCUS_TIME : BREAK_TIME);
  };

  const switchMode = (toFocus) => {
    setIsActive(false);
    setIsFocusMode(toFocus);
    setTimeLeft(toFocus ? FOCUS_TIME : BREAK_TIME);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center">
      {/* 귀여운 토마토 아이콘 */}
      <div className="text-6xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>🍅</div>
      
      <h1 className="text-3xl font-bold text-slate-100 mb-8 tracking-wide">뽀모도로 타이머</h1>
      
      {/* Session Indicator */}
      <div className="flex bg-slate-800/80 rounded-full p-1 mb-8 w-64 shadow-inner border border-slate-700/50">
        <button 
          onClick={() => switchMode(true)}
          className={`flex-1 py-2 rounded-full font-semibold transition-all duration-300 ${isFocusMode ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
        >
          집중
        </button>
        <button 
          onClick={() => switchMode(false)}
          className={`flex-1 py-2 rounded-full font-semibold transition-all duration-300 ${!isFocusMode ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
        >
          휴식
        </button>
      </div>

      {/* Timer Display */}
      <div className={`w-64 h-64 flex items-center justify-center rounded-[3rem] mb-10 border-8 shadow-2xl transition-all duration-500 ${isFocusMode ? 'border-rose-400/30 bg-rose-500/10' : 'border-emerald-400/30 bg-emerald-500/10'}`}>
        <span className="text-7xl font-mono font-bold tracking-tighter text-slate-50 drop-shadow-lg">
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button 
          onClick={toggleTimer}
          className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-lg transition-all active:scale-95 hover:-translate-y-1 ${isActive ? 'bg-slate-700 text-slate-300' : (isFocusMode ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white')}`}
        >
          {isActive ? '일시정지' : '시작'}
        </button>
        <button 
          onClick={resetTimer}
          className="px-6 py-4 rounded-2xl font-bold text-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-all active:scale-95 shadow-lg border border-slate-700/50"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
