import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { MeshStandardMaterial } from "three";
import { AnimationStage } from "../lib/constants";

interface EarthProps {
  animationStage: AnimationStage;
  setAnimationStage: React.Dispatch<React.SetStateAction<AnimationStage>>;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  showIndia?: boolean;
  backgroundMode?: boolean;
}

// India coordinates
const INDIA_LAT = 20.5937;
const INDIA_LON = 78.9629;

// Convert latitude and longitude to 3D position
const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

export default function Earth({
  animationStage,
  setAnimationStage,
  scale = 5,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  showIndia = true,
  backgroundMode = false
}: EarthProps) {
  const earthRef = useRef<THREE.Mesh>(null);
  const markerRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [rotationSpeed, setRotationSpeed] = useState(0.003);

  // Create basic earth material
  const earthMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1a66cc),
      metalness: 0.2,
      roughness: 0.8,
      emissive: new THREE.Color(0x0033aa),
      emissiveIntensity: 0.2
    });
  }, []);

  // Calculate India position on globe
  const indiaPosition = useMemo(() => {
    return latLongToVector3(INDIA_LAT, INDIA_LON, scale + 0.1);
  }, [scale]);

  // Simple animation timeline
  useEffect(() => {
    if (animationStage === AnimationStage.EARTH_ROTATION) {
      const timer = setTimeout(() => {
        setAnimationStage(AnimationStage.ZOOM_TO_INDIA);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (animationStage === AnimationStage.ZOOM_TO_INDIA) {
      const indiaPos = latLongToVector3(INDIA_LAT, INDIA_LON, scale);
      
      // Simple zoom animation
      gsap.to(camera.position, {
        x: indiaPos.x * 2,
        y: indiaPos.y * 2,
        z: indiaPos.z * 2,
        duration: 2.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (markerRef.current) {
            gsap.to(markerRef.current.scale, {
              x: 1, y: 1, z: 1,
              duration: 0.5,
              ease: "back.out",
              onComplete: () => {
                setTimeout(() => {
                  setAnimationStage(AnimationStage.MAIN_CONTENT);
                  gsap.to(camera.position, {
                    x: 0, y: 0, z: 20,
                    duration: 2,
                    ease: "power2.inOut"
                  });
                  setRotationSpeed(0.001);
                }, 1500);
              }
            });
          }
        }
      });

      setRotationSpeed(0);
    }
  }, [animationStage, camera, scale, setAnimationStage]);

  // Animate earth rotation
  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed * delta * 60;
    }
  });

  // Simplified glow material
  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide
    });
  }, []);

  return (
    <group position={position} rotation={rotation}>
      {/* Main Earth Sphere */}
      <mesh ref={earthRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={earthMaterial} attach="material" />
      </mesh>

      {/* Glow effect */}
      <mesh scale={[scale * 1.05, scale * 1.05, scale * 1.05]}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      {/* India Marker */}
      {showIndia && (
        <group 
          ref={markerRef} 
          position={indiaPosition} 
          scale={[0, 0, 0]} // Start invisible
        >
          {/* Location pin */}
          <mesh>
            <cylinderGeometry args={[0, 0.1, 0.3, 8]} />
            <meshStandardMaterial color="#ff5252" emissive="#ff2222" emissiveIntensity={2} />
          </mesh>
          
          {/* India text label */}
          <Html 
            position={[0, 0.5, 0]} 
            center
            distanceFactor={10}
            occlude={[earthRef]}
          >
            <div className="marker-label">
              <span className="marker-text">INDIA</span>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
