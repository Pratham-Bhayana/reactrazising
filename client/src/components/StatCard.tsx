import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Globe, Clock, Users, ExternalLink, BarChart3 } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
}

export default function StatCard({ value, label, icon = "chart" }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Add hover effect
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const glowElement = card.querySelector('.glow-effect');
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      gsap.to(glowElement, {
        background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0, 255, 255, 0.15), transparent 50%)`,
        duration: 0.3
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(glowElement, {
        background: 'transparent',
        duration: 0.3
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Render icon based on prop
  const renderIcon = () => {
    switch(icon) {
      case 'globe':
        return <Globe className="w-8 h-8 text-cyan-400" />;
      case 'clock':
        return <Clock className="w-8 h-8 text-emerald-400" />;
      case 'users':
        return <Users className="w-8 h-8 text-cyan-400" />;
      case 'link':
        return <ExternalLink className="w-8 h-8 text-emerald-400" />;
      case 'chart':
      default:
        return <BarChart3 className="w-8 h-8 text-cyan-400" />;
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors duration-300 overflow-hidden group"
    >
      {/* Glow effect on hover */}
      <div className="glow-effect absolute inset-0 pointer-events-none"></div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12">
        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-cyan-400 to-transparent"></div>
        <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-cyan-400 to-transparent"></div>
      </div>
      
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-4">
          {renderIcon()}
        </div>
        
        {/* Value */}
        <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
          {value}
        </div>
        
        {/* Label */}
        <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
          {label}
        </div>
      </div>
    </div>
  );
}
