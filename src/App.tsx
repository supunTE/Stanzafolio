import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { OrbitControls, Stage } from "@react-three/drei";
import { RoomModel } from "./components/Room";
import { Leva } from "leva";
import { HoverItemGroup, HoverMaintainer } from "./components/hover-maintainer";
import { useEffect, useState } from "react";
import { useBreakpoint } from "./hooks";

function App() {
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
    <>
      <div className="cover">
        {!isProd && (
          <>
            <div className="absolute bottom-0 left-0">
              HoveredGroup {hoveredGroup} <br />
              ClickedGroup {clickedGroup} <br />
              RegisteredGroups {JSON.stringify(registeredGroups, null, 2)}
            </div>
          </>
        )}
        <h1 className="text-[10rem] flex justify-center items-center w-full h-full absolute">
          3D Room
        </h1>
        <Leva collapsed={!isSm} hidden={isProd} />
        <Canvas
          eventPrefix="client"
          className="r3f"
          style={{ background: "transparent", width: "100%" }}
        >
          <pointLight
            position={[0.15, 6.323, 0.15]}
            decay={0}
            intensity={10}
            color="#f1f1f1"
          />
          <Stage
            shadows={{
              type: "contact",
              blur: 2,
              opacity: 0.4,
            }}
            intensity={1}
            preset="portrait"
            adjustCamera={1.5}
          >
            <RoomModel />
          </Stage>
          {!isProd && <Perf position="top-left" />}
          <OrbitControls
            makeDefault
            minDistance={2}
            maxDistance={10}
            minPolarAngle={Math.PI * 0.2}
            maxPolarAngle={Math.PI * 0.6}
            enablePan={false}
            dampingFactor={0.1}
          />
        </Canvas>
      </div>
    </>
  );
}

export default App;
