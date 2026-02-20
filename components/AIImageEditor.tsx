
import React, { useState } from 'react';
import { generateImage } from '../services/geminiApi';

const AIProjectCatalyst: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateConcept = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);

    try {
      const image = await generateImage(prompt, "16:9");
      setResultImage(image);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      if (message.includes("403")) {
        setError("Access Denied (403). If you restricted your API key, ensure this domain is added to the allowlist in Google Cloud Console.");
      } else {
        setError(message || "Unable to connect to Gemini. Please check your network or API limits.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="catalyst" className="py-32 px-6 bg-white border-t border-[#f1f3f4]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] text-[11px] font-bold uppercase tracking-widest mb-6 inline-block">Interactive Experience</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#202124] mb-6">Project Catalyst.</h2>
          <p className="text-[#5f6368] text-lg max-w-2xl mx-auto font-light leading-relaxed">
            TPMs turn ambiguity into clarity. Describe a complex technical vision below, and let Gemini 2.5 visualize the objective end-state.
          </p>
        </div>

        <div className="google-card p-6 md:p-10 bg-[#f8f9fa] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#3c4043] uppercase tracking-wide">Project Objective</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder='Describe a future project, e.g., "Autonomous logistics network for solar panel delivery"'
                  className="w-full h-40 bg-white border border-[#dadce0] rounded-xl p-5 text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4] transition-all placeholder-[#bdc1c6] resize-none text-lg"
                />
              </div>
              <button 
                onClick={generateConcept}
                disabled={loading || !prompt}
                className="w-full py-4 bg-[#1a73e8] hover:bg-[#1557b0] disabled:bg-[#dadce0] disabled:cursor-not-allowed text-white rounded-md font-bold text-sm uppercase tracking-widest transition-all shadow-md"
              >
                {loading ? "Generating Vision..." : "Visualize Future State"}
              </button>
              {error && <p className="text-[#d93025] text-center text-xs font-bold mt-2">{error}</p>}
            </div>

            <div className="aspect-video rounded-xl bg-white border border-[#dadce0] overflow-hidden flex items-center justify-center relative shadow-inner">
              {resultImage ? (
                <img src={resultImage} alt="AI Vision result" className="w-full h-full object-cover animate-in fade-in duration-700" />
              ) : (
                <div className="text-center p-12 flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#f1f3f4] rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[#9aa0a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <p className="text-xs font-bold text-[#9aa0a6] uppercase tracking-widest">Awaiting Input</p>
                </div>
              )}
              
              {loading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                   <div className="flex gap-2.5 mb-6">
                     <div className="w-3 h-3 rounded-full bg-[#4285F4] animate-bounce"></div>
                     <div className="w-3 h-3 rounded-full bg-[#EA4335] animate-bounce" style={{animationDelay: '0.1s'}}></div>
                     <div className="w-3 h-3 rounded-full bg-[#FBBC04] animate-bounce" style={{animationDelay: '0.2s'}}></div>
                     <div className="w-3 h-3 rounded-full bg-[#34A853] animate-bounce" style={{animationDelay: '0.3s'}}></div>
                   </div>
                   <p className="text-xs font-bold text-[#5f6368] uppercase tracking-[0.3em]">Processing Vision</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIProjectCatalyst;
