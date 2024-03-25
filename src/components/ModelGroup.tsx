import { GroupProps } from "@react-three/fiber";
import { useState } from "react";
import ModelMesh, { ModelMeshProps } from "./ModelMesh";
import { Ternary } from "../model";

type ModelGroupProps = {
  meshes: Omit<ModelMeshProps, "isParentHovered">[];
} & GroupProps;

export function ModelGroup({ meshes, ...props }: ModelGroupProps) {
  const [isHovered, setIsHovered] = useState<Ternary>(Ternary.False);
  console.log(isHovered);

  return (
    <group
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(Ternary.True);
      }}
      onPointerLeave={() => {
        setIsHovered(Ternary.False);
      }}
    >
      {meshes.map((meshProps) => (
        <ModelMesh {...meshProps} isParentHovered={isHovered} />
      ))}
    </group>
  );
}
