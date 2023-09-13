
import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, Vector3, PerspectiveCamera } from "three";


const speed = 0.15; // Adjust this for changing speed. A higher value will result in faster movement.
const lerpFactor = 0.2; // Adjust this for smoothness of movement. A value closer to 1 will make it less smooth but faster.

const Player: React.FC<{ cameraRef: React.RefObject<PerspectiveCamera>, onPositionUpdate: (pos: Vector3) => void }> = ({
  cameraRef,
  onPositionUpdate
}) => {
  const { size, setSize } = useThree();
  const playerRef = useRef<Mesh>(null);
  const targetPosition = useRef(new Vector3(0, 0, 10));
  const initialTouchPoint = useRef<{ x: number, y: number } | null>(null);

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

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      initialTouchPoint.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (initialTouchPoint.current) {
        const deltaX = touch.clientX - initialTouchPoint.current.x;
        const deltaY = touch.clientY - initialTouchPoint.current.y;
    
        // Calculate potential new positions
        const potentialX = targetPosition.current.x + deltaX * 0.05;
        const potentialZ = targetPosition.current.z + deltaY * 0.05;
    
        // Apply boundary checks
        if (potentialX > minX && potentialX < maxX) {
          targetPosition.current.x = potentialX;
        }
    
        if (potentialZ > minZ && potentialZ < maxZ) {
          targetPosition.current.z = potentialZ;
        }
    
        initialTouchPoint.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchEnd = () => {
      initialTouchPoint.current = null;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Define the boundaries based on the groundSize from Environment.tsx
  // Note: You might need to import the groundSize from the Environment.tsx or define it directly here.
  const groundSize = 30; // This is based on the value from Environment.tsx
  const halfGroundSize = groundSize / 2;
  const minX = -halfGroundSize;
  const maxX = halfGroundSize;
  const minZ = -halfGroundSize;
  const maxZ = halfGroundSize;

  useFrame(() => {
    if (playerRef.current) {
      if (keysPressed.current.ArrowUp && targetPosition.current.z - speed > minZ) targetPosition.current.z -= speed;
      if (keysPressed.current.ArrowDown && targetPosition.current.z + speed < maxZ) targetPosition.current.z += speed;
      if (keysPressed.current.ArrowLeft && targetPosition.current.x - speed > minX) targetPosition.current.x -= speed;
      if (keysPressed.current.ArrowRight && targetPosition.current.x + speed < maxX) targetPosition.current.x += speed;

      playerRef.current.position.lerp(targetPosition.current, lerpFactor);
      if (cameraRef.current) {
        cameraRef.current.position.set(
          playerRef.current.position.x,
          playerRef.current.position.y + 5,
          playerRef.current.position.z + 5
        );
        cameraRef.current.lookAt(playerRef.current.position);
      onPositionUpdate(playerRef.current.position);
      }
    }
  });

  return (
    <mesh ref={playerRef} position={[0, 0, -30]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Player;
