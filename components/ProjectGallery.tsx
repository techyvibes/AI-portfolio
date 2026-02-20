
import React from 'react';
import { PORTFOLIO_PROJECTS } from '../constants';

const ProjectGallery: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 reveal">
          <span className="text-[#1a73e8] font-bold text-xs uppercase tracking-widest mb-2 block">Technical Deep Dives</span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#202124] mb-6 tracking-tight">System Design & MLOps</h1>
          <p className="text-lg text-[#5f6368] max-w-2xl leading-relaxed">
            Bridging research and production. These case studies explore the architectures required to deploy and maintain AI models at global enterprise scale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {PORTFOLIO_PROJECTS.map((project, idx) => (
            <div key={idx} className="reveal group google-card overflow-hidden flex flex-col lg:flex-row bg-[#f8f9fa]">
              <div className="lg:w-1/2 relative h-80 lg:h-auto">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-[#202124] text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col">
                <h2 className="text-3xl font-bold text-[#202124] mb-4">{project.title}</h2>
                <p className="text-[#5f6368] mb-8 leading-relaxed text-lg font-light">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white border border-[#dadce0] text-[#5f6368] text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#1a73e8] uppercase tracking-[0.2em] mb-4">Key Technical Outcomes</h3>
                  {project.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex gap-4 p-4 bg-white rounded-xl border border-transparent hover:border-[#e8eaed] transition-all">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#e8f0fe] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-[#1a73e8]" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                      </div>
                      <p className="text-sm text-[#3c4043] leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 google-card bg-gradient-to-br from-[#1a73e8] to-[#1557b0] text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Need a System Design Review?</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-10 font-light">
            I specialize in orchestrating safe, scalable release vehicles for complex AI models. Let's discuss your production constraints.
          </p>
          <a href="mailto:t.joseph.tjk@gmail.com" className="inline-block px-10 py-4 bg-white text-[#1a73e8] rounded-full font-bold shadow-xl hover:scale-105 transition-transform">
            Start a Technical Conversation
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
