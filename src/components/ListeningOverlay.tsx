import { Ear } from 'lucide-react';

export const ListeningPanel = () => {
    return (
      <div className="mx-4 mt-3 mb-1 shrink-0">
        <div className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-slate-100 px-5 py-4 flex items-center space-x-4 animate-in slide-in-from-top-2 duration-300">
          
          {/* Pulsing Ear Icon */}
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-blue-50 rounded-full animate-ping opacity-50"></div>
            <div className="relative z-10 w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center">
              <Ear className="w-4 h-4 text-blue-600" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-slate-800 leading-tight">Listening...</p>
            <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">
              Identifying key actions &amp; summarizing context
            </p>
          </div>

          {/* Dots */}
          <div className="flex items-center space-x-1 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></div>
          </div>
          
        </div>
      </div>
    );
};
