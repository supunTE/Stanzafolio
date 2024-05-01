import { ReactNode, useEffect, useRef } from "react";
import { clamp } from "lodash";
import { Bodies, Engine, World } from "matter-js";

type RigidBodyProps = {
  engine: Engine;
  world: World;
  icon: string;
  sceneWidth: number;
  children: ReactNode;
};

export function RigidBody({
  engine,
  world,
  icon,
  sceneWidth,
  children,
}: RigidBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log("RigidBody mounted", engine, world);
    if (!engine || !world || sceneWidth == 0) return;

    const rigidBodyWidth = bodyRef.current.clientWidth;
    // const rigidBodyHeight = bodyRef.current.clientHeight;

    // console.log(sceneWidth);

    const rigidBody = {
      w: rigidBodyWidth,
      h: rigidBodyWidth,
      body: Bodies.circle(
        clamp(Math.random() * sceneWidth, 30, sceneWidth - 30),
        20,
        rigidBodyWidth / 2,
        {
          frictionAir: 0.05,
          //   restitution: 0.8,
          render: { fillStyle: "#F3F3F3" },
        }
      ),
      elem: bodyRef.current,
      render() {
        const { x, y } = this.body.position;
        this.elem.style.top = `${y - this.h / 2}px`;
        this.elem.style.left = `${x - this.w / 2}px`;
        this.elem.style.transform = `rotate(${this.body.angle}rad)`;
      },
    };

    World.add(world, rigidBody.body);

    let animationFrameId: number;
    (function render() {
      rigidBody.render();
      //   Engine.update(engine);
      animationFrameId = requestAnimationFrame(render);
    })();

    return () => {
      cancelAnimationFrame(animationFrameId);
      World.remove(world, rigidBody.body);
    };
  }, [engine, world, sceneWidth]);

  return (
    <div
      ref={bodyRef}
      className="absolute p-2 sm:p-6 lg:p-10 2xl:p-12 text-xs sm:text-md xl:text-lg w-max aspect-square rounded-full flex flex-col items-center justify-center bg-white border text-black shadow-sm
       min-w-16 min-h-16 sm:min-w-24 sm:min-h-24 hover:bg-black hover:text-white transition-colors duration-300"
    >
      <img
        src={icon}
        alt=""
        className="w-5 h-5 sm:w-10 sm:h-10 object-contain"
      />
      {children}
    </div>
  );
}
