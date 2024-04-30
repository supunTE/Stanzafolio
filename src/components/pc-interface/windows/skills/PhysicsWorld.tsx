import { useEffect, useRef, useState } from "react";
import {
  Bodies,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from "matter-js";

import { RigidBody } from "./RigidBody";
import { mySkills } from "./Skills";

export const PhysicsWorld = () => {
  const virtualSceneRef = useRef<HTMLDivElement>(null);
  const actualSceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine>(Engine.create());
  const worldRef = useRef<World>(engineRef.current.world);
  const mouseRef = useRef<Mouse>(null);
  const [sceneWidth, setSceneWidth] = useState<number>(0);

  useEffect(() => {
    if (!virtualSceneRef.current || !engineRef.current || !worldRef.current)
      return;

    const engine = engineRef.current;
    const world = worldRef.current;
    let render: Render;

    const generatePhysicsWorld = () => {
      const sceneWidth = virtualSceneRef.current.clientWidth;
      console.log(sceneWidth, "sceneWidth");
      setSceneWidth(sceneWidth);
      const sceneHeight = virtualSceneRef.current.clientHeight;

      render = Render.create({
        element: virtualSceneRef.current,
        engine: engine,
        options: {
          width: sceneWidth,
          height: sceneHeight,
          wireframes: false,
          background: "#1D1D1D",
        },
      });

      Render.run(render);

      const runner = Runner.create();
      Runner.run(runner, engine);

      const walls = [
        Bodies.rectangle(sceneWidth / 2, 0, sceneWidth, 36, {
          isStatic: true,
          render: {
            fillStyle: "transparent",
          },
        }),
        Bodies.rectangle(sceneWidth / 2, sceneHeight, sceneWidth, 36, {
          isStatic: true,
          render: {
            fillStyle: "transparent",
          },
        }),
        Bodies.rectangle(0, sceneHeight / 2, 36, sceneHeight, {
          isStatic: true,
          render: {
            fillStyle: "transparent",
          },
        }),
        Bodies.rectangle(sceneWidth, sceneHeight / 2, 36, sceneHeight, {
          isStatic: true,

          render: {
            fillStyle: "transparent",
          },
        }),
      ];

      World.add(world, walls);

      render.canvas.style.borderRadius = "0.375rem";
      render.canvas.style.border = "none";

      const mouse = Mouse.create(actualSceneRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.005,
        },
      });
      World.add(world, mouseConstraint);
    };

    generatePhysicsWorld();

    return () => {
      Render.stop(render);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <div className="p-4 w-full h-full">
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="w-full h-full absolute rounded-[2.5rem] overflow-hidden z-20 scale-[0.15] transform origin-top-right right-2 top-2 sm:right-8 sm:top-8"
          ref={virtualSceneRef}
        ></div>
        <div
          className="w-full h-full bg-white rounded-lg shadow-sm"
          ref={actualSceneRef}
        >
          {mySkills.map((skill) => (
            <RigidBody
              engine={engineRef.current}
              world={worldRef.current}
              sceneWidth={sceneWidth}
              key={skill.name}
            >
              {skill.name}
            </RigidBody>
          ))}
        </div>
      </div>
    </div>
  );
};
