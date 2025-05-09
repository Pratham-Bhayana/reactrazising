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
  const [rotationSpeed, setRotationSpeed] = useState(0.002);

  // Create texture procedurally (since we don't have earth textures)
  const earthMaterial = useMemo(() => {
    const size = 64;
    const data = new Uint8Array(size * size * 4);

    // Generate a basic earth-like texture
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const idx = (i * size + j) * 4;
        
        // Create earth-like pattern
        const latitude = Math.PI * (i / size - 0.5);
        const r = Math.cos(latitude);
        
        // Ocean base (blue)
        data[idx] = 10;    // r
        data[idx + 1] = 50 + Math.sin(j / 10) * 20;  // g 
        data[idx + 2] = 120 + Math.random() * 30;    // b
        data[idx + 3] = 255;  // a
        
        // Land (green/brown randomly distributed)
        if (Math.random() > 0.7) {
          data[idx] = 30 + Math.random() * 50;       // r
          data[idx + 1] = 70 + Math.random() * 60;   // g
          data[idx + 2] = 20 + Math.random() * 40;   // b
        }

        // Ice caps (white at the poles)
        if (Math.abs(latitude) > 0.4 * Math.PI) {
          const poleFactor = (Math.abs(latitude) - 0.4 * Math.PI) / (0.1 * Math.PI);
          data[idx] = Math.min(255, data[idx] + poleFactor * 200);
          data[idx + 1] = Math.min(255, data[idx + 1] + poleFactor * 200);
          data[idx + 2] = Math.min(255, data[idx + 2] + poleFactor * 200);
        }
      }
    }

    // Create texture
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.needsUpdate = true;
    
    return new MeshStandardMaterial({
      map: texture,
      metalness: 0.2,
      roughness: 0.8,
    });
  }, []);

  // Calculate India position on globe
  const indiaPosition = useMemo(() => {
    return latLongToVector3(INDIA_LAT, INDIA_LON, scale + 0.1);
  }, [scale]);
  
  // Orient marker to look at earth center
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.lookAt(0, 0, 0);
    }
  }, []);

  // Animation timeline
  useEffect(() => {
    if (!earthRef.current || backgroundMode) return;

    if (animationStage === AnimationStage.EARTH_ROTATION) {
      // Rotate for 3 seconds
      const timer = setTimeout(() => {
        setAnimationStage(AnimationStage.ZOOM_TO_INDIA);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (animationStage === AnimationStage.ZOOM_TO_INDIA) {
      // Calculate the position to zoom to India
      const indiaPos = latLongToVector3(INDIA_LAT, INDIA_LON, scale);
      
      // Calculate camera target position
      const cameraTargetPos = new THREE.Vector3(
        indiaPos.x * 1.5,
        indiaPos.y * 1.5,
        indiaPos.z * 1.5
      );
      
      // Tween camera to zoom to India
      gsap.to(camera.position, {
        x: cameraTargetPos.x,
        y: cameraTargetPos.y,
        z: cameraTargetPos.z,
        duration: 2.5,
        ease: "power2.inOut",
        onComplete: () => {
          // Show India marker
          if (markerRef.current) {
            gsap.to(markerRef.current.scale, {
              x: 1, y: 1, z: 1,
              duration: 0.5,
              ease: "back.out",
              onComplete: () => {
                // After showing marker, transition to main content
                setTimeout(() => {
                  setAnimationStage(AnimationStage.MAIN_CONTENT);
                  // Zoom camera back out
                  gsap.to(camera.position, {
                    x: 0, y: 0, z: 20,
                    duration: 2,
                    ease: "power2.inOut"
                  });
                  // Stop earth rotation
                  setRotationSpeed(0.0005);
                }, 1500);
              }
            });
          }
        }
      });

      // Adjust earth rotation to make India face forward
      gsap.to(earthRef.current.rotation, {
        y: earthRef.current.rotation.y - Math.PI * 0.5,
        duration: 2.5,
        ease: "power2.inOut"
      });

      // Stop rotation during zoom
      setRotationSpeed(0);
    }
    
    if (animationStage === AnimationStage.MAIN_CONTENT && !backgroundMode) {
      // Slow rotation during main content view
      setRotationSpeed(0.0005);
    }
  }, [animationStage, camera, scale, setAnimationStage, backgroundMode]);

  // Animate earth rotation
  useFrame((_, delta) => {
    if (earthRef.current) {
      // Keep rotating the Earth
      earthRef.current.rotation.y += rotationSpeed * delta * 60;
    }
  });

  // Glow effect shader material
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x00ffff) },
        viewVector: { value: new THREE.Vector3(0, 0, 1) }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.75 - dot(vNormal, vNormel), 2.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, 1.0);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
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
