import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import Player from "./Player";
import Environment from "./Environment";

const GameScene: React.FC = () => {
  const cameraRef = useRef<PerspectiveCamera>(
    new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  );
  const [camera, setCamera] = useState<PerspectiveCamera>();

  useEffect(() => {
    setCamera(cameraRef.current);
    cameraRef.current.position.set(0, 5, 5);
    cameraRef.current.lookAt(0, 0, 0);
  }, []);

  return (
    <Canvas camera={camera}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Player cameraRef={cameraRef} />
      <Environment />
    </Canvas>
  );
};

export default GameScene;
