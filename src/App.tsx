import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { OrbitControls, Stage } from "@react-three/drei";
import { RoomModel } from "./components/Room";

function App() {
  return (
    <>
      <div className="cover">
        <h1 className="text-[10rem] flex justify-center items-center w-full h-full absolute">
          3D Room
        </h1>
        <Canvas style={{ background: "transparent", width: "100%" }}>
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
          <Perf />
          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </>
  );
}

export default App;
