import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import StatCard from "./StatCard";
import { cn } from "../lib/utils";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Animate elements when component mounts
  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    timeline
      .fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        statsRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
        "-=0.6"
      );
      
    // Add a subtle parallax effect on mouse move
    if (sectionRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 10;
        
        gsap.to(titleRef.current, {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 1,
          ease: "power1.out"
        });
        
        gsap.to(subtitleRef.current, {
          x: xPos * 0.3,
          y: yPos * 0.3,
          duration: 1.2,
          ease: "power1.out"
        });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full pt-24 flex flex-col justify-center items-center px-6"
    >
      {/* Visual elements - glowing lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Horizontal lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
        
        {/* Vertical lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto z-10 text-center">
        {/* Main title */}
        <h1 
          ref={titleRef}
          className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-bold mb-6",
            "text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-white"
          )}
        >
          Global Mobility Redefined
        </h1>
        
        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-gray-300 mb-12"
        >
          Secure Residency and Citizenship through strategic investment.
        </p>
        
        {/* Stats section */}
        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          <StatCard 
            value="18+ Years" 
            label="in Visa Processing & Tourism"
            icon="clock"
          />
          <StatCard 
            value="54" 
            label="Branches Worldwide"
            icon="globe"
          />
          <StatCard 
            value="1000+" 
            label="Successful Applications"
            icon="users"
          />
        </div>
        
        {/* CTA Button */}
        <div className="mt-16">
          <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105">
            Start Your Journey
          </button>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center pointer-events-none">
        <div className="w-24 h-12 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent blur-md"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
