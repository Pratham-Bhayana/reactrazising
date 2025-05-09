import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import { AnimationStage } from "../lib/constants";
import * as THREE from "three";

export default function MainContent() {
  const { camera } = useThree();
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundEarthRef = useRef<THREE.Mesh>(null);
  
  // Reset camera position
  useEffect(() => {
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Animate background Earth
  useFrame(() => {
    if (backgroundEarthRef.current) {
      backgroundEarthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Background Earth */}
      <mesh 
        ref={backgroundEarthRef}
        position={[10, 0, -30]} 
        scale={8}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#1a66cc" 
          metalness={0.2} 
          roughness={0.8}
          emissive="#0033aa"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh 
        position={[10, 0, -30]} 
        scale={8.2}
      >
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial 
          color="#00ffff" 
          transparent={true} 
          opacity={0.1} 
          side={THREE.BackSide}
        />
      </mesh>
      
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
