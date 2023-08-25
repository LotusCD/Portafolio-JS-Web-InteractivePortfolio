import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Environment: React.FC = () => {
  const groundSize = 100;

  const tileMaterialProps = {
    color: "rgba(54, 190, 224, 0.7)",
    transparent: true
  };

  const lightBeamProps = {
    color: "rgba(54, 190, 224, 0.5)",
    transparent: true
  };
  

  // Refs to keep track of the light beams for animation
  const lightBeams = useRef<(THREE.Mesh | null)[]>([]);


  useFrame(({ clock }) => {
    lightBeams.current.forEach((beam) => {
        if (beam) {  // Ensure beam is not null
            const scale = 0.5 + 0.5 * Math.sin(clock.elapsedTime);
            beam.scale.set(scale, scale, scale);
        }
    });
});


  return (
    <>
      {/* Ground Plane */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[groundSize, groundSize]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>

      {/* Tiles with light beams */}
      {[{ x: 2, z: 3 }, { x: -3, z: -4 }].map((pos, idx) => (
        <React.Fragment key={idx}>
          {/* Tile */}
          <mesh position={[pos.x, 0.5, pos.z]}>
            <boxGeometry args={[1, 0, 1]} />
            <meshStandardMaterial {...tileMaterialProps} />
          </mesh>

          {/* Light Beam */}
          <mesh 
            ref={(mesh) => { lightBeams.current[idx] = mesh; }} 
            position={[pos.x, 2, pos.z]} 
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <coneBufferGeometry attach="geometry" args={[0.5, 3, 32]} />
            <meshBasicMaterial {...lightBeamProps} />
          </mesh>
        </React.Fragment>
      ))}
    </>
  );
};

export default Environment;
