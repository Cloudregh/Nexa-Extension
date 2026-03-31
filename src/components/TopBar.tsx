
import { Mic, Settings, User } from 'lucide-react';
import { useTranscriptStore } from '../store/useTranscriptStore';

export const TopBar = () => {
  const { isRecording } = useTranscriptStore();

  return (
    <header className="flex-shrink-0 h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8 w-full shrink-0 relative z-10">
      <div className="flex items-center space-x-4 text-slate-800 font-bold tracking-tight text-xl">
         <span>NEXA</span>
         {isRecording && (
          <div className="flex items-center space-x-2 text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            <span>Recording</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6">
        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
            {/* Using a placeholder SVG or generic User icon for now since we don't have assets */}
            <User className="w-6 h-6 text-slate-400" />
        </div>
      </div>
    </header>
  );
};
