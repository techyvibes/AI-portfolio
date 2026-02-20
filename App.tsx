
import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import AIProjectCatalyst from './components/AIImageEditor';
import ImpactMetrics from './components/ImpactMetrics';
import ProjectGallery from './components/ProjectGallery';
import IndustryInsights from './components/IndustryInsights';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<'home' | 'projects'>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const navigateTo = (e: React.MouseEvent, targetView: 'home' | 'projects') => {
    e.preventDefault();
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (view !== 'home') {
      setView('home');
      // Wait for re-render then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#3c4043] antialiased">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || view === 'projects' ? 'nav-blur py-3 shadow-sm border-b border-[#f1f3f4]' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={(e) => navigateTo(e, 'home')}>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FBBC04]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#202124]">Joseph T.</span>
          </div>
          
          <div className="flex items-center space-x-8 text-[13px] font-medium text-[#5f6368]">
            <a href="#" onClick={(e) => navigateTo(e, 'home')} className={`hover:text-[#1a73e8] transition-colors ${view === 'home' ? 'text-[#1a73e8] font-bold' : ''}`}>Home</a>
            <a href="#" onClick={(e) => navigateTo(e, 'projects')} className={`hover:text-[#1a73e8] transition-colors ${view === 'projects' ? 'text-[#1a73e8] font-bold' : ''}`}>System Design</a>
            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="hover:text-[#1a73e8] transition-colors hidden md:block">Impact</a>
            <a href="mailto:t.joseph.tjk@gmail.com" className="px-5 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-md transition-all font-semibold shadow-sm">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main>
        {view === 'home' ? (
          <>
            <Hero />
            <ImpactMetrics />
            <Experience />
            <Skills />
            <IndustryInsights />
            <AIProjectCatalyst />

            {/* Dynamic Image Grid Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden reveal">
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Collab" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden mt-8 reveal" style={{transitionDelay: '0.1s'}}>
                  <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Data" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden reveal" style={{transitionDelay: '0.2s'}}>
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Office" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden mt-8 reveal" style={{transitionDelay: '0.3s'}}>
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Security" />
                </div>
              </div>
            </section>

            {/* Closing Identity Section */}
            <section className="py-40 px-6 text-center bg-[#f8f9fa]">
              <div className="max-w-3xl mx-auto reveal">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#202124] mb-8">Committed to technical <br /> <span className="text-[#4285F4]">excellence at scale.</span></h2>
                <p className="text-lg text-[#5f6368] mb-12 font-light leading-relaxed">Scaling AI is as much about human-centered systems as it is about code. I build for longevity, performance, and trust.</p>
                <div className="flex justify-center flex-wrap gap-4">
                   {["Responsibility", "Futuristic", "Learner", "Belief", "Positivity"].map(s => (
                     <span key={s} className="px-4 py-2 rounded-full border border-[#dadce0] bg-white text-[#5f6368] text-xs font-bold uppercase tracking-widest">{s}</span>
                   ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <ProjectGallery />
        )}
      </main>

      {/* Google-Style Footer */}
      <footer className="py-16 px-8 border-t border-[#f1f3f4] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold tracking-tight text-[#202124] mb-2">Joseph Tumwebaze</div>
              <p className="text-[#5f6368] text-sm">TPM, Agentic AI & Global Release Management.</p>
            </div>
            <div className="flex gap-10">
               <a href="https://www.linkedin.com/in/joseph-tumwebaze/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#5f6368] hover:text-[#4285F4] transition-colors">LinkedIn</a>
               <a href="mailto:t.joseph.tjk@gmail.com" className="text-sm font-bold text-[#5f6368] hover:text-[#4285F4] transition-colors">Email</a>
               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#5f6368] hover:text-[#4285F4] transition-colors">GitHub</a>
            </div>
          </div>
          <div className="pt-8 border-t border-[#f1f3f4] text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-6 text-[11px] font-bold text-[#70757a] uppercase tracking-widest">
              <span>Joseph Tumwebaze &copy; 2024</span>
              <span className="hidden md:block h-3 w-[1px] bg-[#dadce0]"></span>
              <span>Built with Gemini 2.5 Flash</span>
              <span className="hidden md:block h-3 w-[1px] bg-[#dadce0]"></span>
              <a href="#" className="hover:text-[#4285F4]">Privacy</a>
              <a href="#" className="hover:text-[#4285F4]">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
