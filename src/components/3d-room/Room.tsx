/*
Splitted 3D Model using: https://github.com/pmndrs/gltfjsx
*/

import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSpring } from "@react-spring/three";
import { Stage, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Mesh } from "three";
import useLocalStorage from "use-local-storage";

import { ModelParentGroup } from "./ModelGroup";

export function RoomModel(props: JSX.IntrinsicElements["group"]) {
  const fanBladesRef = useRef<Mesh>();
  const [fanBladeSpeedMultiplier, setFanBladeSpeedMultiplier] = useState(1);
  const { springBladeMultiplier } = useSpring({
    springBladeMultiplier: fanBladeSpeedMultiplier,
    config: {
      duration: 1000,
    },
  });

  const materialColors = useControls(
    "Material Colors",
    {
      chairCushionColor: {
        value: "#414141",
        label: "Chair Cushion Color",
      },
      chairPillowColor: {
        value: "#e89646",
        label: "Chair Pillow Color",
      },
      chairHandleColor: {
        value: "#343434",
        label: "Chair Handle Color",
      },
      chairMetalColor: {
        value: "#414141",
        label: "Chair Metal Color",
      },
      chairWheelColor: {
        value: "#414141",
        label: "Chair Wheel Color",
      },
      tableColor: {
        value: "#6f3e19",
        label: "Table Color",
      },
      computerFrameColor: {
        value: "#2a2a2a",
        label: "Computer Frame Color",
      },
      monitorScreenColor: {
        value: "#61ff84",
        label: "Monitor Screen Color",
      },
      mouseLightColor: {
        value: "#ff0000",
        label: "Mouse Light Color",
      },
      mousePadColor: {
        value: "#454545",
        label: "Mouse Pad Color",
      },
      speakerCanvasColor: {
        value: "#525252",
        label: "Speaker Canvas Color",
      },
      speakerButtonColor: {
        value: "#fff",
        label: "Speaker Button Color",
      },
      keyboardColor: {
        value: "#2a2a31",
        label: "Keyboard Color",
      },
      cupHolderColor: {
        value: "#934a00",
        label: "Cup Holder Color",
      },
      mugColor: {
        value: "#c0c0c0",
        label: "Mug Color",
      },
      coffeeColor: {
        value: "#241307",
        label: "Coffee Color",
      },
      grassColor: {
        value: "#3b7811",
        label: "Grass Color",
      },
      matColor: {
        value: "#02522b",
        label: "Mat Color",
      },
      matLettersColor: {
        value: "#ab5e06",
        label: "Mat Letters Color",
      },
      cupboardColor: {
        value: "#b387ff",
        label: "Cupboard Color",
      },
      cupboardMetalColor: {
        value: "#321c4f",
        label: "Cupboard Metal Color",
      },
      cupboardKeyColor: {
        value: "#321c4f",
        label: "Cupboard Key Color",
      },
      fanBodyColor: {
        value: "#6dffe7",
        label: "Fan Body Color",
      },
      fanBladeColor: {
        value: "#cdfff7",
        label: "Fan Blade Color",
      },
      fanPlateColor: {
        value: "#00957c",
        label: "Fan Plate Color",
      },
      fanButtonColor: {
        value: "#82e3d3",
        label: "Fan Button Color",
      },
      fanBtn1HoverColor: {
        value: "#21c496",
        label: "Fan Button 1 Hover Color",
      },
      fanBtn2HoverColor: {
        value: "#078c66",
        label: "Fan Button 2 Hover Color",
      },
      fanBtn3HoverColor: {
        value: "#0f5441",
        label: "Fan Button 3 Hover Color",
      },
      fanBtnOffHoverColor: {
        value: "#323131",
        label: "Fan Button Off Hover Color",
      },
      bulbColor: {
        value: "#fffb29",
        label: "Bulb Color",
      },
      bulbWireColor: {
        value: "#000000",
        label: "Bulb Wire Color",
      },
    },
    {
      collapsed: true,
    }
  );

  useFrame(() => {
    if (!fanBladesRef.current) return;
    fanBladesRef.current.rotation.z += 0.06 * springBladeMultiplier.get();
  });

  const navigate = useNavigate();
  const { gl, scene, camera } = useThree();
  const [_renderImage, setRenderImage] = useLocalStorage("renderImage", "");
  const [_cameraPosition, setCameraPosition] = useLocalStorage<number[]>(
    "cameraPosition",
    []
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const cameraPos = searchParams.get("pos");

    if (cameraPos) {
      const cameraPosArray = cameraPos.split(",").map((pos) => parseFloat(pos));
      if (cameraPosArray.length !== 3) return;
      camera.position.fromArray(cameraPosArray);
    }

    // reset search params
    setSearchParams({});
  }, []);

  const logInToPC = (e) => {
    e.stopPropagation();
    gl.render(scene, camera);
    const dataURL = gl.domElement.toDataURL();
    setRenderImage(dataURL);
    setCameraPosition(camera.position.toArray());
    navigate("/info");
  };

  return (
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
      <group {...props} dispose={null}>
        <ModelParentGroup
          floatIntensity={0}
          groupKey="Base"
          elements={[
            {
              childType: "mesh",
              props: {
                modelKey: "Room",
                clickedColor: "#FFFF61",
                clickedContent: "It's just the wall and floor. 🧱",
                showComingSoonLabel: true,
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Tiles",
                clickedColor: "#010112",
                meshMaterial: {
                  roughness: 0.5,
                },
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Bin",
                clickedColor: "#fff",
                position: [-3.238, 0.7, -3.282],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Rack",
                clickedColor: "#fff",
                position: [-3.256, 3.233, -1.357],
              },
            },
          ]}
        />
        <ModelParentGroup
          groupKey="Bed"
          elements={[
            {
              childType: "mesh",
              props: {
                modelKey: "Bed_Sheet",
                clickedColor: "#7aadff",
                clickedContent:
                  "Smart developers recharge with a \nday-time sleep. 🌞",
                position: [2.325, 1.688, -0.908],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Bed_Pillow",
                clickedColor: "#C3C5FF",
                position: [2.473, 1.925, -0.311],
                rotation: [-Math.PI, 0.657, -Math.PI],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Bed_Pillow_Small",
                clickedColor: "#C3C5FF",
                position: [1.404, 1.846, 1.352],
                rotation: [-Math.PI, 1.299, -Math.PI],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Bed_Frame",
                clickedColor: "#7F4B4B",
                position: [2.347, 1.494, -0.872],
              },
            },
            {
              childType: "group",
              props: {
                groupKey: "Phone",
                position: [2.479, 1.758, 1.078],
                rotation: [0, -0.194, 0],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube037",
                      clickedColor: "#0f0f0f",
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube037_1",
                      clickedColor: "#0f0f0f",
                      meshMaterial: {
                        roughness: 0.4,
                      },
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube037_2",
                      clickedColor: "#0f0f0f",
                      meshMaterial: {
                        roughness: 0.6,
                      },
                    },
                  },
                ],
              },
            },
          ]}
        />
        <ModelParentGroup
          groupKey="Chair"
          position={[-0.707, 1.979, 1.904]}
          elements={[
            {
              childType: "mesh",
              props: {
                modelKey: "Chair_Back",
                clickedColor: materialColors.chairCushionColor,
                clickedContent: "🏆 Achievement unlocked:\nComfort Level 100",
                contentTheme: "dark",
                meshMaterial: {
                  roughness: 0.6,
                },
              },
            },

            {
              childType: "group",
              props: {
                groupKey: "Chair_Bottom",
                position: [-0.615, -0.508, 0],
                rotation: [0, -1.571, 0],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Chair_Cushion_Bottom",
                      clickedColor: materialColors.chairCushionColor,
                    },
                  },
                  {
                    childType: "group",
                    props: {
                      groupKey: "Chair_Wheels",
                      position: [0, -0.196, -0.152],
                      rotation: [0, 1.571, 0],
                      elements: [
                        {
                          childType: "mesh",
                          props: {
                            modelKey: "Chair_Bottom_Cylinder",
                            clickedColor: materialColors.chairMetalColor,
                          },
                        },
                        {
                          childType: "mesh",
                          props: {
                            modelKey: "Chair_Wheels_Holder",
                            clickedColor: materialColors.chairMetalColor,
                            position: [0, -0.499, 0],
                          },
                        },
                        {
                          childType: "mesh",
                          props: {
                            modelKey: "Chair_Wheels001",
                            clickedColor: materialColors.chairWheelColor,
                            position: [0.882, -0.653, 0.002],
                          },
                        },
                        {
                          childType: "mesh",
                          props: {
                            modelKey: "Chair_Wheels002",
                            clickedColor: materialColors.chairWheelColor,
                            position: [0.271, -0.653, 0.839],
                          },
                        },
                        {
                          childType: "mesh",
                          props: {
                            modelKey: "Chair_Wheels003",
                            clickedColor: materialColors.chairWheelColor,
                            position: [0.274, -0.653, -0.838],
                          },
                        },
                        {
                          childType: "mesh",
                          props: {
                            modelKey: "Chair_Wheels004",
                            clickedColor: materialColors.chairWheelColor,
                            position: [-0.712, -0.653, -0.52],
                          },
                        },
                        {
                          childType: "mesh",
                          props: {
                            modelKey: "Chair_Wheels005",
                            clickedColor: materialColors.chairWheelColor,
                            position: [-0.715, -0.653, 0.517],
                          },
                        },
                      ],
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Chair_Handle_Stands",
                      clickedColor: materialColors.chairHandleColor,
                      position: [0.061, 0, 0],
                      rotation: [0, 1.571, 0],
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Chair_Handles",
                      clickedColor: materialColors.chairHandleColor,
                      position: [-0.79, 0.329, 0.032],
                      rotation: [0, 1.571, 0],
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Chair_Plate",
                      clickedColor: materialColors.chairMetalColor,
                      position: [0, -0.149, -0.152],
                      rotation: [0, 1.571, 0],
                    },
                  },
                ],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Chair_Pillow_Bottom",
                clickedColor: materialColors.chairPillowColor,
                position: [0.225, 1.308, 0],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Chair_Pillow_Top",
                clickedColor: materialColors.chairPillowColor,
                position: [-0.148, -0.285, 0],
              },
            },
          ]}
        />
        <ModelParentGroup
          groupKey={["Computer", "1"]}
          floatIntensity={0}
          elements={[
            {
              childType: "mesh",
              props: {
                modelKey: "Table",
                clickedColor: materialColors.tableColor,
                position: [0.044, 0, 0.783],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "CPU",
                clickedColor: materialColors.computerFrameColor,
                position: [-2.955, 1.008, 3.21],
              },
            },
          ]}
        />
        <ModelParentGroup
          groupKey={["Computer", "2"]}
          elements={[
            {
              childType: "group",
              props: {
                groupKey: "Monitor",
                position: [-3.22, 2.848, 2.971],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube001",
                      clickedColor: materialColors.computerFrameColor,
                      meshMaterial: {
                        roughness: 0.8,
                      },
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube001_1",
                      clickedColor: materialColors.monitorScreenColor,
                      clickedContent: (
                        <>
                          <span>
                            Don't worry, it's not judging your code...or is it?
                            💻
                          </span>
                          <br />
                          <button
                            className="p-2 px-4 mt-2 bg-gray-800 text-white rounded-full z-[100]"
                            onClick={logInToPC}
                          >
                            Log into this PC
                          </button>
                        </>
                      ),
                      meshMaterial: {
                        roughness: 0.2,
                      },
                    },
                  },
                ],
              },
            },
            {
              childType: "group",
              props: {
                groupKey: "Mouse",
                position: [-2.737, 2.078, 1.212],
                rotation: [0, 0.337, 0],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube004",
                      clickedColor: materialColors.computerFrameColor,
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube004_1",
                      clickedColor: materialColors.mouseLightColor,
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Mouse_Wheel",
                      clickedColor: materialColors.computerFrameColor,
                      position: [-0.061, -0.004, 0],
                    },
                  },
                ],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Mouse_Pad",
                clickedColor: materialColors.mousePadColor,
                position: [-2.67, 2.057, 1.117],
              },
            },
            {
              childType: "group",
              props: {
                groupKey: "Speaker_A",
                position: [-3.239, 2.164, 3.556],
                rotation: [0, 0.542, 0],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube005",
                      clickedColor: materialColors.computerFrameColor,
                      meshMaterial: {
                        roughness: 0.6,
                      },
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube005_1",
                      clickedColor: materialColors.speakerCanvasColor,
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube023",
                      clickedColor: materialColors.speakerButtonColor,
                      position: [0.077, -0.08, 0.061],
                      rotation: [0, 0, 0.242],
                      scale: [0.085, 0.114, 0.102],
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube030",
                      clickedColor: materialColors.speakerButtonColor,
                      position: [0.077, -0.08, 0.032],
                      rotation: [0, 0, 0.242],
                      scale: [0.085, 0.114, 0.102],
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube031",
                      clickedColor: materialColors.speakerButtonColor,
                      position: [0.081, -0.079, 0.009],
                      rotation: [0, 0, 0.242],
                      scale: [0.01, 0.029, 0.026],
                    },
                  },
                ],
              },
            },
            {
              childType: "group",
              props: {
                groupKey: "Speaker_B",
                position: [-3.535, 2.164, 1.459],
                rotation: [0, -0.315, 0],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube005",
                      clickedColor: materialColors.computerFrameColor,
                      meshMaterial: {
                        roughness: 0.6,
                      },
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube005_1",
                      clickedColor: materialColors.speakerCanvasColor,
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube023",
                      clickedColor: materialColors.speakerButtonColor,
                      position: [0.077, -0.08, 0.061],
                      rotation: [0, 0, 0.242],
                      scale: [0.085, 0.114, 0.102],
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube030",
                      clickedColor: materialColors.speakerButtonColor,
                      position: [0.077, -0.08, 0.032],
                      rotation: [0, 0, 0.242],
                      scale: [0.085, 0.114, 0.102],
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube031",
                      clickedColor: materialColors.speakerButtonColor,
                      position: [0.081, -0.079, 0.009],
                      rotation: [0, 0, 0.242],
                      scale: [0.01, 0.029, 0.026],
                    },
                  },
                ],
              },
            },
            {
              childType: "group",
              props: {
                groupKey: "Keyboard",
                position: [-2.737, 2.074, 2.217],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Keyboard",
                      clickedColor: materialColors.keyboardColor,
                      meshMaterial: {
                        roughness: 0.6,
                      },
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Keyboard_lights",
                      clickedColor: materialColors.computerFrameColor,
                      position: [-0.051, 0.017, -0.37],
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Keys",
                      clickedColor: materialColors.computerFrameColor,
                      position: [0.042, 0.017, -0.502],
                    },
                  },
                ],
              },
            },
          ]}
        />
        <ModelParentGroup
          groupKey="Mug"
          floatIntensity={0}
          elements={[
            {
              childType: "group",
              props: {
                groupKey: "Cup",
                position: [-2.692, 2.053, 3.406],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Circle",
                      clickedColor: materialColors.mugColor,
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Circle_1",
                      clickedColor: materialColors.coffeeColor,
                    },
                  },
                ],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Mug_Hold",
                clickedColor: materialColors.cupHolderColor,
                clickedContent: "Caffeine: The programmer's fuel. ☕",
                contentTheme: "dark",
                position: [-2.692, 2.05, 3.406],
              },
            },
          ]}
        />
        <ModelParentGroup
          groupKey="TouchGrass"
          elements={[
            {
              childType: "mesh",
              props: {
                modelKey: "Touch_Grass",
                position: [-2.955, 0.512, 1.681],
                clickedColor: materialColors.matLettersColor,
              },
            },
            {
              childType: "group",
              props: {
                groupKey: "Mat_Plain",
                position: [-2.955, 0.475, 1.681],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube016_1",
                      clickedColor: materialColors.matColor,
                      clickedContent: "Go Touch Grass! 🌱",
                      contentTheme: "dark",
                    },
                  },
                ],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Mat_Grass",
                clickedColor: materialColors.grassColor,
                outlineOpacity: 0,
              },
            },
          ]}
        />
        <ModelParentGroup
          groupKey="Cupboard"
          elements={[
            {
              childType: "mesh",
              props: {
                modelKey: "Cupboard_Frame",
                clickedColor: materialColors.cupboardColor,
                position: [-1.186, 3.455, -3.061],
                clickedContent: "No skeletons here, just old code. 🪶",
                showComingSoonLabel: true,
              },
            },
            {
              childType: "group",
              props: {
                groupKey: "Cupboard_Dors",
                position: [-2.705, 3.206, -2.399],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube025",
                      clickedColor: materialColors.cupboardColor,
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Cube025_1",
                      clickedColor: materialColors.cupboardMetalColor,
                    },
                  },
                ],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Cupboard_Key_Hole",
                clickedColor: materialColors.cupboardMetalColor,
                position: [-1.038, 2.585, -2.399],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Cupboard_Key",
                clickedColor: materialColors.cupboardKeyColor,
                position: [-1.038, 2.585, -2.398],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Cupboard_Legs",
                clickedColor: materialColors.cupboardMetalColor,
                position: [-1.186, 3.455, -3.061],
              },
            },
          ]}
        />
        <ModelParentGroup
          groupKey="Bin"
          onClick={() => {}}
          elements={[
            {
              childType: "mesh",
              props: {
                modelKey: "Bin",
                clickedColor: "#fff",
                position: [-3.238, 0.7, -3.282],
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Rack",
                clickedColor: "#fff",
                position: [-3.256, 3.233, -1.357],
              },
            },
          ]}
        />
        <ModelParentGroup
          groupKey="Fan"
          floatIntensity={0}
          elements={[
            {
              childType: "group",
              props: {
                groupKey: "FanHead",
                position: [2.532, 3.114, 2.892],
                elements: [
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Fan_Brain",
                      clickedColor: materialColors.fanBodyColor,
                    },
                  },
                  {
                    childType: "mesh",
                    props: {
                      modelKey: "Fan_Blades",
                      position: [-0.255, 0.482, -0.034],
                      rotation: [0, 1.436, 0],
                      clickedColor: materialColors.fanBladeColor,
                      clickedContent:
                        "Cooling down \nhot fixes and coffees. 🌀",
                      clickedContentInfo:
                        fanBladeSpeedMultiplier === 3
                          ? "Feeling a chill? Lower the fan speed."
                          : fanBladeSpeedMultiplier <= 1
                          ? "Temp rising? Increase the fan speed."
                          : undefined,
                      ref: fanBladesRef,
                    },
                  },
                  {
                    childType: "group",
                    props: {
                      groupKey: "Fan_Grid",
                      position: [-0.255, 0.475, -0.034],
                      rotation: [Math.PI / 2, 0, -1.436],
                      elements: [
                        {
                          childType: "mesh",
                          props: {
                            modelKey: "Cylinder009",
                            clickedColor: materialColors.fanBodyColor,
                            outlineOpacity: 0,
                          },
                        },
                        {
                          childType: "mesh",
                          props: {
                            modelKey: "Cylinder009_1",
                            clickedColor: materialColors.fanBodyColor,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },

            {
              childType: "mesh",
              props: {
                modelKey: "Fan_Body",
                position: [2.64, 3.06, 2.907],
                clickedColor: materialColors.fanBodyColor,
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Fan_Stand",
                position: [2.644, 0.793, 2.907],
                clickedColor: materialColors.fanBodyColor,
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Fan_Legs",
                position: [2.644, 0.521, 2.907],
                clickedColor: materialColors.fanBodyColor,
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Buttons_Plate",
                position: [2.564, 2.002, 2.894],
                clickedColor: materialColors.fanPlateColor,
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Fan_Knob",
                position: [2.555, 2.106, 2.894],
                clickedColor: materialColors.fanButtonColor,
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Btn_1",
                position: [2.547, 1.97, 2.889],
                clickedColor: materialColors.fanButtonColor,
                individualHoveredColor: materialColors.fanBtn1HoverColor,
                outlineOpacity: 0,
                onClick: () => {
                  setFanBladeSpeedMultiplier(1);
                },
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Btn_2",
                position: [2.547, 1.97, 2.889],
                clickedColor: materialColors.fanButtonColor,
                individualHoveredColor: materialColors.fanBtn2HoverColor,
                outlineOpacity: 0,
                onClick: () => {
                  setFanBladeSpeedMultiplier(2);
                },
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Btn_3",
                position: [2.547, 1.97, 2.889],
                clickedColor: materialColors.fanButtonColor,
                individualHoveredColor: materialColors.fanBtn3HoverColor,
                outlineOpacity: 0,
                onClick: () => {
                  setFanBladeSpeedMultiplier(3);
                },
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Btn_Off",
                position: [2.547, 1.97, 2.889],
                clickedColor: materialColors.fanButtonColor,
                individualHoveredColor: materialColors.fanBtnOffHoverColor,
                outlineOpacity: 0,
                onClick: () => {
                  setFanBladeSpeedMultiplier(0);
                },
              },
            },
          ]}
        />
        <ModelParentGroup
          floatIntensity={0}
          groupKey="Bulb"
          elements={[
            {
              childType: "mesh",
              props: {
                modelKey: "Bulb",
                position: [0.15, 6.323, 0.15],
                scale: 3.531,
                hoveredContent: "Click to turn on the light.",
                clickedColor: materialColors.bulbColor,
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Bulb_Holder",
                position: [0.15, 6.391, 0.15],
                clickedColor: materialColors.bulbWireColor,
                meshMaterial: {
                  roughness: 0.2,
                },
              },
            },
            {
              childType: "mesh",
              props: {
                modelKey: "Bulb_Wire",
                position: [0.15, 8.242, 0.15],
                scale: [0.008, 0.046, 0.008],
                clickedColor: materialColors.bulbWireColor,
              },
            },
          ]}
        />
        {/* <mesh
          name="Bulb"
          castShadow
          receiveShadow
          geometry={nodes.Bulb.geometry}
          material={nodes.Bulb.material}
          position={[0.15, 6.323, 0.15]}
          scale={3.531}
        />
        <mesh
          name="Bulb_Holder"
          castShadow
          receiveShadow
          geometry={nodes.Bulb_Holder.geometry}
          material={nodes.Bulb_Holder.material}
          position={[0.15, 6.391, 0.15]}
        />
        <mesh
          name="Bulb_Wire"
          castShadow
          receiveShadow
          geometry={nodes.Bulb_Wire.geometry}
          material={nodes.Bulb_Wire.material}
          position={[0.15, 8.242, 0.15]}
          scale={[0.008, 0.046, 0.008]}
        /> */}
      </group>
    </Stage>
  );
}

useGLTF.preload("/room.glb");
