import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Plane } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import Earth from "./Earth";
import { AnimationStage } from "../lib/constants";
import { useAudio } from "../lib/stores/useAudio";

interface LoadingScreenProps {
  animationStage: AnimationStage;
  setAnimationStage: React.Dispatch<React.SetStateAction<AnimationStage>>;
  hasInteracted: boolean;
}

export default function LoadingScreen({ 
  animationStage, 
  setAnimationStage,
  hasInteracted 
}: LoadingScreenProps) {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const { scene, camera } = useThree();
  const [showCompanyName, setShowCompanyName] = useState(true);
  const { playSuccess, toggleMute } = useAudio();

  // Start background audio on interaction
  useEffect(() => {
    if (hasInteracted) {
      toggleMute();
      playSuccess();
    }
  }, [hasInteracted, toggleMute, playSuccess]);

  // Handle company name fade out when transitioning to main content
  useEffect(() => {
    if (animationStage === AnimationStage.MAIN_CONTENT && textRef.current) {
      // Fade out company name
      gsap.to(textRef.current.material, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          setShowCompanyName(false);
        }
      });
    }
  }, [animationStage]);

  // Add stars background
  useEffect(() => {
    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
    });

    // Generate random stars positions
    const starsCount = 2000;
    const positions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
      // Random positions in a large sphere around the scene
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    return () => {
      scene.remove(stars);
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, [scene]);

  // Move camera and stars with animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle floating movement for the loading screen
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth component */}
      <Earth 
        animationStage={animationStage} 
        setAnimationStage={setAnimationStage} 
        position={[0, 0, 0]}
      />
      
      {/* Company Name with Neon Glow */}
      {showCompanyName && (
        <Text
          ref={textRef}
          position={[0, -7, 0]}
          fontSize={1.3}
          color="#ffffff"
          font="/fonts/inter.json"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#00ffff"
          maxWidth={20}
          lineHeight={1.2}
          letterSpacing={0.1}
        >
          RAIZING SOVEREIGN
          <meshBasicMaterial 
            attach="material" 
            color="#ffffff"
            toneMapped={false}
          />
        </Text>
      )}
      
      {/* Neon Glow Effect for text */}
      {showCompanyName && (
        <Text
          position={[0, -7, -0.1]}
          fontSize={1.3}
          color="#00ffff"
          font="/fonts/inter.json"
          anchorX="center"
          anchorY="middle"
          maxWidth={20}
          lineHeight={1.2}
          letterSpacing={0.1}
          opacity={0.6}
        >
          RAIZING SOVEREIGN
          <meshBasicMaterial 
            attach="material" 
            color="#00ffff"
            toneMapped={false}
            transparent={true}
            opacity={0.6}
          />
        </Text>
      )}
      
      {/* Add a subtle floor reflection plane */}
      <Plane 
        args={[40, 40]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -10, 0]}
      >
        <meshBasicMaterial 
          color="#000020" 
          transparent 
          opacity={0.2} 
          side={THREE.DoubleSide}
        />
      </Plane>
    </group>
  );
}
