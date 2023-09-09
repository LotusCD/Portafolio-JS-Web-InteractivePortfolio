
import { MutableRefObject } from 'react';
import { useFrame } from "@react-three/fiber";
import { MeshBasicMaterial, Mesh } from 'three';

const useOrbAnimation = (lightOrbs: MutableRefObject<(Mesh | null)[]>) => {
  useFrame(({ clock }) => {
    lightOrbs.current.forEach((orb) => {
      if (orb && orb.material instanceof MeshBasicMaterial) {
        const elapsedTime = clock.getElapsedTime();
        
        // Move the orb upwards with a shortened trajectory
        orb.position.y = 0.3 + Math.sin(elapsedTime * 0.5) * 2.5;

        // Hide the orb when moving downwards
        if (Math.cos(elapsedTime) < 0) {
          orb.material.opacity = 0;
        } else {
          orb.material.opacity = Math.max(0, 1 - Math.sin(elapsedTime));
        }

        // Reset the orb's position and opacity when it disappears at the peak
        if (orb.material.opacity === 0 && Math.sin(elapsedTime) >= 0) {
          orb.position.y = 0.5;
          orb.material.opacity = 1;
          clock.start();
        }
      }
    });
  });
};

export default useOrbAnimation;
