import React from "react";
import { Vector3 } from 'three';
import { Text } from "@react-three/drei";

interface ModalProps {
    position: Vector3,
    idx: number
}

const Modal: React.FC<ModalProps> = ({ position, idx }) => {
    let message = '';
    switch (idx) {
        case 0:
            message = "Welcome!";
            break;
        case 1:
            message = "This is my site!";
            break;
        // Add more cases as needed for other tiles
        default:
            message = "Default Message";
    }

    return (
        <Text
            position={[position.x, position.y, position.z]}
            fontSize={1}
            color="black"
        >
            {message}
        </Text>
    );
};

export default Modal;
