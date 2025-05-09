import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Loader, Stats } from "@react-three/drei";
import LoadingScreen from "./components/LoadingScreen";
import MainContent from "./components/MainContent";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";
import { AnimationStage } from "./lib/constants";

function App() {
  const [animationStage, setAnimationStage] = useState<AnimationStage>(
    AnimationStage.INITIAL
  );
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Load and set up background music
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

  // Simulate loading progress
  useEffect(() => {
    if (animationStage === AnimationStage.INITIAL && loadingProgress < 100) {
      const timer = setTimeout(() => {
        setLoadingProgress((prev) => Math.min(prev + 10, 100));
      }, 400);
      return () => clearTimeout(timer);
    }

    if (loadingProgress === 100 && animationStage === AnimationStage.INITIAL) {
      // Delay to start the rotation animation
      const timer = setTimeout(() => {
        setAnimationStage(AnimationStage.EARTH_ROTATION);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress, animationStage]);

  // Handle click to start if not yet interacted
  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <div 
      className="w-full h-screen bg-black overflow-hidden" 
      onClick={handleInteraction}
    >
      <Canvas
        shadows
        camera={{
          position: [0, 0, 20],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          powerPreference: "default"
        }}
      >
        <Suspense fallback={null}>
          <LoadingScreen 
            animationStage={animationStage} 
            setAnimationStage={setAnimationStage}
            hasInteracted={hasInteracted}
          />
          {animationStage >= AnimationStage.MAIN_CONTENT && (
            <MainContent />
          )}
          <Stats />
        </Suspense>
      </Canvas>
      
      <Loader 
        containerStyles={{
          background: 'black',
          zIndex: 1000
        }}
        innerStyles={{
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          height: '5px'
        }}
        barStyles={{
          backgroundColor: '#10b981',
          height: '5px'
        }}
        dataStyles={{
          color: 'white',
          fontSize: '0.8rem',
          fontFamily: 'Inter, sans-serif'
        }}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />

      {loadingProgress < 100 && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
              style={{ width: `${loadingProgress}%`, transition: 'width 0.4s ease-out' }}
            ></div>
          </div>
          <div className="absolute mt-16 text-white text-sm font-medium">
            {loadingProgress < 100 ? `Loading... ${loadingProgress}%` : 'Ready'}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
