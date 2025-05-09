import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function DetailedServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%"
          }
        }
      );
    }
  }, []);

  return (
    <section id="detailed-services" ref={sectionRef} className="py-20 px-6 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef} 
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
        >
          Our Comprehensive Services
        </h2>

        <div className="space-y-16">
          {/* Citizenship by Investment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-white mb-4 neon-text">Citizenship by Investment</h3>
              <p className="text-gray-300 mb-4">
                Our Citizenship by Investment service provides a streamlined pathway to acquiring a second passport through strategic financial investments in approved government programs.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Due diligence and eligibility assessment</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Documentation preparation and submission</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Investment selection and guidance</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Application monitoring and follow-up</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Passport and citizenship acquisition</span>
                </li>
              </ul>
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium">
                Explore Citizenship Options
              </button>
            </div>
            <div className="order-1 md:order-2 bg-gray-900 p-1 rounded-xl glow-effect">
              <div className="bg-[url('/images/citizenship.jpg')] bg-cover bg-center h-80 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 p-4 bg-black/60 backdrop-blur-sm rounded-lg max-w-xs">
                  <p className="text-cyan-400 text-sm font-semibold">Starting from</p>
                  <p className="text-white text-xl font-bold">$100,000 USD</p>
                  <p className="text-gray-300 text-xs">Processing time: 3-6 months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Residency Programs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-2">
              <h3 className="text-2xl font-bold text-white mb-4 neon-text">Residency Programs</h3>
              <p className="text-gray-300 mb-4">
                Our Residency Programs offer pathways to legal permanent residency in desirable countries through various investment routes, including real estate, business creation, and financial contributions.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Personalized residency program selection</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Real estate investment guidance</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Business planning and establishment support</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Residency permit application and renewal</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Path to citizenship planning and guidance</span>
                </li>
              </ul>
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium">
                Discover Residency Options
              </button>
            </div>
            <div className="order-1 md:order-1 bg-gray-900 p-1 rounded-xl glow-effect">
              <div className="bg-[url('/images/residency.jpg')] bg-cover bg-center h-80 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 p-4 bg-black/60 backdrop-blur-sm rounded-lg max-w-xs">
                  <p className="text-cyan-400 text-sm font-semibold">Starting from</p>
                  <p className="text-white text-xl font-bold">€250,000 EUR</p>
                  <p className="text-gray-300 text-xs">Processing time: 2-4 months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Advisory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-white mb-4 neon-text">Investment Advisory</h3>
              <p className="text-gray-300 mb-4">
                Our Investment Advisory service provides expert guidance on selecting and managing investments that align with your immigration goals while offering optimal financial returns and security.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Customized investment portfolio design</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Financial risk assessment and mitigation</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Real estate market analysis and selection</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Government fund contribution guidance</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Long-term investment management support</span>
                </li>
              </ul>
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium">
                Get Investment Guidance
              </button>
            </div>
            <div className="order-1 md:order-2 bg-gray-900 p-1 rounded-xl glow-effect">
              <div className="bg-[url('/images/investment.jpg')] bg-cover bg-center h-80 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 p-4 bg-black/60 backdrop-blur-sm rounded-lg max-w-xs">
                  <div className="flex items-center space-x-2 mb-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <p className="text-white text-sm">98% client satisfaction rate</p>
                  <p className="text-gray-300 text-xs">Expert advisors with 15+ years experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-2">
              <h3 className="text-2xl font-bold text-white mb-4 neon-text">Additional Services</h3>
              <p className="text-gray-300 mb-4">
                We provide comprehensive support services to ensure a smooth transition to your new country of residence or citizenship, addressing all aspects of your global mobility journey.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Tax planning and optimization</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Family relocation assistance</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Education and healthcare guidance</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Language and cultural integration</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-300">Business networking and introductions</span>
                </li>
              </ul>
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium">
                View All Services
              </button>
            </div>
            <div className="order-1 md:order-1 bg-gray-900 p-1 rounded-xl glow-effect">
              <div className="bg-[url('/images/additional-services.jpg')] bg-cover bg-center h-80 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 p-4 bg-black/60 backdrop-blur-sm rounded-lg max-w-xs">
                  <p className="text-cyan-400 text-sm font-semibold">Complete Package</p>
                  <p className="text-white text-xl font-bold">Customized Solutions</p>
                  <p className="text-gray-300 text-xs">Tailored to your specific needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-white mb-6">Ready to explore your global mobility options?</h3>
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium text-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
            Schedule a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}