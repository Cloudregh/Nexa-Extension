import { useEffect, useRef } from 'react';
import { useTranscriptStore } from '../store/useTranscriptStore';

export const TranscriptPanel = () => {
  const { transcript, interimText, isRecording } = useTranscriptStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom only when new speech arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, interimText]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white m-6 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 relative z-10">
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100/60 bg-white/50 backdrop-blur-sm rounded-t-[24px] z-20">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Live Transcript</h2>
        {isRecording && (
          <div className="flex items-center space-x-2 text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            <span>Recording</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 scroll-smooth relative">
        {transcript.map((block) => (
          <div key={block.id} className="transition-all duration-500 ease-in-out">
            <div className="flex items-center space-x-3 mb-2.5">
              <span className="text-[11px] font-bold text-blue-600 tracking-widest uppercase">{block.speaker}</span>
              <span className="text-[11px] text-slate-400 font-medium">{block.timestamp}</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[16px] max-w-4xl">{block.text}</p>
          </div>
        ))}
        
        {interimText && (
          <div className="border-l-[3px] border-blue-400 bg-gradient-to-r from-blue-50/50 to-transparent p-5 rounded-r-xl opacity-90 transition-all duration-300">
             <div className="flex items-center space-x-3 mb-2.5">
              <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
                 <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce mr-2"></span>
                 Listening...
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[16px] animate-pulse">{interimText}</p>
          </div>
        )}
        <div ref={bottomRef} className="h-24" /> {/* Padding bottom for floating controls */}
      </div>
    </div>
  );
};
