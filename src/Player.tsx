import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3, PerspectiveCamera } from "three";

const speed = 0.15; // Adjust this for changing speed. A higher value will result in faster movement.
const lerpFactor = 0.2; // Adjust this for smoothness of movement. A value closer to 1 will make it less smooth but faster.

const Player: React.FC<{ cameraRef: React.RefObject<PerspectiveCamera> }> = ({
  cameraRef
}) => {
  const playerRef = useRef<Mesh>(null);
  const targetPosition = useRef(new Vector3(0, 0, 0));

  // Object to keep track of pressed keys
  const keysPressed = useRef<{ [key: string]: boolean }>({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keysPressed.current[event.key] !== undefined) {
        keysPressed.current[event.key] = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (keysPressed.current[event.key] !== undefined) {
        keysPressed.current[event.key] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (playerRef.current) {
      // Adjust the targetPosition based on the speed
      if (keysPressed.current.ArrowUp) targetPosition.current.z -= speed;
      if (keysPressed.current.ArrowDown) targetPosition.current.z += speed;
      if (keysPressed.current.ArrowLeft) targetPosition.current.x -= speed;
      if (keysPressed.current.ArrowRight) targetPosition.current.x += speed;

      // Lerp towards the target position based on the lerpFactor
      playerRef.current.position.lerp(targetPosition.current, lerpFactor);
      if (cameraRef.current) {
        cameraRef.current.position.set(
          playerRef.current.position.x,
          playerRef.current.position.y + 5,
          playerRef.current.position.z + 5
        );
        cameraRef.current.lookAt(playerRef.current.position);
      }
    }
  });

  return (
    <mesh ref={playerRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Player;
