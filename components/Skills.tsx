
import React from 'react';
import { SKILL_CATEGORIES } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 reveal">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#202124] mb-6">Expertise.</h2>
          <p className="text-lg text-[#5f6368] max-w-xl">Deep technical expertise in AI operations and enterprise release management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div key={i} className="reveal group">
              <div className="flex items-center gap-3 mb-10">
                <div className={`w-1 h-8 rounded-full ${i === 0 ? 'bg-[#4285F4]' : i === 1 ? 'bg-[#EA4335]' : 'bg-[#FBBC04]'}`}></div>
                <h3 className="text-sm font-bold text-[#3c4043] uppercase tracking-[0.3em]">{cat.title}</h3>
              </div>
              <div className="space-y-6">
                {cat.skills.map((skill, j) => (
                  <div key={j} className="group-hover:translate-x-1 transition-transform duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-[#70757a] hover:text-[#202124] transition-colors tracking-tight cursor-default">
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
