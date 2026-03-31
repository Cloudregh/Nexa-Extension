
import { Radio, ScrollText, History, FolderOpen } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTranscriptStore } from '../store/useTranscriptStore';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Sidebar = () => {
  const { isRecording, toggleRecording } = useTranscriptStore();

  const navItems = [
    { label: 'Live', icon: Radio, active: true },
    { label: 'Notes', icon: ScrollText, active: false },
    { label: 'History', icon: History, active: false },
    { label: 'Library', icon: FolderOpen, active: false }
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col h-full shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          NEXA <span className="text-blue-600 ml-1">AI</span>
        </h1>
        <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">
          The AI Digital Assistant
        </p>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-1.5">
        {navItems.map((item, i) => (
          <button
            key={i}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
              item.active 
                ? "bg-white text-blue-600 shadow-sm border border-slate-100" 
                : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6 mt-auto">
        <button 
          onClick={toggleRecording}
          className={cn(
            "w-full py-3.5 rounded-xl font-bold shadow-sm transition-all duration-300",
            isRecording 
              ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20" 
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
          )}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
    </aside>
  );
};
