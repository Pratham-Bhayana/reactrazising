import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProgramsSection from "./components/ProgramsSection";
import DetailedServicesSection from "./components/DetailedServicesSection";
import CalculatorSection from "./components/CalculatorSection";
import TestimonialsSection from "./components/TestimonialsSection";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";

function App() {
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Load audio
  useEffect(() => {
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.volume = 0.3;
    bgMusic.loop = true;
    setBackgroundMusic(bgMusic);

    const hitSound = new Audio("/sounds/hit.mp3");
    hitSound.volume = 0.5;
    setHitSound(hitSound);
    
    const successSound = new Audio("/sounds/success.mp3");
    successSound.volume = 0.5;
    setSuccessSound(successSound);

    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <div className="w-full min-h-screen bg-black overflow-auto">
      <div className="w-full min-h-screen text-white">
        <Navbar />
        <HeroSection />
        <DetailedServicesSection />
        <ProgramsSection />
        <CalculatorSection />
        <TestimonialsSection />
      </div>
    </div>
  );
}

export default App;
