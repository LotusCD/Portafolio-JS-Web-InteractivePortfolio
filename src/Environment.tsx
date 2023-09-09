
import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshBasicMaterial } from 'three';
import { Html, Text } from "@react-three/drei";
import { Vector3 } from 'three';



const Environment: React.FC<{ playerPosition: Vector3 }> = ({ playerPosition }) => {
  const groundSize = 50;


  const tileMaterialProps = {
    color: "rgba(127, 255, 212, 0.7)",
    emissive: "#7FFFD4",
    transparent: true
  };

  const lightOrbProps = {
    color: "rgba(127, 255, 212, 1)",
    transparent: true
  };

  const lightOrbs = useRef<(THREE.Mesh | null)[]>([]);

  // State Management for Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [activatedTilePosition, setActivatedTilePosition] = useState<Vector3 | null>(null);


  // Mocked player's position for the example
  

  const checkPlayerOnTile = () => {
    const threshold = 0.5;
    const tiles = [{ x: 2, z: 3 }, { x: -3, z: -4 }];

    let activatedTile: Vector3 | null = null;

    for (let tilePos of tiles) {
      if (
        Math.abs(tilePos.x - playerPosition.x) <= threshold &&
        Math.abs(tilePos.z - playerPosition.z) <= threshold
      ) {
        activatedTile = new Vector3(tilePos.x, 1, tilePos.z);  // Convert to Vector3
        break;
      }
    }

    setModalVisible(!!activatedTile);
    setActivatedTilePosition(activatedTile);
};
  

  useFrame(({ clock }) => {
    lightOrbs.current.forEach((orb) => {
      if (orb && orb.material instanceof MeshBasicMaterial) {
        const elapsedTime = clock.getElapsedTime();

        orb.position.y = 0.8 + Math.sin(elapsedTime * 0.5) * 1.5;

        if (Math.cos(elapsedTime) < 0) {
          orb.material.opacity = 0;
        } else {
          orb.material.opacity = Math.max(0, 1 - Math.sin(elapsedTime));
        }

        if (orb.material.opacity === 0 && Math.sin(elapsedTime) >= 0) {
          orb.position.y = 0.5;
          orb.material.opacity = 1;
          clock.start();
        }
      }
    });

    checkPlayerOnTile();
  });

  return (
    <>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[groundSize, groundSize]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>

      {[{ x: 2, z: 3 }, { x: -3, z: -4 }].map((pos, idx) => (
        <React.Fragment key={idx}>
          <mesh position={[pos.x, -0.5, pos.z]}>
            <boxGeometry args={[1, 0, 1]} />
            <meshStandardMaterial {...tileMaterialProps} />
          </mesh>
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

      {isModalVisible && activatedTilePosition && (
              <Text
                position={[activatedTilePosition.x, 1, activatedTilePosition.z]}  // Positioning the text 1 unit above the tile
                fontSize={1}  // Adjust as needed
                color="black"  // Adjust as needed
              >
                Player is on a tile!
              </Text>
            )}
    </>
  );
};

export default Environment;
