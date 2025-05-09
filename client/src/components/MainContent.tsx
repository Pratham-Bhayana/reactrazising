import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Earth from "./Earth";
import { AnimationStage } from "../lib/constants";

export default function MainContent() {
  const { camera } = useThree();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Reset camera position
  useEffect(() => {
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <group>
      {/* Background Earth - smaller and slower rotation */}
      <Earth 
        animationStage={AnimationStage.MAIN_CONTENT} 
        setAnimationStage={() => {}} // No state change needed for background earth
        scale={8}
        position={[10, 0, -30]} // Position off to the side and back
        showIndia={false}
        backgroundMode={true}
      />
      
      {/* Main content as HTML */}
      <Html
        ref={contentRef}
        fullscreen
        zIndexRange={[100, 0]}
        className="main-content-wrapper"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          pointerEvents: 'auto',
        }}
        transform
      >
        <div className="w-full min-h-screen bg-transparent text-white">
          <Navbar />
          <HeroSection />
        </div>
      </Html>
    </group>
  );
}
