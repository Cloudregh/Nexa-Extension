import { useTranscriptStore } from '../store/useTranscriptStore';
import { Mic, Circle } from 'lucide-react';

export const AudioModeSwitch = () => {
  const { isRecording, toggleRecording } = useTranscriptStore();

  return (
    <div className="flex items-center gap-3">
      {/* Visual Indicator of the Current Mode (Ambient Only) */}
      <div className="flex items-center bg-slate-100 rounded-full px-4 py-1.5 gap-2 border border-slate-200/50 shadow-inner">
        <Mic className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-[11px] font-bold tracking-wide text-slate-600 uppercase">
          Ambient Audio
        </span>
      </div>

      {/* Action Button */}
      <button
        onClick={toggleRecording}
        className={`
          w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
          ${isRecording 
            ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] scale-105' 
            : 'bg-red-50 hover:bg-red-100 hover:scale-105 active:scale-95 border border-red-100'
          }
        `}
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
      >
        <Circle 
          className={`w-3.5 h-3.5 transition-colors ${
            isRecording ? 'text-white fill-white' : 'text-red-500 fill-red-500'
          }`} 
        />
      </button>
    </div>
  );
};