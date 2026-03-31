import { useTranscriptStore } from '../store/useTranscriptStore';
import { marked } from 'marked';

// Configure marked to handle line breaks like GitHub
marked.setOptions({ 
  breaks: true,
  gfm: true 
});

export const InsightsPanel = () => {
  const { aiResult, aiLoading } = useTranscriptStore();

  // 1. Loading State
  if (aiLoading) {
    return (
      <div className="w-full bg-[#F8F9FB] min-h-screen">
        <div className="px-6 py-4 border-b border-slate-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">AI Insights</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce"></div>
          </div>
          <p className="text-sm text-slate-500 font-medium italic">Analyzing transcript...</p>
        </div>
      </div>
    );
  }

  // 2. Main Markdown Display
  if (aiResult) {
    const html = marked.parse(aiResult) as string;
    return (
      <div className="w-full bg-[#F8F9FB] min-h-screen">
        <div className="px-6 py-4 border-b border-slate-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">AI Analysis</h2>
        </div>
        <div className="px-6 py-8">
          <article 
            className="prose prose-sm prose-slate max-w-none 
                       prose-headings:text-slate-800 prose-headings:font-bold
                       prose-p:text-slate-600 prose-p:leading-relaxed
                       prose-strong:text-blue-600 prose-strong:font-semibold
                       prose-ul:list-disc prose-li:text-slate-600"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    );
  }

  // 3. Empty State (Before any AI call)
  return (
<<<<<<< HEAD
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

=======
    <div className="w-full bg-[#F8F9FB] min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
        <span className="text-2xl">✨</span>
>>>>>>> d633acc6671a1a7c9b11eecf74bd39cb5c584b66
      </div>
      <h3 className="text-slate-800 font-bold mb-1">No Insights Yet</h3>
      <p className="text-sm text-slate-500 max-w-[200px]">
        Stop recording to generate a detailed AI analysis of your session.
      </p>
    </div>
  );
};