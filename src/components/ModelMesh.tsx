import { animated, useSpring } from "@react-spring/three";
import {
  animated as animatedWeb,
  useSpring as useSpringWeb,
  easings,
} from "@react-spring/web";
import { Html, Outlines, useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import {
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Color, Mesh, MeshStandardMaterial } from "three";
import clsx from "clsx";
import { HoverMaintainer } from "./hover-maintainer";
import { GLTFResult } from "./model-types";

export type ModelMeshProps = {
  groupKey: string;
  modelKey: keyof GLTFResult["nodes"];
  hoverColor: string;
  meshMaterial?: Partial<MeshStandardMaterial>;
  children?: ReactNode | ReactNode[];
  hoverContent?: string | ReactNode;
  hoverContentTheme?: "light" | "dark";
  outlineOpacity?: number;
  showComingSoonLabel?: boolean;
} & MeshProps;

type SpringProps = {
  color: Color;
  outlineColor: Color;
  outlineOpacity: number;
};

const AnimatedOutlines = animated(Outlines);

const ModelMesh = forwardRef(
  (
    {
      groupKey,
      modelKey,
      meshMaterial,
      hoverColor,
      hoverContent,
      outlineOpacity = 0.5,
      children = null,
      hoverContentTheme = "light",
      showComingSoonLabel = false,
      ...props
    }: ModelMeshProps,
    ref: Ref<Mesh>
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

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
        setIsClicked(HoverMaintainer.isClicked(modelKey));
      };
      HoverEmitter.on("clickedGroupChanged", onClickedGroupChanged);

      return () => {
        HoverMaintainer.unregisterHoverItem(groupKey, modelKey);
        HoverEmitter.off("hoveredGroupChanged", onHoveredGroupChanged);
        HoverEmitter.off("clickedGroupChanged", onClickedGroupChanged);
      };
    }, [groupKey, modelKey]);

    const { nodes } = useGLTF("/room.glb") as GLTFResult;

    const {
      color,
      outlineColor,
      outlineOpacity: outlineOpacitySpring,
    } = useSpring<SpringProps>({
      color: isClicked ? hoverColor : "#fff",
      outlineColor: isHovered ? "#555" : "#fff",
      outlineOpacity: isHovered ? outlineOpacity : 0,
      config: {
        duration: 300,
      },
    });

    const styles = useSpringWeb({
      opacity: isClicked ? 1 : 0,
      y: isClicked ? 0 : 24,
      backgroundColor: isClicked ? hoverColor : "#fff",
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
        castShadow
        receiveShadow
        geometry={nodes[modelKey].geometry}
      >
        <Html wrapperClass="messageWrapper" className="w-full h-full">
          {hoverContent && (
            <animatedWeb.div
              className={clsx(
                "bg-white text-black text-center p-4",
                "rounded-lg shadow-lg border border-black transition-all duration-300",
                "absolute bottom-4 inset-x-4 min-w-12 text-sm sm:min-w-72 min:text-md",
                "select-none whitespace-pre-line",
                {
                  " text-white": hoverContentTheme === "dark",
                  "text-black": hoverContentTheme === "light",
                }
              )}
              style={styles}
            >
              {hoverContent}

              {showComingSoonLabel && (
                <div className="absolute -bottom-4 right-2 text-xs text-gray-500 mt-2 bg-white p-1 px-2 rounded-md">
                  {randomPhrase}
                </div>
              )}
            </animatedWeb.div>
          )}
        </Html>
        <animated.meshStandardMaterial
          flatShading={true}
          color={color}
          {...meshMaterial}
        />
        <AnimatedOutlines
          opacity={outlineOpacitySpring}
          transparent={true}
          thickness={2}
          color={outlineColor}
          screenspace={true}
        />
        {children}
      </mesh>
    );
  }
);

export default ModelMesh;
