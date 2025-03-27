import clsx from "clsx";
import { motion } from "framer-motion";

import { expandVariants } from "./animationVariants";
import { myExperiences } from "./myExperiences";
import { PositionBar } from "./PositionBar";

type PositionsProps = {
  showExperiences: boolean;
};

export function Positions({ showExperiences }: PositionsProps) {
  const titlebarStyles = "px-4 py-2 text-sm text-neutral-500 font-semibold";

  return (
    <motion.div
      layout
      className={clsx(
        "p-1 sm:p-4 bg-neutral-100 rounded-md my-4 mt-2 gap-y-2 text-neutral-800",
        "grid grid-cols-1",
        " xl:grid-cols-[minmax(400px,_1fr)_400px] 2xl:grid-cols-[minmax(400px,_1fr)_400px_200px]"
      )}
      animate={showExperiences ? "show" : "hide"}
      variants={expandVariants}
    >
      <div className={clsx(titlebarStyles, "hidden xl:block")}>Title</div>
      <div className={clsx(titlebarStyles, "hidden xl:block")}>
        Company/Organization
      </div>
      <div className={clsx(titlebarStyles, "hidden 2xl:block")}>Time</div>
      {myExperiences
        .slice()
        .reverse()
        .map((experience, index) => (
          <PositionBar
            key={index}
            experience={experience}
            last={index === myExperiences.length - 1}
          />
        ))}
    </motion.div>
  );
}
