import { Ear } from 'lucide-react';

export const ListeningOverlay = () => {
    return (
      <div className="absolute inset-x-4 top-20 z-40">
        <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100/50 p-8 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
          
          {/* Pulsing Concentric Circles with Ear */}
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
             <div className="absolute inset-0 bg-blue-50 rounded-full animate-ping opacity-75"></div>
             <div className="absolute inset-2 bg-blue-100 rounded-full"></div>
             <div className="relative z-10 w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center border border-blue-50/50">
               <Ear className="w-6 h-6 text-blue-600" />
             </div>
          </div>

          <h3 className="text-[22px] font-bold tracking-tight text-slate-800 mb-3">
            Listening...
          </h3>
          
          <p className="text-[14px] leading-relaxed text-slate-500 font-medium px-2">
            NEXA is identifying key action items and summarizing the conversation context in real-time.
          </p>

          <div className="flex items-center space-x-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
          </div>
          
        </div>
      </div>
    );
};
