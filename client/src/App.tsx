import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef } from "react";
import { OrbitControls, Text3D, Center } from "@react-three/drei";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";
import * as THREE from "three";

// Animation stages
enum AnimationStage {
  LOADING = 0,
  EARTH_ROTATION = 1,
  ZOOM_TO_INDIA = 2,
  MAIN_CONTENT = 3
}

function SimpleEarth({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const indiaMarkerRef = useRef<THREE.Mesh>(null);
  const [stage, setStage] = useState(AnimationStage.EARTH_ROTATION);
  
  // Handle animation stages
  useEffect(() => {
    if (stage === AnimationStage.EARTH_ROTATION) {
      // After 3 seconds, transition to zoom stage
      const timer = setTimeout(() => {
        setStage(AnimationStage.ZOOM_TO_INDIA);
      }, 3000);
      return () => clearTimeout(timer);
    }
    
    if (stage === AnimationStage.ZOOM_TO_INDIA) {
      // After 3 more seconds, transition to main content
      const timer = setTimeout(() => {
        setStage(AnimationStage.MAIN_CONTENT);
        onAnimationComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage, onAnimationComplete]);
  
  // Animate earth rotation
  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.5;
    }
  });
  
  return (
    <group>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0088ff" />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#00ffff" />
      
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial 
          color="#1a66cc" 
          metalness={0.3} 
          roughness={0.7}
          emissive="#0033aa"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Earth glow */}
      <mesh scale={5.1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#00ffff" 
          transparent={true} 
          opacity={0.2} 
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* India marker */}
      {stage >= AnimationStage.ZOOM_TO_INDIA && (
        <mesh 
          ref={indiaMarkerRef} 
          position={[3, 2, 4]} 
          scale={0.3}
        >
          <cylinderGeometry args={[0, 0.3, 0.8, 8]} />
          <meshStandardMaterial color="#ff5252" emissive="#ff2222" emissiveIntensity={2} />
        </mesh>
      )}
      
      {/* Stars */}
      <Points count={1000} positions={Array.from({ length: 3000 }, () => (Math.random() - 0.5) * 100)} />
      
      {/* Company Name - simplified text */}
      <group position={[0, -7, 0]}>
        <mesh>
          <planeGeometry args={[12, 2]} />
          <meshBasicMaterial color="black" transparent opacity={0.7} />
        </mesh>
        
        {/* Simple glowing plane for text background */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[10, 1.5]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.1} />
        </mesh>
      </group>
    </group>
  );
}

// Simple stars component
function Points({ count, positions }: { count: number, positions: number[] }) {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(positions)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" sizeAttenuation transparent />
    </points>
  );
}

function App() {
  const [showEarth, setShowEarth] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Simple progress simulation
  useEffect(() => {
    if (loadingProgress < 100) {
      const timer = setTimeout(() => {
        setLoadingProgress(prev => Math.min(prev + 10, 100));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress]);

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

  function handleAnimationComplete() {
    setShowEarth(false);
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {showEarth ? (
        // 3D Earth animation
        <Canvas
          camera={{ position: [0, 0, 15], fov: 45 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <SimpleEarth onAnimationComplete={handleAnimationComplete} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      ) : (
        // Main website content
        <div className="w-full min-h-screen text-white overflow-auto">
          <Navbar />
          <HeroSection />
        </div>
      )}
      
      {loadingProgress < 100 && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="flex flex-col items-center">
            <div className="text-2xl text-white mb-6 font-bold">Raizing Sovereign</div>
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                style={{ width: `${loadingProgress}%`, transition: 'width 0.2s ease-out' }}
              ></div>
            </div>
            <div className="mt-2 text-white text-sm">
              Loading... {loadingProgress}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
