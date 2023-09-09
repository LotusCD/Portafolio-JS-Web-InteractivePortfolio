import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshBasicMaterial } from 'three';


const Environment: React.FC = () => {
  const groundSize = 50;

  const tileMaterialProps = {
    color: "rgba(127, 255, 212, 0.7)",
    emissive: "#7FFFD4",
    transparent: true
  };

  const lightOrbProps = {
    color: "rgba(127, 255, 212, 1)", // Starts fully opaque
    transparent: true
  };

  const lightOrbs = useRef<(THREE.Mesh | null)[]>([]);


  

  useFrame(({ clock }) => {
    lightOrbs.current.forEach((orb) => {
      if (orb && orb.material instanceof MeshBasicMaterial) {
        const elapsedTime = clock.getElapsedTime();
  
        // Move the orb upwards with a shortened trajectory
        orb.position.y = 0.8 + Math.sin(elapsedTime * 0.5) * 1.5;

  
        // Hide the orb when moving downwards
        if (Math.cos(elapsedTime) < 0) {
          orb.material.opacity = 0;
        } else {
          orb.material.opacity = Math.max(0, 1 - Math.sin(elapsedTime));
        }
  
        // Reset the orb's position and opacity when it disappears at the peak
        if (orb.material.opacity === 0 && Math.sin(elapsedTime) >= 0) {
          orb.position.y = 0.5;
          orb.material.opacity = 1;
          clock.start();
        }
      }
    });
  });
  
  return (
    <>
      {/* Ground Plane */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[groundSize, groundSize]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>

      {/* Tiles with light orbs */}
      {[{ x: 2, z: 3 }, { x: -3, z: -4 }].map((pos, idx) => (
        <React.Fragment key={idx}>
          {/* Tile */}
          <mesh position={[pos.x, -0.5, pos.z]}>
            <boxGeometry args={[1, 0, 1]} />
            <meshStandardMaterial {...tileMaterialProps} />
          </mesh>
          {/* Light Orb */}
          <mesh 
            ref={(mesh) => { 
                if (mesh) {
                    lightOrbs.current[idx] = mesh; 
                }
            }} 
            position={[pos.x, 0.5, pos.z]}
          >
            <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
            <meshBasicMaterial {...lightOrbProps} />
          </mesh>
        </React.Fragment>
      ))}
    </>
  );
};

export default Environment;
