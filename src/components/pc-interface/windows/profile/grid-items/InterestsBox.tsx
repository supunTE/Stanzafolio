import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { interests } from "../../../../../assets/vectors/interests";

export function InterestsBox() {
  const [isItemHovered, setItemHovered] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const interestNames = [
    "Gaming",
    "Movies",
    "Writing",
    "Reading",
    "Languages",
    "Psychology",
    "Learning new things!",
  ];

  const thumbnails = [
    interests.controller,
    interests.glasses,
    interests.pen,
    interests.books,
    interests.letter,
    interests.brain,
    interests.bulb,
  ];

  return (
    <div className="h-full relative text-black flex flex-col sm:p-2 gap-3">
      <h4 className="text-xl font-bold jetbrains-mono">Interests</h4>
      <div className="flex justify-center -space-x-[4.5rem] xl:space-x-2">
        {thumbnails.map((thumbnail, i) => (
          <InterestCard
            key={i}
            thumbnail={thumbnail}
            label={interestNames[i]}
            isHovered={isItemHovered[i]}
            setIsHovered={(hovered) =>
              setItemHovered((prev) =>
                prev.map((_, j) => (i === j ? hovered : prev[j]))
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export function InterestCard({
  thumbnail,
  label,
  isHovered,
  setIsHovered,
}: {
  thumbnail: string;
  label: string;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}) {
  return (
    <motion.div
      className={clsx(
        "w-24 h-24 p-1 border bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative"
      )}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1 }}
      animate={{
        scale: isHovered ? 1.5 : 1,
        zIndex: isHovered ? 10 : 1,
        rotateZ: isHovered ? 12 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={thumbnail}
        alt="interest"
        className="w-full h-full object-contain pointer-events-none"
      />
      <motion.div
        className="absolute w-full h-full inset-0 flex items-center justify-center text-center text-xs origin-center bg-white/60 text-black p-1 rounded-lg shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        onMouseOver={() => setIsHovered(true)}
      >
        <span className="-rotate-12">{label}</span>
      </motion.div>
    </motion.div>
  );
}

// reading
// Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
// gaming
//Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
// movies
// Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
// languages
// writing
