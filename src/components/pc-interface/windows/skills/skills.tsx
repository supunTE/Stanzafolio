import { useEffect, useState } from "react";
import { debounce } from "lodash";

import { Window } from "../window";

import { PhysicsWorld } from "./PhysicsWorld";

export function Skills() {
  const [seed, setSeed] = useState<number>(0);
  useEffect(() => {
    const generateSeed = debounce(() => {
      const getRandomSeed = () => {
        return Math.floor(Math.random() * 10000);
      };
      setSeed((prev) => {
        const newSeed = getRandomSeed();
        return newSeed === prev ? prev + 1 : newSeed;
      });
    }, 500);

    window.addEventListener("resize", generateSeed);

    return () => {
      window.removeEventListener("resize", generateSeed);
    };
  }, []);

  return (
    <Window id="skills">
      <PhysicsWorld key={seed} />
    </Window>
  );
}
