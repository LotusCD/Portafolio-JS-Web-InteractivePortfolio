import React from "react";

interface TileProps {
    position: { x: number, y: number, z: number },
    tileMaterialProps: any,
    lightOrbProps: any,
    registerOrb: (mesh: THREE.Mesh | null, idx: number) => void,
    idx: number
}

const Tile: React.FC<TileProps> = ({ position, tileMaterialProps, lightOrbProps, registerOrb, idx }) => {
    return (
        <React.Fragment>
            <mesh position={[position.x, position.y - 0.5, position.z]}>
                <boxGeometry args={[1, 0, 1]} />
                <meshStandardMaterial {...tileMaterialProps} />
            </mesh>
            <mesh 
                ref={(mesh) => registerOrb(mesh, idx)}
                position={[position.x, position.y + 1, position.z]} // Change from 1 to 0.3
            >
                <boxBufferGeometry attach="geometry" args={[lightOrbProps.width || 0.5, 0.1, lightOrbProps.height || 0.5]} />
                <meshBasicMaterial {...lightOrbProps} />
            </mesh>
        </React.Fragment>
    );
};

export default Tile;
