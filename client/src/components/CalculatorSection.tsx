import { useState } from "react";

type Program = {
  id: string;
  name: string;
  minInvestment: number;
  processingTime: string;
  visaFree: number;
  familyInclusion: boolean;
  taxBenefits: boolean;
};

// Sample program data
const programs: Program[] = [
  {
    id: "st-kitts",
    name: "St. Kitts & Nevis",
    minInvestment: 150000,
    processingTime: "3-6 months",
    visaFree: 156,
    familyInclusion: true,
    taxBenefits: true
  },
  {
    id: "grenada",
    name: "Grenada",
    minInvestment: 150000,
    processingTime: "4-6 months",
    visaFree: 144,
    familyInclusion: true,
    taxBenefits: true
  },
  {
    id: "dominica",
    name: "Dominica",
    minInvestment: 100000,
    processingTime: "3-6 months",
    visaFree: 140,
    familyInclusion: true,
    taxBenefits: true
  },
  {
    id: "antigua",
    name: "Antigua & Barbuda",
    minInvestment: 100000,
    processingTime: "3-5 months",
    visaFree: 151,
    familyInclusion: true,
    taxBenefits: true
  },
  {
    id: "malta",
    name: "Malta",
    minInvestment: 690000,
    processingTime: "12-14 months",
    visaFree: 184,
    familyInclusion: true,
    taxBenefits: false
  },
  {
    id: "portugal",
    name: "Portugal (Golden Visa)",
    minInvestment: 280000,
    processingTime: "6-8 months",
    visaFree: 186,
    familyInclusion: true,
    taxBenefits: true
  },
  {
    id: "greece",
    name: "Greece (Golden Visa)",
    minInvestment: 250000,
    processingTime: "3-6 months",
    visaFree: 186,
    familyInclusion: true,
    taxBenefits: false
  },
  {
    id: "turkey",
    name: "Turkey",
    minInvestment: 400000,
    processingTime: "3-6 months",
    visaFree: 110,
    familyInclusion: true,
    taxBenefits: false
  }
];

export default function CalculatorSection() {
  const [investmentAmount, setInvestmentAmount] = useState<number>(200000);
  const [priorityVisa, setPriorityVisa] = useState<boolean>(false);
  const [priorityProcessing, setPriorityProcessing] = useState<boolean>(false);
  const [priorityTax, setPriorityTax] = useState<boolean>(false);
  const [familySize, setFamilySize] = useState<number>(2);
  
  // Filter programs based on user preferences
  const filteredPrograms = programs.filter(program => {
    // Base investment criteria
    if (program.minInvestment > investmentAmount) return false;
    
    // Additional filtering criteria
    if (priorityVisa && program.visaFree < 150) return false;
    if (priorityProcessing && program.processingTime.includes("12")) return false;
    if (priorityTax && !program.taxBenefits) return false;
    
    return true;
  });
  
  // Sort programs by most suitable first
  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    // Calculate score based on user priorities
    let scoreA = 0;
    let scoreB = 0;
    
    // Higher visa-free countries is better
    if (priorityVisa) {
      scoreA += a.visaFree;
      scoreB += b.visaFree;
    }
    
    // Lower minimum investment is better
    scoreA += (1000000 - a.minInvestment) / 10000;
    scoreB += (1000000 - b.minInvestment) / 10000;
    
    // Faster processing is better
    if (priorityProcessing) {
      scoreA += a.processingTime.includes("3") ? 50 : 0;
      scoreB += b.processingTime.includes("3") ? 50 : 0;
    }
    
    // Tax benefits if prioritized
    if (priorityTax) {
      scoreA += a.taxBenefits ? 100 : 0;
      scoreB += b.taxBenefits ? 100 : 0;
    }
    
    return scoreB - scoreA;
  });

  return (
    <section id="calculator" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          Program Calculator
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Find the perfect citizenship or residency program tailored to your specific requirements and preferences.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-1 bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6">Your Preferences</h3>
            
            <div className="space-y-6">
              {/* Investment Amount Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Budget (USD)
                </label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">$100,000</span>
                  <span className="text-xs text-gray-500">$1,000,000+</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="1000000"
                  step="50000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="mt-2 text-center">
                  <span className="text-lg font-bold text-cyan-400">${investmentAmount.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Family Size */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Family Members (including you)
                </label>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => setFamilySize(Math.max(1, familySize - 1))}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold text-white">{familySize}</span>
                  <button 
                    onClick={() => setFamilySize(familySize + 1)}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Priorities Checkboxes */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Priorities
                </label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="visa-free"
                      checked={priorityVisa}
                      onChange={() => setPriorityVisa(!priorityVisa)}
                      className="h-4 w-4 text-cyan-500 border-gray-700 rounded focus:ring-cyan-500 bg-gray-800"
                    />
                    <label htmlFor="visa-free" className="ml-2 text-sm text-gray-300">
                      Maximum visa-free travel access
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="processing-time"
                      checked={priorityProcessing}
                      onChange={() => setPriorityProcessing(!priorityProcessing)}
                      className="h-4 w-4 text-cyan-500 border-gray-700 rounded focus:ring-cyan-500 bg-gray-800"
                    />
                    <label htmlFor="processing-time" className="ml-2 text-sm text-gray-300">
                      Fastest processing time
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="tax-benefits"
                      checked={priorityTax}
                      onChange={() => setPriorityTax(!priorityTax)}
                      className="h-4 w-4 text-cyan-500 border-gray-700 rounded focus:ring-cyan-500 bg-gray-800"
                    />
                    <label htmlFor="tax-benefits" className="ml-2 text-sm text-gray-300">
                      Tax optimization benefits
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Submit */}
              <div className="pt-4">
                <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium">
                  Request Detailed Analysis
                </button>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6">Recommended Programs</h3>
            
            {sortedPrograms.length > 0 ? (
              <div className="space-y-4">
                {sortedPrograms.slice(0, 4).map(program => (
                  <div key={program.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-colors duration-300">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h4 className="text-lg font-bold text-white">{program.name}</h4>
                        <div className="mt-2 md:mt-0">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-900 text-emerald-300">
                            ${program.minInvestment.toLocaleString()} USD minimum
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400">Processing Time</p>
                          <p className="text-sm text-white">{program.processingTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Visa-Free Countries</p>
                          <p className="text-sm text-white">{program.visaFree} countries</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Family Inclusion</p>
                          <p className="text-sm text-white">{program.familyInclusion ? "Yes, included" : "Limited"}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${familySize <= 4 ? "bg-green-500" : "bg-yellow-500"} mr-2`}></div>
                          <span className="text-xs text-gray-300">{familySize <= 4 ? "Ideal" : "Possible"} for your family size</span>
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg text-sm font-medium">
                          View Program Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {sortedPrograms.length > 4 && (
                  <div className="text-center mt-6">
                    <button className="px-6 py-2 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors">
                      View All {sortedPrograms.length} Matching Programs
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-800">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">No Programs Match Your Criteria</h4>
                <p className="text-gray-400 mb-6">Try adjusting your preferences or increasing your investment budget to see more options.</p>
                <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium">
                  Contact an Advisor
                </button>
              </div>
            )}
            
            <div className="mt-8 p-6 bg-gray-900 rounded-xl border border-gray-800">
              <h4 className="text-lg font-bold text-white mb-4">Schedule a Personalized Consultation</h4>
              <p className="text-gray-300 mb-4">
                For a comprehensive analysis of your eligibility for citizenship and residency programs based on your specific circumstances, schedule a consultation with our expert advisors.
              </p>
              <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium">
                Book Your Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}