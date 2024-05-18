import { forwardRef, ReactNode, Ref, useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/three";
import {
  animated as animatedWeb,
  easings,
  useSpring as useSpringWeb,
} from "@react-spring/web";
import { Html, Outlines, useGLTF } from "@react-three/drei";
import { MeshProps, ThreeEvent } from "@react-three/fiber";
import clsx from "clsx";
import { useControls } from "leva";
import { Color, Mesh } from "three";

import { useBreakpoint } from "../../hooks";
import { GLTFResult } from "../../models";
import { HoverMaintainer } from "../utils/hover-maintainer";

export type ModelMeshProps = {
  groupKey: string;
  modelKey: keyof GLTFResult["nodes"];
  lightUpKeys?: string[];
  individualHoveredColor?: string;
  clickedColor: string;
  children?: ReactNode | ReactNode[];
  hoveredContent?: string | ReactNode;
  clickedContentInfo?: string;
  clickedContent?: string | ReactNode;
  clickedButtons?: ReactNode;
  contentTheme?: "light" | "dark";
  onHover?: ((e: ThreeEvent<PointerEvent>) => void) | null;
  outlineOpacity?: number;
  showComingSoonLabel?: boolean;
} & MeshProps;

type SpringProps = {
  color: Color;
  emissiveColor: Color;
  outlineColor: Color;
  outlineOpacity: number;
};

const AnimatedOutlines = animated(Outlines);

const ModelMesh = forwardRef(
  (
    {
      groupKey,
      modelKey,
      individualHoveredColor,
      clickedColor,
      onClick,
      clickedContentInfo,
      clickedContent,
      clickedButtons,
      outlineOpacity = 0.5,
      children = null,
      contentTheme = "light",
      showComingSoonLabel = false,
      lightUpKeys = ["Bulb"],
      ...props
    }: ModelMeshProps,
    ref: Ref<Mesh>
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isLightUp, setIsLightUp] = useState(false);

    useEffect(() => {
      const HoverEmitter = HoverMaintainer.registerHoverItem(
        groupKey,
        modelKey
      );

      const onHoveredGroupChanged = () => {
        setIsHovered(HoverMaintainer.isHovered(modelKey));
      };
      HoverEmitter.on("hoveredGroupChanged", onHoveredGroupChanged);

      const onClickedGroupChanged = () => {
        setIsLightUp(HoverMaintainer.checkForClickedGroups(lightUpKeys));
        console.log(HoverMaintainer.checkForClickedGroups(lightUpKeys));
        setIsClicked(HoverMaintainer.isClicked(modelKey));
      };
      HoverEmitter.on("clickedGroupChanged", onClickedGroupChanged);

      return () => {
        HoverMaintainer.unregisterHoverItem(groupKey, modelKey);
        HoverEmitter.off("hoveredGroupChanged", onHoveredGroupChanged);
        HoverEmitter.off("clickedGroupChanged", onClickedGroupChanged);
      };
    }, [groupKey, modelKey, lightUpKeys]);

    const { nodes } = useGLTF("/room.glb") as GLTFResult;

    const [isIamHovered, setIsIamHovered] = useState(false);
    const { isSm } = useBreakpoint("sm");

    const colors = useControls("Material Colors", {
      emissiveColor: {
        value: "#898989",
        label: "Emissive Color",
      },
      nightColor: {
        value: "#123",
        label: "Night Color",
      },
    });

    const {
      color,
      emissiveColor,
      outlineColor,
      outlineOpacity: outlineOpacitySpring,
    } = useSpring<SpringProps>({
      color:
        isIamHovered && individualHoveredColor
          ? individualHoveredColor
          : isLightUp
          ? colors.nightColor
          : isClicked
          ? clickedColor
          : "#fff",
      emissiveColor: isClicked || isLightUp ? "#000" : colors.emissiveColor,
      outlineColor: isHovered ? "#555" : "#fff",
      outlineOpacity: isHovered ? outlineOpacity : 0,
      config: {
        duration: 300,
      },
    });

    const styles = useSpringWeb({
      opacity: isClicked ? 1 : 0,
      y: isClicked ? 0 : 24,
      backgroundColor: isClicked ? clickedColor : "#fff",
      config: {
        duration: 300,
        mass: 0.5,
        friction: 5,
        tension: 200,
        easing: easings.easeInBounce,
      },
    });

    const [randomPhrase, setRandomPhrase] = useState("");

    useEffect(() => {
      const comingSoonPhrases = [
        "Exciting changes are underway! 🚀",
        "Things are about to get interesting! 🎈",
        "Stay tuned! 📺",
        "Gear up for something new! 🛠️",
        "Something awesome is on the way! 🌟",
      ];

      if (isClicked && showComingSoonLabel) {
        setRandomPhrase(
          comingSoonPhrases[
            Math.floor(Math.random() * comingSoonPhrases.length)
          ]
        );
      }
    }, [isClicked, showComingSoonLabel]);

    return (
      <mesh
        {...props}
        ref={ref}
        key={[groupKey, modelKey].join("-")}
        name={modelKey}
        geometry={nodes[modelKey].geometry}
        onPointerOver={(e) => {
          e.stopPropagation();

          setIsIamHovered(true);
          HoverMaintainer.setHoveredGroup(groupKey);
        }}
        onClick={(e) => {
          e.stopPropagation();

          if (onClick) {
            return onClick(e);
          }
          HoverMaintainer.setClickedGroup(groupKey);
        }}
        onPointerLeave={() => {
          setIsIamHovered(false);
          HoverMaintainer.unsetHoveredGroup();
        }}
      >
        {clickedContent && (
          <Html
            wrapperClass={clsx("messageWrapper", { hidden: !isClicked })}
            className={"w-full h-full"}
            zIndexRange={[21, 30]}
          >
            <animatedWeb.div
              className={clsx(
                "bg-white text-black text-center p-4",
                "rounded-lg shadow-lg border border-black transition-all duration-300",
                "absolute z-50 bottom-8 inset-x-4 min-w-12 text-sm sm:min-w-72 min:text-md",
                "select-none whitespace-pre-line",
                {
                  " text-white": contentTheme === "dark",
                  "text-black": contentTheme === "light",
                }
              )}
              style={styles}
            >
              {clickedContent}

              {clickedContentInfo && (
                <div className="text-xs text-gray-500 mt-2 whitespace-pre-line">
                  {clickedContentInfo}
                </div>
              )}

              {!isSm && clickedButtons}

              {showComingSoonLabel && (
                <div className="absolute -bottom-4 right-2 text-xs text-gray-500 mt-2 bg-white p-1 px-2 rounded-md">
                  {randomPhrase}
                </div>
              )}
            </animatedWeb.div>
          </Html>
        )}
        <animated.meshLambertMaterial
          flatShading={true}
          color={color}
          emissive={emissiveColor}
        />
        <AnimatedOutlines
          opacity={outlineOpacitySpring}
          transparent={true}
          thickness={2}
          color={outlineColor}
          screenspace={true}
          angle={Math.PI / 4}
        />
        {children}
      </mesh>
    );
  }
);

export default ModelMesh;
