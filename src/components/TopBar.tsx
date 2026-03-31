import { Ear, User } from 'lucide-react';
import { useTranscriptStore } from '../store/useTranscriptStore';
import { AudioModeSwitch } from './AudioModeSwitch';

export const TopBar = () => {
  const { isRecording, toggleListeningUi, isListeningUiOpen } = useTranscriptStore();

  return (
    <header className="shrink-0 h-16 border-b border-slate-200/60 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 w-full relative z-50">
      <div className="flex items-center space-x-3 text-slate-800 font-bold tracking-tight text-lg">
        <span>NEXA</span>
        {isRecording && (
          <div className="flex items-center space-x-1.5 text-[9px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.5)]"></span>
            <span>Live</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Audio Source Mode Switch (Tab vs Ambient) */}
        <AudioModeSwitch />

        {/* Ear Toggle — shows/hides the Listening overlay */}
        <button
          onClick={toggleListeningUi}
          className={`transition-colors p-1.5 rounded-full ${isListeningUiOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
          title="Toggle Listening UI"
        >
          <Ear className="w-4 h-4" />
        </button>

        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-linear-to-tr from-slate-200 to-slate-100 border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center">
          <User className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
};
