// Tile.tsx
import React, { useRef } from "react";
import { MeshBasicMaterial } from "three";

interface TileProps {
    position: { x: number, z: number },
    tileMaterialProps: any,
    lightOrbProps: any,
    registerOrb: (mesh: THREE.Mesh | null, idx: number) => void,
    idx: number
}

const Tile: React.FC<TileProps> = ({ position, tileMaterialProps, lightOrbProps, registerOrb, idx }) => {
    return (
        <React.Fragment>
            <mesh position={[position.x, -0.5, position.z]}>
                <boxGeometry args={[1, 0, 1]} />
                <meshStandardMaterial {...tileMaterialProps} />
            </mesh>
            <mesh 
                ref={(mesh) => registerOrb(mesh, idx)}
                position={[position.x, 0.5, position.z]}
            >
                <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
                <meshBasicMaterial {...lightOrbProps} />
            </mesh>
        </React.Fragment>
    );
}

export default Tile;
