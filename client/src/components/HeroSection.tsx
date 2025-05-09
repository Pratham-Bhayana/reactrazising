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
    <>
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
      </section>
      
      {/* About Us Section */}
      <section className="bg-black/80 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            About Raizing Sovereign
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 mb-6">
                Raizing Sovereign is a premier global immigration consultancy firm specializing in Residency and Citizenship by Investment programs. With 18+ years of experience, we have guided thousands of families to secure their future through strategic global mobility solutions.
              </p>
              <p className="text-gray-300 mb-6">
                Our expertise spans across multiple jurisdictions, providing tailored immigration pathways to meet your specific needs and goals. Whether you're seeking enhanced global mobility, business expansion, or securing a plan B for your family, our team of experts is committed to delivering exceptional results.
              </p>
              <p className="text-gray-300">
                With offices across major cities and a dedicated team of professionals, we provide comprehensive support throughout your immigration journey, from initial consultation to successful application approval.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-black to-gray-900 rounded-xl shadow-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-emerald-400">Our Core Values</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-300">Integrity and transparency in all client interactions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-300">Personalized solutions tailored to individual needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-300">Unwavering commitment to client success</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-300">Continuous innovation in our service offerings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-300">Global expertise with local understanding</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Our Services
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            We offer comprehensive immigration solutions designed to secure your future and expand your global footprint.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-black p-6 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Citizenship by Investment</h3>
              <p className="text-gray-400">Obtain a second passport through strategic investment in government-approved programs.</p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-black p-6 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h.03a1 1 0 011 1v2h1v-2a1 1 0 011-1h.03a1 1 0 011 1v2h1v-2a1 1 0 011-1h.03a1 1 0 011 1v2h1v-2a1 1 0 011-1h.03a1 1 0 011 1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Residency Programs</h3>
              <p className="text-gray-400">Secure permanent residency through real estate investment, business establishment, or other qualifying routes.</p>
            </div>
            
            {/* Service 3 */}
            <div className="bg-black p-6 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Investment Advisory</h3>
              <p className="text-gray-400">Comprehensive guidance on investment options that align with your immigration goals and financial objectives.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-gray-800 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Get In Touch
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Let us guide you on your journey to global citizenship. Contact our experts today.
          </p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <textarea 
                rows={4} 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Tell us about your immigration goals..."
              ></textarea>
            </div>
            
            <div className="text-center">
              <button type="submit" className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">Raizing Sovereign</h2>
              <p className="text-gray-400">Your gateway to global citizenship</p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Raizing Sovereign. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
