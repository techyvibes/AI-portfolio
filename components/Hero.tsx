
import React, { useState, useRef, useEffect } from 'react';

const Hero: React.FC = () => {
  const [profileImg, setProfileImg] = useState<string>('/profile.png');
  const [hasError, setHasError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const handleImageError = () => {
    if (profileImg === '/profile.png') {
      // Fallback if profile.png is missing (e.g. old deploy)
      setProfileImg('https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=800');
      setHasError(true);
    }
  };

  const handleCircleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
        setHasError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center pt-32 pb-20 overflow-hidden bg-[#f8f9fa]">
      {/* Hidden file input for manual upload fallback */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />

      {/* Soft background glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="z-10 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Profile Picture Frame */}
        <div 
          className="relative inline-block mb-12 group cursor-pointer"
          onClick={handleCircleClick}
          title="Click to upload a different photo"
        >
          {/* Animated Gradient Border Layer */}
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#34A853] rounded-full blur-md opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-[6px] border-white shadow-[0_32px_64px_rgba(0,0,0,0.15)] overflow-hidden bg-[#f1f3f4]">
            <img 
              src={profileImg} 
              alt="Joseph Tumwebaze" 
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              style={{
                filter: 'contrast(1.02) brightness(1.02)',
              }}
              onError={handleImageError}
            />
            
            {/* Overlay hint if image hasn't loaded properly */}
            {hasError && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Update Photo</span>
              </div>
            )}
          </div>

          {/* Floating Status Badge */}
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-[#34A853] border-4 border-white rounded-full shadow-lg"></div>
        </div>

        <div className="flex justify-center space-x-3 mb-10">
          <div className="w-2 h-2 rounded-full bg-[#4285F4]"></div>
          <div className="w-2 h-2 rounded-full bg-[#EA4335]"></div>
          <div className="w-2 h-2 rounded-full bg-[#FBBC04]"></div>
          <div className="w-2 h-2 rounded-full bg-[#34A853]"></div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#202124] mb-8 leading-[1.1]">
          My mission is to <br />
          <span className="text-[#4285F4]">scale intelligence.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#5f6368] max-w-3xl mx-auto font-light leading-relaxed mb-12">
          Joseph Tumwebaze is a Technical Program Manager orchestrating global-scale 
          <span className="text-[#202124] font-medium"> Agentic AI systems</span> and release infrastructure at Salesforce.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a 
            href="#experience" 
            onClick={(e) => scrollToSection(e, 'experience')}
            className="px-12 py-5 bg-[#1a73e8] text-white rounded-full font-semibold text-lg hover:bg-[#1557b0] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Work & Impact
          </a>
          <a 
            href="#catalyst" 
            onClick={(e) => scrollToSection(e, 'catalyst')}
            className="px-12 py-5 border border-[#dadce0] bg-white text-[#1a73e8] rounded-full font-semibold text-lg hover:bg-[#f8f9fa] transition-all"
          >
            AI Vision Sandbox
          </a>
        </div>
      </div>
      
      <div className="z-10 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl border border-[#dadce0]">
           <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Scale" />
        </div>
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-[#dadce0] hidden md:block">
           <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="AI Robot" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
