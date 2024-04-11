import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export function RoomLoading() {
  const meshRef = useRef<Mesh>();
  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
      <Html>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg text-black">
            <p>Loading...</p>
          </div>
        </div>
      </Html>
    </mesh>
  );
}
