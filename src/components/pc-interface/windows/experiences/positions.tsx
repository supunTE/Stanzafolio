import clsx from "clsx";
import { motion } from "framer-motion";

import { myExperiences } from "./myExperiences";
import { PositionBar } from "./PositionBar";

type PositionsProps = {
  showExperiences: boolean;
};

export function Positions({ showExperiences }: PositionsProps) {
  const titlebarStyles = "px-4 py-2 text-sm text-neutral-500 font-semibold";

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
    <motion.div
      layout
      className="p-4 bg-neutral-100 overflow-hidden rounded-md my-4 mt-2 grid grid-cols-[minmax(400px,_1fr)_400px_200px] gap-y-2 text-neutral-800"
      animate={showExperiences ? "show" : "hide"}
      variants={variants}
    >
      <div className={clsx(titlebarStyles)}>Title</div>
      <div className={clsx(titlebarStyles)}>Company/Organization</div>
      <div className={clsx(titlebarStyles)}>Time</div>

      {myExperiences.map((experience, index) => (
        <PositionBar
          key={index}
          experience={experience}
          last={index === myExperiences.length - 1}
        />
      ))}
    </motion.div>
  );
}
