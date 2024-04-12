import { useEffect, useState } from "react";
import {
  animated as animatedWeb,
  useSpring as useSpringWeb,
} from "@react-spring/web";
import { Float } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

import { HoverMaintainer } from "../utils";

import ModelMesh, { ModelMeshProps } from "./ModelMesh";

type ModelGroupChildType = "mesh" | "group";

/// [Model Parent Group]
type ModelParentGroupChildren<T extends ModelGroupChildType> = Array<{
  childType: T;
  props: T extends "mesh"
    ? Omit<ModelMeshProps, "groupKey">
    : ModelParentGroupProps<ModelGroupChildType>;
}>;

type ModelParentGroupProps<T extends ModelGroupChildType> = {
  groupKey: string | string[];
  elements: ModelParentGroupChildren<T>;
  floatIntensity?: number;
} & GroupProps;

const AnimatedModelGroup = animatedWeb(ModelGroup);

export function ModelParentGroup<T extends ModelGroupChildType>({
  groupKey,
  elements,
  position,
  floatIntensity = 0.25,
  ...props
}: ModelParentGroupProps<T>) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpringWeb({
    "position-y":
      floatIntensity && (isHovered || isClicked)
        ? (position ? position[1] : 0) + 0.25
        : position
        ? position[1]
        : 0,
  });

  useEffect(() => {
    if (floatIntensity === 0) return;
    const HoverEmitter = HoverMaintainer.HoverEmitter;

    const onClickedGroupChanged = (clickedGroupname: string) => {
      if (Array.isArray(groupKey)) {
        return setIsClicked(clickedGroupname === groupKey[0]);
      }
      setIsClicked(clickedGroupname === groupKey);
    };
    HoverEmitter.on("clickedGroupChanged", onClickedGroupChanged);

    const onHoveredGroupChanged = (hoveredGroupName: string) => {
      if (Array.isArray(groupKey)) {
        return setIsHovered(hoveredGroupName === groupKey[0]);
      }
      setIsHovered(hoveredGroupName === groupKey);
    };
    HoverEmitter.on("hoveredGroupChanged", onHoveredGroupChanged);

    return () => {
      HoverEmitter.off("clickedGroupChanged", onClickedGroupChanged);
      HoverEmitter.off("hoveredGroupChanged", onHoveredGroupChanged);
    };
  }, [groupKey, floatIntensity]);

  return (
    // TODO: Try to animate float transition by reducing and increasing floating Range
    <Float
      floatIntensity={isClicked ? 10 * floatIntensity : 0}
      rotationIntensity={isClicked ? floatIntensity : 0}
    >
      <AnimatedModelGroup
        groupKey={Array.isArray(groupKey) ? groupKey : [groupKey]}
        elements={elements}
        {...props}
        position={position}
        position-y={springProps["position-y"]}
      />
    </Float>
  );
}

/// [Model Group]
type ModelGroupChildren<T extends ModelGroupChildType> = Array<{
  childType: T;
  props: T extends "mesh"
    ? Omit<ModelMeshProps, "groupKey">
    : Omit<ModelGroupProps<ModelGroupChildType>, "groupKey">;
}>;

type ModelGroupProps<T extends ModelGroupChildType> = {
  groupKey: string[];
  elements: ModelGroupChildren<T>;
  isChildGroup?: boolean;
} & GroupProps;

function ModelGroup<T extends ModelGroupChildType>({
  groupKey,
  elements,
  isChildGroup: _isChild,
  ...props
}: ModelGroupProps<T>) {
  return (
    <group {...props}>
      {elements.map((childProps) => {
        if (childProps.childType === "group") {
          const { groupKey: childGroupKey, ...props } =
            childProps.props as ModelGroupProps<ModelGroupChildType>;

          const reactKey = [
            ...groupKey,
            Array.isArray(childGroupKey)
              ? childGroupKey.join("-")
              : childGroupKey,
          ].join("-");

          return (
            <ModelGroup
              key={reactKey}
              {...props}
              groupKey={[...groupKey, childGroupKey as unknown as string]}
              isChildGroup
            />
          );
        }
        const props = childProps.props as ModelMeshProps;
        return (
          <ModelMesh
            key={[...groupKey, props.modelKey].join("-")}
            {...props}
            groupKey={groupKey[0]}
          />
        );
      })}
    </group>
  );
}
