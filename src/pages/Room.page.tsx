import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { Leva } from "leva";
import { Suspense, useEffect, useState } from "react";
import {
  HoverItemGroup,
  HoverMaintainer,
  RoomModel,
  RoomLoading,
} from "../components";
import { useBreakpoint } from "../hooks";
import { motion } from "framer-motion";

export function RoomPage() {
  const { isSm } = useBreakpoint("sm");
  const isProd = import.meta.env.PROD;

  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [clickedGroup, setClickedGroup] = useState<string | null>(null);
  const [registeredGroups, setRegisteredGroups] =
    useState<HoverItemGroup | null>(null);

  useEffect(() => {
    document.body.style.cursor = hoveredGroup !== null ? "pointer" : "auto";
  }, [hoveredGroup]);

  useEffect(() => {
    const onHoveredGroupChanged = (hoveredGroup: string) => {
      setHoveredGroup(hoveredGroup);
      setRegisteredGroups(HoverMaintainer.getAllRegisteredItems());
    };
    HoverMaintainer.HoverEmitter.on(
      "hoveredGroupChanged",
      onHoveredGroupChanged
    );

    const onClickedGroupChanged = (clickedGroup: string) => {
      setClickedGroup(clickedGroup);
    };
    HoverMaintainer.HoverEmitter.on(
      "clickedGroupChanged",
      onClickedGroupChanged
    );

    return () => {
      HoverMaintainer.HoverEmitter.off(
        "hoveredGroupChanged",
        onHoveredGroupChanged
      );
      HoverMaintainer.HoverEmitter.off(
        "clickedGroupChanged",
        onClickedGroupChanged
      );
    };
  }, []);

  return (
    <motion.div className="cover">
      {!isProd && (
        <>
          <div className="absolute bottom-0 left-0">
            HoveredGroup {hoveredGroup} <br />
            ClickedGroup {clickedGroup} <br />
            RegisteredGroups {JSON.stringify(registeredGroups, null, 2)}
          </div>
        </>
      )}
      <h1 className="text-[8rem] sm:text-[10rem] flex justify-center items-center p-2 w-full h-full absolute">
        3D Room
      </h1>
      <Leva collapsed={!isSm} hidden={isProd} />
      <Canvas
        eventPrefix="client"
        className="r3f"
        style={{ background: "transparent" }}
      >
        <pointLight
          position={[0.15, 6.323, 0.15]}
          decay={0}
          intensity={10}
          color="#f1f1f1"
        />
        <Suspense fallback={<RoomLoading />}>
          <RoomModel />
        </Suspense>
        {!isProd && <Perf position="top-left" />}
        <OrbitControls
          makeDefault
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.6}
          enablePan={false}
          dampingFactor={0.1}
        />
      </Canvas>
    </motion.div>
  );
}
