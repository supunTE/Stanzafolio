import { animated, config, useSpring } from "@react-spring/three";
import { Html } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { ReactNode, useState } from "react";
import {
  BufferGeometry,
  Color,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
import clsx from "clsx";

type ModelMeshProps = {
  name: string;
  nodes: Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  >;
  hoverColor: string;
  hoverContent?: string | ReactNode;
} & MeshProps;

type SpringProps = {
  color: Color;
};

export default function ModelMesh({
  name,
  nodes,
  hoverColor,
  hoverContent,
  ...props
}: ModelMeshProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { color } = useSpring<SpringProps>({
    color: isHovered ? hoverColor : "#fff",
    config: {
      duration: 250,
    },
  });

  return (
    <mesh
      {...props}
      name={name}
      castShadow
      receiveShadow
      geometry={nodes.geometry}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={() => {
        setIsHovered(false);
      }}
    >
      <Html>
        {hoverContent && (
          <div
            className={clsx(
              "bg-white text-black text-center min-w-72 p-4",
              "rounded-lg shadow-lg border border-black transition-all duration-300",
              {
                "opacity-0": !isHovered,
                "opacity-100": isHovered,
              }
            )}
            style={{
              backgroundColor: hoverColor,
            }}
          >
            {hoverContent}
          </div>
        )}
      </Html>
      <animated.meshStandardMaterial flatShading={true} color={color} />
    </mesh>
  );
}
