import { useEffect, useRef, useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  position: string;
  country: string;
  image: string;
  quote: string;
  program: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajiv Sharma",
    position: "Technology Entrepreneur",
    country: "India",
    image: "/images/testimonial-1.jpg",
    quote: "Raizing Sovereign's expertise in citizenship by investment was invaluable. They guided me through every step of the process, making it seamless and stress-free. My family and I are now proud citizens of Grenada, enjoying unprecedented global mobility.",
    program: "Grenada Citizenship by Investment"
  },
  {
    id: 2,
    name: "Elena Petrova",
    position: "Investment Manager",
    country: "Russia",
    image: "/images/testimonial-2.jpg",
    quote: "After researching multiple immigration consultancies, Raizing Sovereign stood out for their professionalism and transparent approach. Their team's knowledge of the Portugal Golden Visa program was exceptional, and they delivered exactly what they promised.",
    program: "Portugal Golden Visa"
  },
  {
    id: 3,
    name: "Mohammed Al-Farsi",
    position: "Business Owner",
    country: "UAE",
    image: "/images/testimonial-3.jpg",
    quote: "The strategic investment advice provided by Raizing Sovereign not only secured my family's second citizenship but also yielded excellent returns. Their attention to detail and personalized service exceeded my expectations.",
    program: "St. Kitts & Nevis Citizenship"
  },
  {
    id: 4,
    name: "Liu Wei",
    position: "Real Estate Developer",
    country: "China",
    image: "/images/testimonial-4.jpg",
    quote: "Navigating international immigration can be daunting, but Raizing Sovereign made it comprehensible and achievable. Their team's expertise in the US EB-5 program was evident from our first consultation to final approval.",
    program: "US EB-5 Investor Visa"
  },
  {
    id: 5,
    name: "Sarah Nguyen",
    position: "Finance Executive",
    country: "Vietnam",
    image: "/images/testimonial-5.jpg",
    quote: "What sets Raizing Sovereign apart is their post-application support. Even after receiving my residency, they continued to assist with settling in, introducing me to local networks, and ensuring my transition was smooth.",
    program: "Greece Golden Visa"
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Pause rotation on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          Success Stories
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Hear from our clients who have successfully obtained citizenships and residencies through our programs.
        </p>

        <div
          ref={testimonialRef}
          className="relative bg-gray-900 rounded-xl p-6 md:p-8 shadow-xl border border-gray-800 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background accent */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

          {/* Quote icon */}
          <div className="absolute top-6 right-6 text-gray-700">
            <svg className="w-16 h-16 opacity-20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div className="relative z-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-700 ${
                  index === activeIndex ? "opacity-100" : "opacity-0 absolute inset-0"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="md:w-1/3">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-800 glow-effect mb-4">
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.position}</p>
                    <p className="text-cyan-400 font-medium">{testimonial.country}</p>
                    <div className="mt-3 inline-block px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-300">
                      {testimonial.program}
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-300 text-lg italic leading-relaxed">"{testimonial.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 w-6" 
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Success stats boxes */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">98%</div>
            <p className="text-gray-300">Success Rate</p>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">1,500+</div>
            <p className="text-gray-300">Families Served</p>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">30+</div>
            <p className="text-gray-300">Countries</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a href="#contact" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
            <span>Read more client stories</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}