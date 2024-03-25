import { animated, useSpring } from "@react-spring/three";
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
import { Ternary } from "../model";

export type ModelMeshProps = {
  name: string;
  nodes: Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  >;
  hoverColor: string;
  hoverContent?: string | ReactNode;
  isParentHovered?: Ternary;
} & MeshProps;

type SpringProps = {
  color: Color;
};

export default function ModelMesh({
  name,
  nodes,
  hoverColor,
  hoverContent,
  isParentHovered = Ternary.Unknown,
  ...props
}: ModelMeshProps) {
  const [isChildHovered, setIsChildHovered] = useState(false);

  const isHovered = isParentHovered === Ternary.True || isChildHovered;

  const { color } = useSpring<SpringProps>({
    color: isHovered ? hoverColor : "#fff",
    config: {
      duration: 300,
    },
  });

  return (
    <mesh
      {...props}
      key={name}
      name={name}
      castShadow
      receiveShadow
      geometry={nodes.geometry}
      onPointerOver={(e) => {
        if (isParentHovered === Ternary.Unknown) {
          e.stopPropagation();
        }
        setIsChildHovered(true);
      }}
      onPointerLeave={() => {
        setIsChildHovered(false);
      }}
    >
      <Html>
        {hoverContent && (
          <div
            className={clsx(
              "bg-white text-black text-center min-w-72 p-4",
              "rounded-lg shadow-lg border border-black transition-all duration-300",
              "select-none",
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
