import { useEffect, useRef, useState } from "react";
import { Bodies, Engine, Render, Runner, World } from "matter-js";

import { RigidBody } from "./RigidBody";
import { mySkills } from "./Skills";

export const PhysicsWorld = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine>(Engine.create());
  const worldRef = useRef<World>(engineRef.current.world);
  const [sceneWidth, setSceneWidth] = useState<number>(0);

  useEffect(() => {
    if (!sceneRef.current || !engineRef.current || !worldRef.current) return;

    const engine = engineRef.current;
    const world = worldRef.current;
    let render: Render;

    const generatePhysicsWorld = () => {
      const sceneWidth = sceneRef.current.clientWidth;
      setSceneWidth(sceneWidth);
      const sceneHeight = sceneRef.current.clientHeight;

      render = Render.create({
        element: sceneRef.current,
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
    };

    generatePhysicsWorld();

    //scale down render canvas

    // const stack = [];
    // for (let i = 0; i < 6; i++) {
    //   stack.push(Bodies.rectangle(400, 50 + i * 50, 80, 20));
    // }

    // World.add(world, stack);

    // const box = {
    //   w: 140,
    //   h: 80,
    //   body: Bodies.rectangle(150, 0, 140, 80),
    //   elem: boxRef.current,
    //   render() {
    //     const { x, y } = this.body.position;
    //     this.elem.style.top = `${y - this.h / 2}px`;
    //     this.elem.style.left = `${x - this.w / 2}px`;
    //     this.elem.style.transform = `rotate(${this.body.angle}rad)`;
    //   },
    // };

    // const mouseConstraint = MouseConstraint.create(engine, {
    //   element: document.body,
    // });

    // Composite.add(world, [box.body, mouseConstraint]);
    // World.add(world, box.body);

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
    <div className="relative w-full h-full overflow-hidden p-4">
      <div
        className="w-full h-full absolute right-8 top-8 scale-[0.15] rounded-[2.5rem] overflow-hidden transform origin-top-right z-10"
        ref={sceneRef}
      ></div>
      <div className="w-full h-full bg-white rounded-lg shadow-sm">
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
  );
};
