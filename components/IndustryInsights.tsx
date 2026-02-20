
import React, { useState } from 'react';
import { searchInsights } from '../services/geminiApi';

const IndustryInsights: React.FC = () => {
  const [query, setQuery] = useState("What are the latest technical breakthroughs in Agentic AI?");
  const [result, setResult] = useState<string | null>(null);
  const [sources, setSources] = useState<{title: string, uri: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResult(null);
    setSources([]);

    try {
      const { text, sources: nextSources } = await searchInsights(query);
      setResult(text);
      setSources(nextSources);
    } catch (error) {
      console.error("Search error:", error);
      setResult("Unable to retrieve insights. Please check your API key quotas or network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-[#f5f5f7]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">Industry Intelligence.</h2>
          <p className="text-[#86868b] text-xl font-light">
             Real-time, grounded insights powered by Gemini.
          </p>
        </div>

        <div className="reveal relative mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative flex items-center p-2 bg-white rounded-full shadow-lg border border-black/5">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-8 py-4 text-[#1d1d1f] bg-transparent outline-none placeholder-[#86868b] text-lg font-medium"
              placeholder="Query the latest AI trends..."
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              disabled={loading}
              className="bg-[#0071e3] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0077ED] disabled:bg-[#f5f5f7] disabled:text-[#86868b] transition-all shrink-0 shadow-md"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
             <div className="bg-white/80 backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-white shadow-2xl">
                <div className="prose prose-lg prose-slate text-[#1d1d1f] leading-relaxed whitespace-pre-wrap mb-10">
                  {result}
                </div>
                
                {sources.length > 0 && (
                  <div className="pt-8 border-t border-black/5">
                    <h4 className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest mb-6">Citations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {sources.map((source, idx) => (
                         <a 
                           key={idx} 
                           href={source.uri} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#f5f5f7] transition-all group border border-transparent hover:border-black/5"
                         >
                            <div className="w-6 h-6 rounded-full bg-[#f5f5f7] flex items-center justify-center shrink-0 group-hover:bg-[#0071e3] transition-colors">
                              <span className="text-[#86868b] text-[10px] font-bold group-hover:text-white transition-colors">{idx + 1}</span>
                            </div>
                            <span className="text-sm text-[#0071e3] font-medium truncate w-full group-hover:underline decoration-1 underline-offset-2">{source.title}</span>
                         </a>
                      ))}
                    </div>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default IndustryInsights;
