// Modal.tsx
import React from "react";
import { Text } from "@react-three/drei";
import { Vector3 } from "three";

interface ModalProps {
    position: Vector3
}

const Modal: React.FC<ModalProps> = ({ position }) => {
    return (
        <Text
            position={[position.x, position.y, position.z]}
            fontSize={1}
            color="black"
        >
            Player is on a tile!
        </Text>
    );
}

export default Modal;
