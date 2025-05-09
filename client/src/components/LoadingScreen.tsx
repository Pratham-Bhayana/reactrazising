import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
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
  const earthRef = useRef<THREE.Mesh>(null);
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

  // Simple Earth rotation
  useFrame((_, delta) => {
    if (earthRef.current && animationStage < AnimationStage.MAIN_CONTENT) {
      // Rotate the Earth
      earthRef.current.rotation.y += 0.005;
    }
    // Make the group float slightly
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.2;
    }
  });

  // Handle animation stages
  useEffect(() => {
    if (!earthRef.current) return;

    if (animationStage === AnimationStage.EARTH_ROTATION) {
      // Just rotate for a few seconds
      setTimeout(() => {
        setAnimationStage(AnimationStage.ZOOM_TO_INDIA);
      }, 3000);
    }
    
    if (animationStage === AnimationStage.ZOOM_TO_INDIA) {
      // Zoom in to "India" (approximated position)
      gsap.to(camera.position, {
        x: 4,
        y: 2,
        z: 5,
        duration: 2,
        onComplete: () => {
          setTimeout(() => {
            setAnimationStage(AnimationStage.MAIN_CONTENT);
            gsap.to(camera.position, {
              x: 0,
              y: 0,
              z: 20,
              duration: 1.5
            });
          }, 2000);
        }
      });
    }
    
    // Fade out text when showing main content
    if (animationStage === AnimationStage.MAIN_CONTENT && textRef.current) {
      gsap.to(textRef.current.material, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          setShowCompanyName(false);
        }
      });
    }
  }, [animationStage, camera, setAnimationStage]);
  
  // Add stars background
  useEffect(() => {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });

    // Generate star positions
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
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

  return (
    <group ref={groupRef}>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#00ffff" />
      
      {/* Simple Earth */}
      <mesh ref={earthRef} position={[0, 0, 0]} scale={5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#1a66cc" 
          metalness={0.2} 
          roughness={0.8}
          emissive="#0033aa"
          emissiveIntensity={0.2}
        />
        
        {/* India marker (approximated position) */}
        {animationStage >= AnimationStage.ZOOM_TO_INDIA && (
          <group position={[0.5, 0.3, 0.8]} scale={0.1}>
            <mesh>
              <cylinderGeometry args={[0, 0.1, 0.3, 8]} />
              <meshStandardMaterial color="#ff5252" emissive="#ff2222" emissiveIntensity={2} />
            </mesh>
          </group>
        )}
      </mesh>
      
      {/* Glow effect around Earth */}
      <mesh scale={5.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#00ffff" 
          transparent={true} 
          opacity={0.1} 
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Company Name */}
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
        >
          RAIZING SOVEREIGN
          <meshBasicMaterial 
            attach="material" 
            color="#ffffff"
            toneMapped={false}
          />
        </Text>
      )}
    </group>
  );
}
