import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshBasicMaterial, Vector3 } from 'three';
import { Text } from "@react-three/drei";

// Import the separated components
import Tile from './subcomponents/Tile';
import Modal from './subcomponents/Modal';

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


const Environment: React.FC<{ playerPosition: Vector3 }> = ({ playerPosition }) => {
    const lightOrbs = useRef<(THREE.Mesh | null)[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [activatedTilePosition, setActivatedTilePosition] = useState<Vector3 | null>(null);
    const [activatedTileIdx, setActivatedTileIdx] = useState<number | null>(null);


    const checkPlayerOnTile = () => {
        const threshold = 0.5;
        const tiles = [{ x: 2, z: 3 }, { x: -3, z: -4 }];

        let activatedTile: Vector3 | null = null;

        tiles.forEach((tilePos, index) => {
          if (
              Math.abs(tilePos.x - playerPosition.x) <= threshold &&
              Math.abs(tilePos.z - playerPosition.z) <= threshold
          ) {
              activatedTile = new Vector3(tilePos.x, 1, tilePos.z);
              setActivatedTileIdx(index);
              return;
          }
      });
     

        setModalVisible(!!activatedTile);
        setActivatedTilePosition(activatedTile);
    };

    const registerOrb = (mesh: THREE.Mesh | null, idx: number) => {
        if (mesh) {
            lightOrbs.current[idx] = mesh;
        }
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
              <Tile 
                  position={{ x: pos.x, y: 0.5, z: pos.z }}
                  tileMaterialProps={tileMaterialProps}
                  lightOrbProps={lightOrbProps}
                  registerOrb={registerOrb}
                  idx={idx}
              />
              ))
            }
            

            {isModalVisible && activatedTilePosition && typeof activatedTileIdx === 'number' && (
            <Modal position={activatedTilePosition} idx={activatedTileIdx} />
)}
        </>
    );
};

export default Environment;
