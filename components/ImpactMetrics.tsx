
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Parse the value into prefix, number, and suffix
  // e.g., "+70%" -> prefix: "+", number: 70, suffix: "%"
  // e.g., "50K+" -> prefix: "", number: 50, suffix: "K+"
  const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
  const prefix = match ? match[1] : '';
  const numericValue = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const duration = 2000;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smoother finish (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setDisplayValue(easeProgress * numericValue);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, numericValue]);

  return (
    <div ref={ref} className="inline-flex items-baseline">
      <span>{prefix}</span>
      <span>
        {displayValue.toLocaleString(undefined, { 
          maximumFractionDigits: numericValue % 1 === 0 ? 0 : 1 
        })}
      </span>
      <span>{suffix}</span>
    </div>
  );
};

const ImpactMetrics: React.FC = () => {
  const metrics = [
    { label: "Resolution Speed", value: "+70%", color: "bg-[#4285F4]", sub: "AI Efficiency Gain" },
    { label: "Release Scale", value: "50000", valueDisplay: "50K+", color: "bg-[#EA4335]", sub: "Global Code Changes" },
    { label: "Case Load", value: "3.8M", color: "bg-[#FBBC04]", sub: "Monthly Volume" },
    { label: "Global Stability", value: "0", color: "bg-[#34A853]", sub: "Production Incidents" }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-[#1a73e8] font-bold text-xs uppercase tracking-widest mb-2 block">Performance metrics</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#202124]">Measuring Impact at Scale.</h2>
          </div>
          <p className="text-[#5f6368] max-w-sm">Data-driven orchestration of complex release vehicles and AI agents.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <div key={i} className="reveal group p-8 google-card">
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                <span className="text-xs font-bold text-[#5f6368] uppercase tracking-widest">{metric.label}</span>
              </div>
              <div className="text-5xl font-bold text-[#202124] mb-2 tracking-tight">
                <AnimatedNumber value={metric.valueDisplay || metric.value} />
              </div>
              <div className="text-sm text-[#70757a] font-medium mb-8">{metric.sub}</div>
              <div className="w-full bg-[#f1f3f4] h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${metric.color} transition-all duration-1000 delay-300`} 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
