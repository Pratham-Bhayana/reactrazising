import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      timeline.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );
    }
  }, []);

  return (
    <section id="programs" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
        >
          Citizenship & Residency Programs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Caribbean Programs */}
          <div className="bg-gray-900 rounded-xl overflow-hidden glow-effect group">
            <div className="h-48 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://raizingsovereign.com/wp-content/uploads/2025/04/Panama-1536x1063.jpg')] bg-cover bg-center opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white neon-text">Caribbean Citizenship Programs</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-4">Acquire citizenship in idyllic Caribbean nations with streamlined processing and minimal residency requirements.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">St. Kitts & Nevis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Grenada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Dominica</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Antigua & Barbuda</span>
                </li>
              </ul>
              <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* European Programs */}
          <div className="bg-gray-900 rounded-xl overflow-hidden glow-effect group">
            <div className="h-48 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://raizingsovereign.com/wp-content/uploads/2025/04/croatia-1-1-1536x1063.jpg')] bg-cover bg-center opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                
                <h3 className="text-xl font-bold text-white neon-text">European Residency & Citizenship</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-4">Access to the European Union through investment opportunities in select member states.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Portugal Golden Visa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Malta Citizenship</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Greece Golden Visa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Spain Golden Visa</span>
                </li>
              </ul>
              <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* North American Programs */}
          <div className="bg-gray-900 rounded-xl overflow-hidden glow-effect group">
            <div className="h-48 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://raizingsovereign.com/wp-content/uploads/2025/04/Brazil-1536x1063.jpg')] bg-cover bg-center opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white neon-text">USA & Canada Programs</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-4">Investment and entrepreneurship pathways to North American residency and citizenship.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">US EB-5 Investor Visa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Canada Start-Up Visa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">US E-2 Treaty Investor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Canada Express Entry</span>
                </li>
              </ul>
              <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Asia-Pacific Programs */}
          <div className="bg-gray-900 rounded-xl overflow-hidden glow-effect group">
            <div className="h-48 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://raizingsovereign.com/wp-content/uploads/2025/04/dubai-1-1-1536x1063.jpg')] bg-cover bg-center opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white neon-text">Asia-Pacific Options</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-4">Economic and investment opportunities in the booming Asia-Pacific region.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Singapore Global Investor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Australia Global Talent Visa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">New Zealand Investor Visa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Malaysia My Second Home</span>
                </li>
              </ul>
              <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Emerging Options */}
          <div className="bg-gray-900 rounded-xl overflow-hidden glow-effect group">
            <div className="h-48 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://raizingsovereign.com/wp-content/uploads/2025/04/thailand-1-1-1536x1063.jpg')] bg-cover bg-center opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white neon-text">Emerging Market Programs</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-4">Alternative citizenship and residency options in rapidly developing regions.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Turkey Citizenship by Investment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Montenegro Citizenship</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Vanuatu Citizenship</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Jordan Citizenship by Investment</span>
                </li>
              </ul>
              <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Specialized Programs */}
          <div className="bg-gray-900 rounded-xl overflow-hidden glow-effect group">
            <div className="h-48 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://raizingsovereign.com/wp-content/uploads/2025/04/mexico-2-1-1536x1063.jpg')] bg-cover bg-center opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white neon-text">Specialized Pathways</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-4">Tailored programs for entrepreneurs, digital nomads, and high-net-worth individuals.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Digital Nomad Visas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Entrepreneur Visas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Retirement Visas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-400">Remote Worker Programs</span>
                </li>
              </ul>
              <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
            Not sure which program is right for you? Our expert consultants will analyze your specific circumstances and goals to recommend the optimal pathway to global citizenship.
          </p>
          <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}