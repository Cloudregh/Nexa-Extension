import { useEffect } from 'react';
import { useTranscriptStore } from '../store/useTranscriptStore';
import { Square, Pause, Bookmark, Play } from 'lucide-react';

export const RecordingControls = () => {
  const { isRecording, toggleRecording, duration, tickDuration } = useTranscriptStore();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        tickDuration();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, tickDuration]);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // The controls conditionally render if recording or if paused with data
  if (!isRecording && duration === 0) return null; 

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-[#2c2c2c] rounded-[48px] px-8 py-3.5 shadow-2xl flex items-center space-x-8 border border-white/10 z-100 animate-in slide-in-from-bottom-5 duration-500">
      
      <div className="flex flex-col items-center justify-center min-w-[80px]">
        <span className="text-[9px] text-white/50 font-bold tracking-[0.2em] uppercase mb-0.5">Duration</span>
        <span className="text-xl font-bold text-white tabular-nums tracking-widest">{formatDuration(duration)}</span>
      </div>

      <div className="w-px h-10 bg-white/10"></div>

      <div className="flex items-center space-x-4">
        <button 
           onClick={toggleRecording}
           className="w-14 h-14 bg-red-500 rounded-full flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(239,68,68,0.4)] hover:bg-red-600 transition-all hover:scale-105 active:scale-95 group relative"
        >
          {isRecording ? (
             <>
               <span className="text-[8px] font-bold text-white/90 uppercase tracking-widest absolute -top-5 opacity-0 group-hover:opacity-100 transition-opacity">Stop</span>
               <Square className="w-5 h-5 text-white fill-white" />
             </>
          ) : (
             <>
               <span className="text-[8px] font-bold text-white/90 uppercase tracking-widest absolute -top-5 opacity-0 group-hover:opacity-100 transition-opacity">Resume</span>
               <Play className="w-5 h-5 text-white fill-white ml-0.5" />
             </>
          )}
        </button>

        <button className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95">
          <Pause className="w-4 h-4 text-white fill-white" />
        </button>

        <button className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95">
          <Bookmark className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
};
