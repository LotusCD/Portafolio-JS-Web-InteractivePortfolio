import React from "react";

const Environment: React.FC = () => {
  const groundSize = 100; // Size of the ground

  return (
    <>
      {/* Ground Plane */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry
          attach="geometry"
          args={[groundSize, groundSize]}
        />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>

      {/* Example Cubes for scenery */}
      <mesh position={[2, 0.5, 3]}>
        <boxGeometry args={[1, 0, 1]} />
        <meshStandardMaterial color="brown" />
      </mesh>

      <mesh position={[-3, 0.5, -4]}>
        <boxGeometry args={[1, 0, 1]} />
        <meshStandardMaterial color="brown" />
      </mesh>

      {/* Add more scenery elements here */}
    </>
  );
};

export default Environment;
