
import { useTranscriptStore } from '../store/useTranscriptStore';
import { Sparkles, FileText } from 'lucide-react';

export const InsightsPanel = () => {
  const { insights } = useTranscriptStore();

  return (
    <div className="w-full bg-[#F8F9FB]">
      <div className="px-6 py-3">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center">
             AI Insights
        </h2>
      </div>

      <div className="px-6 pb-6 space-y-8">
        <section>
          <div className="flex items-center space-x-2 mb-4">
             <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
             <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">Key Points</h3>
          </div>
          <ul className="space-y-4">
            {insights.keyPoints.map((kp, i) => (
              <li key={i} className="flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                 <Sparkles className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                 <span className="text-[14px] text-slate-600 leading-relaxed">{kp}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 transition-all">
            <div className="flex items-center space-x-2 mb-3">
               <FileText className="w-4 h-4 text-orange-500" />
               <h3 className="text-[14px] font-bold text-slate-900 tracking-tight">Live Summary</h3>
            </div>
            <p className="text-[14px] text-slate-600 leading-[1.6] mt-2 transition-all duration-300">
              {insights.summary || 'Summary processing...'}
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-2 mb-4">
             <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
             <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">Important Terms</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3.5">
            {insights.terms.map((term, i) => (
              <div key={i} className="bg-white p-4 rounded-[16px] border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1.5">{term.category}</p>
                <p className="text-[13px] font-bold text-slate-800">{term.value}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
