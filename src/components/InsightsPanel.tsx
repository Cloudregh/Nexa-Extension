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
    <div className="w-full bg-[#F8F9FB] min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
        <span className="text-2xl">✨</span>
      </div>
      <h3 className="text-slate-800 font-bold mb-1">No Insights Yet</h3>
      <p className="text-sm text-slate-500 max-w-[200px]">
        Stop recording to generate a detailed AI analysis of your session.
      </p>
    </div>
  );
};