
import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 reveal">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#202124] mb-6">The Journey.</h2>
          <p className="text-lg text-[#5f6368] max-w-2xl">Deploying intelligence and operational excellence into the world's leading enterprise platforms.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="reveal group google-card bg-white overflow-hidden flex flex-col lg:flex-row transition-all duration-500">
              {/* Image side */}
              <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                <img 
                  src={exp.imageUrl} 
                  alt={exp.company} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              </div>
              
              {/* Content side */}
              <div className="lg:w-3/5 p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-lg bg-[#f1f3f4] flex items-center justify-center text-xl font-bold text-[#1a73e8]">
                      {exp.company[0]}
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-[#202124]">{exp.company}</h3>
                       <p className="text-[#5f6368] text-sm">{exp.location}</p>
                     </div>
                  </div>
                  <div className="md:text-right">
                    <span className="px-3 py-1 bg-[#e8f0fe] text-[#1a73e8] text-xs font-bold rounded-full uppercase tracking-widest">{exp.period}</span>
                  </div>
                </div>

                <h4 className="text-2xl font-bold text-[#1a73e8] mb-8">{exp.role}</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {exp.highlights.map((h, j) => (
                    <div key={j} className="flex gap-4 p-5 bg-[#f8f9fa] rounded-xl border border-transparent hover:border-[#e8eaed] transition-all">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1a73e8] shrink-0"></div>
                      <p className="text-sm text-[#5f6368] leading-relaxed">
                        {h}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
