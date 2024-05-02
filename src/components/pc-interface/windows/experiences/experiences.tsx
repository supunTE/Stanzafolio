import { useState } from "react";
import { CaretCircleDown } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { Window } from "../window";

import { myExperiences } from "./myExperiences";
import { PositionBar } from "./PositionBar";
import { Positions } from "./positions";

export function Experiences(): JSX.Element {
  const [showExperiences, setShowExperiences] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const variants = {
    show: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
    hide: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Window id="experiences">
      <div className="flex p-4 h-full overflow-hidden">
        <div className="w-full h-full overflow-y-auto pr-4 pb-8 interface-scrollbar">
          <div className="mb-4">
            <ToggleBar
              label="Experiences"
              onClick={() => setShowExperiences(!showExperiences)}
              isExpanded={showExperiences}
            />
            <Positions showExperiences={showExperiences} />
          </div>

          <ToggleBar
            label="Projects"
            onClick={() => setShowProjects(!showProjects)}
            isExpanded={showProjects}
          />
          <motion.div
            layout
            className="p-2 bg-white/40 rounded-md my-4 mt-2 overflow-hidden"
            animate={showProjects ? "show" : "hide"}
            variants={variants}
          >
            {myExperiences.map((experience, index) => (
              <PositionBar key={index} experience={experience} />
            ))}
          </motion.div>
        </div>
      </div>
    </Window>
  );
}

type ToggleBarProps = {
  label: string;
  onClick: () => void;
  isExpanded: boolean;
};

export function ToggleBar({ label, onClick, isExpanded }: ToggleBarProps) {
  return (
    <motion.div layout className="flex items-center" onClick={onClick}>
      <div
        className={clsx(
          "z-10 jetbrains-mono",
          "text-black p-1 px-3 rounded-lg shadow-sm flex gap-2 items-center border border-neutral-400",
          "hover:bg-white hover:border-neutral-800 hover:shadow-md",
          "transition-all duration-300"
        )}
      >
        <CaretCircleDown
          className={clsx("w-4 h-4", { "transform rotate-180": isExpanded })}
        />
        {label}
      </div>
      <div className="h-[0.5px] flex-1 bg-neutral-400"></div>
    </motion.div>
  );
}
